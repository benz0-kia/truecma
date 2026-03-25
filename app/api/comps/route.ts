import { NextRequest, NextResponse } from 'next/server';

const SPARK_API_URL = 'https://sparkapi.com/v1/listings';
const SPARK_TOKEN = 'b36rvxt7nqlsi96iy5dckn5ng';

// ─── Adjustment constants ────────────────────────────────────────────────────
const SQFT_RATE = 65;
const BED_RATE = 8_000;
const BATH_RATE = 5_000;
const AGE_RATE = 500;

// ─── Interfaces ──────────────────────────────────────────────────────────────
export interface CompsRequest {
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
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
  };
}

export interface AdjustmentBreakdown {
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  age: string;
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
  similarityScore: number;
  pricePerSqft: number;
  sqftAdjustment: number;
  bedroomAdjustment: number;
  bathroomAdjustment: number;
  ageAdjustment: number;
  totalAdjustment: number;
  adjustedPrice: number;
  adjustmentBreakdown: AdjustmentBreakdown;
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

  return Math.round((sqftScore + bedsScore + bathsScore + yearScore) * 100) / 100;
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
  comp: { sqft: number; beds: number; baths: number; yearBuilt: number }
): {
  sqft: number;
  beds: number;
  baths: number;
  age: number;
  total: number;
} {
  const sqft = round((subject.sqft - comp.sqft) * SQFT_RATE);
  const beds = round((subject.beds - comp.beds) * BED_RATE);
  const baths = round((subject.baths - comp.baths) * BATH_RATE);
  // Newer = worth more; positive if subject is newer
  const age = round((subject.yearBuilt - comp.yearBuilt) * AGE_RATE);
  return { sqft, beds, baths, age, total: sqft + beds + baths + age };
}

function buildBreakdown(
  subject: CompsRequest,
  comp: { sqft: number; beds: number; baths: number; yearBuilt: number },
  adj: ReturnType<typeof calculateAdjustments>
): AdjustmentBreakdown {
  const sqftDiff = subject.sqft - comp.sqft;
  const bedDiff = subject.beds - comp.beds;
  const bathDiff = subject.baths - comp.baths;
  const ageDiff = subject.yearBuilt - comp.yearBuilt;

  const pl = (n: number, word: string) =>
    `${Math.abs(n)} ${word}${Math.abs(n) !== 1 ? 's' : ''}`;

  const sqftLine =
    sqftDiff === 0
      ? `Same square footage as subject: $0`
      : sqftDiff > 0
      ? `Subject has ${Math.abs(sqftDiff).toLocaleString()} more sqft than this comp: ${fmtAdj(adj.sqft)}`
      : `Subject has ${Math.abs(sqftDiff).toLocaleString()} fewer sqft than this comp: ${fmtAdj(adj.sqft)}`;

  const bedLine =
    bedDiff === 0
      ? `Same bedroom count as subject: $0`
      : bedDiff > 0
      ? `Subject has ${pl(bedDiff, 'more bedroom')}: ${fmtAdj(adj.beds)}`
      : `Subject has ${pl(bedDiff, 'fewer bedroom')}: ${fmtAdj(adj.beds)}`;

  const bathLine =
    bathDiff === 0
      ? `Same bathroom count as subject: $0`
      : bathDiff > 0
      ? `Subject has ${pl(bathDiff, 'more bathroom')}: ${fmtAdj(adj.baths)}`
      : `Subject has ${pl(bathDiff, 'fewer bathroom')}: ${fmtAdj(adj.baths)}`;

  const ageLine =
    ageDiff === 0
      ? `Same year built as subject: $0`
      : ageDiff > 0
      ? `Subject is ${pl(ageDiff, 'year')} newer: ${fmtAdj(adj.age)}`
      : `Comp is ${pl(ageDiff, 'year')} newer: ${fmtAdj(adj.age)}`;

  return {
    sqft: sqftLine,
    bedrooms: bedLine,
    bathrooms: bathLine,
    age: ageLine,
    total: `Net adjustment to comparable: ${fmtAdj(adj.total)}`,
  };
}

function buildValuationSummary(comps: Comp[]): ValuationSummary {
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

  const { beds, baths, sqft, yearBuilt } = body;
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

  const params = new URLSearchParams({
    _filter: "MlsStatus Eq 'Closed'",
    _limit: '20',
    _standardFields:
      'UnparsedAddress,StreetNumber,StreetName,City,StateOrProvince,PostalCode,ClosePrice,CloseDate,BuildingAreaTotal,BedsTotal,BathsTotal,YearBuilt,DaysOnMarket',
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

  const comps: Comp[] = listings.map((listing) => {
    const f = listing.StandardFields;
    const compSqft = f.BuildingAreaTotal ?? 0;
    const compBeds = f.BedsTotal ?? 0;
    const compBaths = f.BathsTotal ?? 0;
    const compYear = f.YearBuilt ?? 0;
    const closePrice = f.ClosePrice ?? 0;

    const adj = calculateAdjustments(body, {
      sqft: compSqft,
      beds: compBeds,
      baths: compBaths,
      yearBuilt: compYear,
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
      similarityScore: scoreSimilarity(f, body),
      pricePerSqft:
        compSqft > 0 ? Math.round((closePrice / compSqft) * 100) / 100 : 0,
      sqftAdjustment: adj.sqft,
      bedroomAdjustment: adj.beds,
      bathroomAdjustment: adj.baths,
      ageAdjustment: adj.age,
      totalAdjustment: adj.total,
      adjustedPrice,
      adjustmentBreakdown: buildBreakdown(
        body,
        { sqft: compSqft, beds: compBeds, baths: compBaths, yearBuilt: compYear },
        adj
      ),
    };
  });

  const top5 = comps
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 5);

  const valuationSummary = buildValuationSummary(top5);

  return NextResponse.json({ comps: top5, valuationSummary });
}
