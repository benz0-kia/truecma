import { NextRequest, NextResponse } from 'next/server';

const SPARK_API_URL = 'https://sparkapi.com/v1/listings';
const SPARK_TOKEN = 'b36rvxt7nqlsi96iy5dckn5ng';

// ─── Adjustment constants ─────────────────────────────────────────────────────
const SQFT_RATE = 65;
const BED_RATE = 8_000;
const BATH_RATE = 5_000;
const AGE_RATE = 500;
const ADJ_CAP = 100_000;

// ─── Condition keyword lists ──────────────────────────────────────────────────
const UPDATED_KEYWORDS = [
  'remodeled', 'renovated', 'updated', 'new kitchen', 'new bath',
  'new floor', 'new roof', 'new hvac', 'move-in ready', 'turnkey',
  'fresh paint', 'new appliances', 'new windows',
];

const ORIGINAL_KEYWORDS = [
  'as-is', 'fixer', 'tlc', 'original', 'needs work', 'investor',
  'estate sale', 'cosmetic', 'dated', 'deferred',
];

// ─── Condition adjustment table ───────────────────────────────────────────────
// [subjectCondition][compSignal] → dollars added to comp price
// Based on Solomon appraisal methodology for the Southern Oregon market
const CONDITION_ADJ_TABLE: Record<string, Record<string, number>> = {
  'Fully Remodeled': { Updated: 10_000,  Mixed: 20_000,  Original: 40_000, Unknown: 0 },
  'Updated':         { Updated: 0,       Mixed: 10_000,  Original: 20_000, Unknown: 0 },
  'Average':         { Updated: -10_000, Mixed: 0,       Original: 10_000, Unknown: 0 },
  'Original':        { Updated: -20_000, Mixed: -10_000, Original: 0,      Unknown: 0 },
  'Poor':            { Updated: -25_000, Mixed: -15_000, Original: -5_000, Unknown: 0 },
};

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface CompsRequest {
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  condition: string;
}

interface SparkListing {
  Id: string;
  StandardFields: {
    UnparsedAddress?: string;
    StreetNumber?: string;
    StreetName?: string;
    City?: string;
    StateOrProvince?: string;
    PostalCode?: string;
    ClosePrice?: number;
    CloseDate?: string;
    BuildingAreaTotal?: number;
    BedsTotal?: number;
    BathsTotal?: number;
    YearBuilt?: number;
    DaysOnMarket?: number;
    PublicRemarks?: string;
  };
}

export interface AdjustmentBreakdown {
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  age: string;
  condition: string;
  total: string;
}

export interface Comp {
  address: string;
  closePrice: number;
  closeDate: string;
  sqft: number;
  beds: number;
  baths: number;
  yearBuilt: number;
  daysOnMarket: number;
  conditionSignal: 'Updated' | 'Original' | 'Mixed' | 'Unknown';
  similarityScore: number;
  pricePerSqft: number;
  sqftAdjustment: number;
  bedroomAdjustment: number;
  bathroomAdjustment: number;
  ageAdjustment: number;
  conditionAdjustment: number;
  totalAdjustment: number;
  adjustedPrice: number;
  adjustmentBreakdown: AdjustmentBreakdown;
  outlier: boolean;
  outlierNote: string;
}

export interface ValuationSummary {
  averageAdjustedPrice: number;
  medianAdjustedPrice: number;
  suggestedListLow: number;
  suggestedListHigh: number;
  pricePerSqftAverage: number;
  confidenceScore: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  marketCondition: "Seller's Market" | 'Balanced Market' | "Buyer's Market";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtAdj(n: number): string {
  const abs = Math.abs(n);
  const s = abs.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return n >= 0 ? `+${s}` : `-${s}`;
}

function round(n: number): number {
  return Math.round(n);
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

// Caps a single adjustment at ±ADJ_CAP, returns the (possibly capped) value and whether it was capped.
function capAdj(n: number): { value: number; capped: boolean } {
  if (Math.abs(n) > ADJ_CAP) {
    return { value: Math.sign(n) * ADJ_CAP, capped: true };
  }
  return { value: n, capped: false };
}

function analyzeCondition(remarks: string | undefined): 'Updated' | 'Original' | 'Mixed' | 'Unknown' {
  if (!remarks) return 'Unknown';
  const lower = remarks.toLowerCase();
  const hasUpdated = UPDATED_KEYWORDS.some((kw) => lower.includes(kw));
  const hasOriginal = ORIGINAL_KEYWORDS.some((kw) => lower.includes(kw));
  if (hasUpdated && hasOriginal) return 'Mixed';
  if (hasUpdated) return 'Updated';
  if (hasOriginal) return 'Original';
  return 'Unknown';
}

function isConditionMatch(subjectCondition: string, compSignal: string): boolean {
  if (compSignal === 'Unknown') return false;
  const isUpdatedSubject = subjectCondition === 'Fully Remodeled' || subjectCondition === 'Updated';
  const isOriginalSubject = subjectCondition === 'Original' || subjectCondition === 'Poor';
  if (isUpdatedSubject && compSignal === 'Updated') return true;
  if (subjectCondition === 'Average' && compSignal === 'Mixed') return true;
  if (isOriginalSubject && compSignal === 'Original') return true;
  return false;
}

function getConditionAdj(subjectCondition: string, compSignal: string): number {
  return CONDITION_ADJ_TABLE[subjectCondition]?.[compSignal] ?? 0;
}

function scoreSimilarity(
  listing: SparkListing['StandardFields'],
  target: CompsRequest
): number {
  const listingSqft = listing.BuildingAreaTotal ?? 0;
  const listingBeds = listing.BedsTotal ?? 0;
  const listingBaths = listing.BathsTotal ?? 0;
  const listingYear = listing.YearBuilt ?? 0;

  const sqftDiff =
    target.sqft > 0
      ? Math.min(Math.abs(listingSqft - target.sqft) / target.sqft, 1)
      : 1;
  const sqftScore = (1 - sqftDiff) * 0.4;

  const bedDiff = Math.abs(listingBeds - target.beds);
  const bedsScore = Math.max(0, 1 - bedDiff * 0.25) * 0.3;

  const bathDiff = Math.abs(listingBaths - target.baths);
  const bathsScore = Math.max(0, 1 - bathDiff * 0.3) * 0.2;

  const yearDiff =
    target.yearBuilt > 0
      ? Math.min(Math.abs(listingYear - target.yearBuilt) / 20, 1)
      : 1;
  const yearScore = (1 - yearDiff) * 0.1;

  let score = sqftScore + bedsScore + bathsScore + yearScore;

  // Condition bonus/penalty
  const compSignal = analyzeCondition(listing.PublicRemarks);
  const isUpdatedSubject = target.condition === 'Fully Remodeled' || target.condition === 'Updated';
  if (isUpdatedSubject) {
    if (compSignal === 'Updated') score += 0.12;
    else if (compSignal === 'Original') score -= 0.12;
  } else if (isConditionMatch(target.condition, compSignal)) {
    score += 0.08;
  }

  return Math.min(1, Math.max(0, Math.round(score * 100) / 100));
}

function buildAddress(fields: SparkListing['StandardFields']): string {
  if (fields.UnparsedAddress) return fields.UnparsedAddress;
  const parts = [
    fields.StreetNumber,
    fields.StreetName,
    fields.City,
    fields.StateOrProvince,
    fields.PostalCode,
  ].filter(Boolean);
  return parts.join(' ') || 'Unknown Address';
}

function calculateAdjustments(
  subject: CompsRequest,
  comp: { sqft: number; beds: number; baths: number; yearBuilt: number; conditionSignal: string }
): { sqft: number; beds: number; baths: number; age: number; condition: number; total: number; cappedFields: Set<string> } {
  const cappedFields = new Set<string>();

  // Bug fix: skip sqft adjustment when comp sqft is missing or zero
  let sqft = 0;
  if (comp.sqft > 0) {
    const { value, capped } = capAdj(round((subject.sqft - comp.sqft) * SQFT_RATE));
    sqft = value;
    if (capped) cappedFields.add('sqft');
  }

  const bedsRaw = capAdj(round((subject.beds - comp.beds) * BED_RATE));
  const beds = bedsRaw.value;
  if (bedsRaw.capped) cappedFields.add('beds');

  const bathsRaw = capAdj(round((subject.baths - comp.baths) * BATH_RATE));
  const baths = bathsRaw.value;
  if (bathsRaw.capped) cappedFields.add('baths');

  // Bug fix: skip age adjustment when comp yearBuilt is missing or zero
  let age = 0;
  if (comp.yearBuilt > 0) {
    const { value, capped } = capAdj(round((subject.yearBuilt - comp.yearBuilt) * AGE_RATE));
    age = value;
    if (capped) cappedFields.add('age');
  }

  const condition = getConditionAdj(subject.condition, comp.conditionSignal);

  return { sqft, beds, baths, age, condition, total: sqft + beds + baths + age + condition, cappedFields };
}

const CAP_WARNING = 'Adjustment capped — large difference detected, manual review recommended';

function buildBreakdown(
  subject: CompsRequest,
  comp: { sqft: number; beds: number; baths: number; yearBuilt: number; conditionSignal: string },
  adj: ReturnType<typeof calculateAdjustments>
): AdjustmentBreakdown {
  const sqftDiff = subject.sqft - comp.sqft;
  const bedDiff = subject.beds - comp.beds;
  const bathDiff = subject.baths - comp.baths;
  const ageDiff = subject.yearBuilt - comp.yearBuilt;

  const pl = (n: number, word: string) =>
    `${Math.abs(n)} ${word}${Math.abs(n) !== 1 ? 's' : ''}`;

  // Sqft line: skip if comp sqft unavailable
  let sqftLine: string;
  if (!comp.sqft) {
    sqftLine = 'Square footage unavailable for this comp: $0';
  } else if (adj.cappedFields.has('sqft')) {
    const dir = sqftDiff > 0 ? 'more' : 'fewer';
    sqftLine = `Subject has ${Math.abs(sqftDiff).toLocaleString()} ${dir} sqft than this comp: ${fmtAdj(adj.sqft)} — ${CAP_WARNING}`;
  } else if (sqftDiff === 0) {
    sqftLine = 'Same square footage as subject: $0';
  } else if (sqftDiff > 0) {
    sqftLine = `Subject has ${Math.abs(sqftDiff).toLocaleString()} more sqft than this comp: ${fmtAdj(adj.sqft)}`;
  } else {
    sqftLine = `Subject has ${Math.abs(sqftDiff).toLocaleString()} fewer sqft than this comp: ${fmtAdj(adj.sqft)}`;
  }

  // Bedrooms line
  let bedLine: string;
  if (adj.cappedFields.has('beds')) {
    const dir = bedDiff > 0 ? 'more bedroom' : 'fewer bedroom';
    bedLine = `Subject has ${pl(bedDiff, dir)}: ${fmtAdj(adj.beds)} — ${CAP_WARNING}`;
  } else if (bedDiff === 0) {
    bedLine = 'Same bedroom count as subject: $0';
  } else if (bedDiff > 0) {
    bedLine = `Subject has ${pl(bedDiff, 'more bedroom')}: ${fmtAdj(adj.beds)}`;
  } else {
    bedLine = `Subject has ${pl(bedDiff, 'fewer bedroom')}: ${fmtAdj(adj.beds)}`;
  }

  // Bathrooms line
  let bathLine: string;
  if (adj.cappedFields.has('baths')) {
    const dir = bathDiff > 0 ? 'more bathroom' : 'fewer bathroom';
    bathLine = `Subject has ${pl(bathDiff, dir)}: ${fmtAdj(adj.baths)} — ${CAP_WARNING}`;
  } else if (bathDiff === 0) {
    bathLine = 'Same bathroom count as subject: $0';
  } else if (bathDiff > 0) {
    bathLine = `Subject has ${pl(bathDiff, 'more bathroom')}: ${fmtAdj(adj.baths)}`;
  } else {
    bathLine = `Subject has ${pl(bathDiff, 'fewer bathroom')}: ${fmtAdj(adj.baths)}`;
  }

  // Age line: skip if comp yearBuilt unavailable
  let ageLine: string;
  if (!comp.yearBuilt) {
    ageLine = 'Year built unavailable for this comp: $0';
  } else if (adj.cappedFields.has('age')) {
    const dir = ageDiff > 0 ? 'newer' : 'older';
    ageLine = `Subject is ${pl(Math.abs(ageDiff), 'year')} ${dir}: ${fmtAdj(adj.age)} — ${CAP_WARNING}`;
  } else if (ageDiff === 0) {
    ageLine = 'Same year built as subject: $0';
  } else if (ageDiff > 0) {
    ageLine = `Subject is ${pl(ageDiff, 'year')} newer: ${fmtAdj(adj.age)}`;
  } else {
    ageLine = `Comp is ${pl(ageDiff, 'year')} newer: ${fmtAdj(adj.age)}`;
  }

  let conditionLine: string;
  if (comp.conditionSignal === 'Unknown') {
    conditionLine = 'Comp condition unknown from remarks: $0';
  } else if (adj.condition === 0) {
    conditionLine = `Similar condition (${subject.condition} vs ${comp.conditionSignal}): $0`;
  } else {
    conditionLine = `Subject is ${subject.condition} vs ${comp.conditionSignal} condition comp: ${fmtAdj(adj.condition)}`;
  }

  return {
    sqft: sqftLine,
    bedrooms: bedLine,
    bathrooms: bathLine,
    age: ageLine,
    condition: conditionLine,
    total: `Net adjustment to comparable: ${fmtAdj(adj.total)}`,
  };
}

function buildValuationSummary(comps: Comp[], subjectCondition: string): ValuationSummary {
  const adjustedPrices = comps.map((c) => c.adjustedPrice);
  const ppsfValues = comps.filter((c) => c.pricePerSqft > 0).map((c) => c.pricePerSqft);

  const avg = Math.round(
    adjustedPrices.reduce((a, b) => a + b, 0) / adjustedPrices.length
  );
  const med = median(adjustedPrices);
  const low = Math.round(med * 0.98);
  const high = Math.round(med * 1.02);
  const ppsfAvg =
    ppsfValues.length > 0
      ? Math.round(ppsfValues.reduce((a, b) => a + b, 0) / ppsfValues.length)
      : 0;

  const minScore = Math.min(...comps.map((c) => c.similarityScore));
  let confidenceScore: ValuationSummary['confidenceScore'];
  let confidenceReason: string;
  if (minScore >= 0.8) {
    confidenceScore = 'High';
    confidenceReason = `All ${comps.length} comparable sales scored above 80% similarity to the subject property, indicating a strong data set for this valuation.`;
  } else if (minScore >= 0.65) {
    confidenceScore = 'Medium';
    confidenceReason = `Comparable sales scored between 65–80% similarity. The subject property has some distinguishing characteristics that limit the precision of the estimate.`;
  } else {
    confidenceScore = 'Low';
    confidenceReason = `One or more comparable sales scored below 65% similarity. The market may lack closely matched recent sales; treat this estimate as a broad range.`;
  }

  const avgDom =
    comps.length > 0
      ? comps.reduce((a, c) => a + c.daysOnMarket, 0) / comps.length
      : 45;

  let marketCondition: ValuationSummary['marketCondition'];
  if (avgDom < 30) {
    marketCondition = "Seller's Market";
  } else if (avgDom <= 60) {
    marketCondition = 'Balanced Market';
  } else {
    marketCondition = "Buyer's Market";
  }

  // Condition confidence check — High requires ≥3 condition-matched comps
  const conditionMatchCount = comps.filter((c) =>
    isConditionMatch(subjectCondition, c.conditionSignal)
  ).length;

  if (conditionMatchCount < 3) {
    if (confidenceScore === 'High') confidenceScore = 'Medium';
    confidenceReason += ` Limited condition-matched comps (${conditionMatchCount} of ${comps.length}) — consider manual review.`;
  }

  return {
    averageAdjustedPrice: avg,
    medianAdjustedPrice: med,
    suggestedListLow: low,
    suggestedListHigh: high,
    pricePerSqftAverage: ppsfAvg,
    confidenceScore,
    confidenceReason,
    marketCondition,
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: CompsRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { beds, baths, sqft, yearBuilt, condition } = body;
  if (
    typeof beds !== 'number' ||
    typeof baths !== 'number' ||
    typeof sqft !== 'number' ||
    typeof yearBuilt !== 'number'
  ) {
    return NextResponse.json(
      { error: 'beds, baths, sqft, and yearBuilt are required numbers' },
      { status: 400 }
    );
  }

  const subjectCondition = typeof condition === 'string' && condition ? condition : 'Average';
  const subject: CompsRequest = { beds, baths, sqft, yearBuilt, condition: subjectCondition };

  const params = new URLSearchParams({
    _filter: "MlsStatus Eq 'Closed'",
    _limit: '20',
    _standardFields:
      'UnparsedAddress,StreetNumber,StreetName,City,StateOrProvince,PostalCode,ClosePrice,CloseDate,BuildingAreaTotal,BedsTotal,BathsTotal,YearBuilt,DaysOnMarket,PublicRemarks',
  });

  const sparkRes = await fetch(`${SPARK_API_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${SPARK_TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (!sparkRes.ok) {
    const text = await sparkRes.text();
    return NextResponse.json(
      { error: `Spark API error: ${sparkRes.status}`, detail: text },
      { status: 502 }
    );
  }

  const data = await sparkRes.json();
  const listings: SparkListing[] = data?.D?.Results ?? [];

  const comps = listings.map((listing) => {
    const f = listing.StandardFields;
    const compSqft = f.BuildingAreaTotal ?? 0;
    const compBeds = f.BedsTotal ?? 0;
    const compBaths = f.BathsTotal ?? 0;
    const compYear = f.YearBuilt ?? 0;
    const closePrice = f.ClosePrice ?? 0;
    const conditionSignal = analyzeCondition(f.PublicRemarks);

    const adj = calculateAdjustments(subject, {
      sqft: compSqft,
      beds: compBeds,
      baths: compBaths,
      yearBuilt: compYear,
      conditionSignal,
    });

    const adjustedPrice = closePrice + adj.total;

    return {
      address: buildAddress(f),
      closePrice,
      closeDate: f.CloseDate ?? '',
      sqft: compSqft,
      beds: compBeds,
      baths: compBaths,
      yearBuilt: compYear,
      daysOnMarket: f.DaysOnMarket ?? 0,
      conditionSignal,
      similarityScore: scoreSimilarity(f, subject),
      pricePerSqft:
        compSqft > 0 ? Math.round((closePrice / compSqft) * 100) / 100 : 0,
      sqftAdjustment: adj.sqft,
      bedroomAdjustment: adj.beds,
      bathroomAdjustment: adj.baths,
      ageAdjustment: adj.age,
      conditionAdjustment: adj.condition,
      totalAdjustment: adj.total,
      adjustedPrice,
      adjustmentBreakdown: buildBreakdown(
        subject,
        { sqft: compSqft, beds: compBeds, baths: compBaths, yearBuilt: compYear, conditionSignal },
        adj
      ),
      // Outlier fields initialized here; set after top5 selection below
      outlier: false,
      outlierNote: '',
    };
  });

  const top5 = comps
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 5);

  // ── Outlier detection ────────────────────────────────────────────────────────
  // For each comp, compare its adjusted price against the median of the other comps.
  // Flag as outlier if > 2.5x or < 0.4x that median.
  const top5Marked: Comp[] = top5.map((comp, i) => {
    const otherPrices = top5.filter((_, j) => j !== i).map((c) => c.adjustedPrice);
    if (otherPrices.length === 0) return { ...comp };
    const otherMedian = median(otherPrices);
    const isOutlier =
      comp.adjustedPrice > otherMedian * 2.5 || comp.adjustedPrice < otherMedian * 0.4;
    return {
      ...comp,
      outlier: isOutlier,
      outlierNote: isOutlier
        ? 'Excluded from valuation — adjusted price is an outlier'
        : '',
    };
  });

  // Build valuation summary using only non-outlier comps; fall back to all if every comp is flagged.
  const valuationComps = top5Marked.filter((c) => !c.outlier);
  const valuationSummary = buildValuationSummary(
    valuationComps.length > 0 ? valuationComps : top5Marked,
    subjectCondition
  );

  return NextResponse.json({ comps: top5Marked, valuationSummary });
}
