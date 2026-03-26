import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Comp, ValuationSummary } from '@/app/api/comps/route';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SubjectProperty {
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
}

export interface CMAPdfProps {
  subjectProperty: SubjectProperty;
  comps: Comp[];
  valuationSummary: ValuationSummary;
  agentName?: string;
  reportDate?: string;
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const NAVY = '#1B2B4B';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F8F9FA';
const BORDER = '#E5E7EB';
const TEXT_DARK = '#1F2937';
const TEXT_MED = '#6B7280';
const GREEN = '#065F46';
const AMBER = '#92400E';
const RED = '#991B1B';

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: WHITE,
    paddingBottom: 50,
  },
  // Cover
  coverPage: {
    fontFamily: 'Helvetica',
    backgroundColor: NAVY,
    display: 'flex',
    flexDirection: 'column',
  },
  coverBody: {
    flex: 1,
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coverEyebrow: {
    fontSize: 11,
    color: '#94A3B8',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  coverTitle: {
    fontSize: 36,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.2,
    marginBottom: 32,
  },
  coverDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#3B82F6',
    marginBottom: 32,
  },
  coverAddress: {
    fontSize: 18,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
  },
  coverMeta: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  coverFooter: {
    padding: 40,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#2D3D5A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverBrand: {
    fontSize: 22,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },
  coverBrandTagline: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
  coverDisclaimer: {
    fontSize: 8,
    color: '#64748B',
    maxWidth: 240,
    textAlign: 'right',
    lineHeight: 1.4,
  },
  // Page header
  pageHeader: {
    backgroundColor: NAVY,
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageHeaderTitle: {
    fontSize: 14,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
  },
  pageHeaderBrand: {
    fontSize: 11,
    color: '#94A3B8',
    fontFamily: 'Helvetica-Bold',
  },
  // Page footer
  pageFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageFooterText: {
    fontSize: 8,
    color: TEXT_MED,
  },
  // Body
  pageBody: {
    padding: 40,
  },
  // Sections
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_MED,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mb32: { marginBottom: 32 },
  // Executive summary
  summaryPriceBlock: {
    backgroundColor: NAVY,
    borderRadius: 6,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryPriceLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
  summaryPriceValue: {
    fontSize: 28,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
  },
  summaryMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  summaryMetaCell: {
    width: '50%',
    marginBottom: 16,
  },
  summaryMetaLabel: {
    fontSize: 9,
    color: TEXT_MED,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryMetaValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
  },
  confidenceBlock: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 6,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: NAVY,
  },
  confidenceLabel: {
    fontSize: 9,
    color: TEXT_MED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  confidenceValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 6,
  },
  confidenceReason: {
    fontSize: 9,
    color: TEXT_MED,
    lineHeight: 1.5,
  },
  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: NAVY,
    borderRadius: 4,
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: LIGHT_GRAY,
  },
  thCell: {
    padding: '8 6',
    fontSize: 8,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tdCell: {
    padding: '8 6',
    fontSize: 8.5,
    color: TEXT_DARK,
  },
  tdCellHighlight: {
    padding: '8 6',
    fontSize: 8.5,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
  },
  // Adjustment detail
  compCard: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: NAVY,
  },
  compCardHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 10,
  },
  adjRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  adjRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginTop: 2,
  },
  adjLabel: {
    fontSize: 8.5,
    color: TEXT_MED,
    flex: 1,
  },
  adjValue: {
    fontSize: 8.5,
    color: TEXT_DARK,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  adjTotalLabel: {
    fontSize: 9,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
  },
  adjTotalValue: {
    fontSize: 9,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  // Methodology
  bodyText: {
    fontSize: 9.5,
    color: TEXT_DARK,
    lineHeight: 1.7,
    marginBottom: 16,
  },
  disclaimer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
    marginTop: 8,
  },
  disclaimerText: {
    fontSize: 8.5,
    color: '#92400E',
    lineHeight: 1.6,
  },
});

// ─── Formatters ───────────────────────────────────────────────────────────────
function fc(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

function fd(s: string): string {
  if (!s) return '—';
  try {
    return new Date(s).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return s;
  }
}

function pct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

// ─── Condition pill (PDF) ─────────────────────────────────────────────────────
function ConditionPill({ signal }: { signal: Comp['conditionSignal'] }) {
  const bg    = signal === 'Updated' ? '#D1FAE5' : signal === 'Original' ? '#FEE2E2' : '#FEF3C7';
  const color = signal === 'Updated' ? '#065F46' : signal === 'Original' ? '#991B1B' : '#92400E';
  const label = signal === 'Updated' ? 'Updated' : signal === 'Original' ? 'Original' : 'Average';
  return (
    <View style={{ backgroundColor: bg, borderRadius: 3, paddingHorizontal: 4, paddingVertical: 2 }}>
      <Text style={{ fontSize: 7, color, fontFamily: 'Helvetica-Bold' }}>{label}</Text>
    </View>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function PageHeader({ title }: { title: string }) {
  return (
    <View style={s.pageHeader} fixed>
      <Text style={s.pageHeaderTitle}>{title}</Text>
      <Text style={s.pageHeaderBrand}>TrueCMA</Text>
    </View>
  );
}

function PageFooter({
  address,
  date,
}: {
  address: string;
  date: string;
}) {
  return (
    <View style={s.pageFooter} fixed>
      <Text style={s.pageFooterText}>{address}</Text>
      <Text
        style={s.pageFooterText}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}  ·  ${date}`
        }
      />
    </View>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function CoverPage({
  subjectProperty,
  agentName,
  reportDate,
}: {
  subjectProperty: SubjectProperty;
  agentName: string;
  reportDate: string;
}) {
  return (
    <Page size="LETTER" style={s.coverPage}>
      <View style={s.coverBody}>
        <Text style={s.coverEyebrow}>Confidential Report</Text>
        <Text style={s.coverTitle}>Comparative{'\n'}Market Analysis</Text>
        <View style={s.coverDivider} />
        <Text style={s.coverAddress}>{subjectProperty.address || 'Subject Property'}</Text>
        <Text style={s.coverMeta}>
          {subjectProperty.beds} bed · {subjectProperty.baths} bath ·{' '}
          {subjectProperty.sqft.toLocaleString()} sqft · Built {subjectProperty.yearBuilt}
        </Text>
        <Text style={[s.coverMeta, { marginTop: 24 }]}>Prepared for: {agentName}</Text>
        <Text style={s.coverMeta}>Report Date: {reportDate}</Text>
      </View>
      <View style={s.coverFooter}>
        <View>
          <Text style={s.coverBrand}>TrueCMA</Text>
          <Text style={s.coverBrandTagline}>Appraisal-Grade Comparative Market Analysis</Text>
        </View>
        <Text style={s.coverDisclaimer}>
          This report is prepared for informational purposes only and does not
          constitute a licensed appraisal. Values are estimated based on
          comparable sales data.
        </Text>
      </View>
    </Page>
  );
}

function ExecutiveSummaryPage({
  subjectProperty,
  valuationSummary,
  comps,
  reportDate,
}: {
  subjectProperty: SubjectProperty;
  valuationSummary: ValuationSummary;
  comps: Comp[];
  reportDate: string;
}) {
  const confColor =
    valuationSummary.confidenceScore === 'High'
      ? GREEN
      : valuationSummary.confidenceScore === 'Medium'
      ? AMBER
      : RED;

  return (
    <Page size="LETTER" style={s.page}>
      <PageHeader title="Executive Summary" />
      <View style={s.pageBody}>
        {/* Price range */}
        <View style={s.summaryPriceBlock}>
          <View>
            <Text style={s.summaryPriceLabel}>Suggested List Price Range</Text>
            <Text style={s.summaryPriceValue}>
              {fc(valuationSummary.suggestedListLow)} – {fc(valuationSummary.suggestedListHigh)}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[s.summaryPriceLabel, { textAlign: 'right' }]}>
              Median Adjusted Value
            </Text>
            <Text style={[s.summaryPriceValue, { fontSize: 18 }]}>
              {fc(valuationSummary.medianAdjustedPrice)}
            </Text>
          </View>
        </View>

        {/* Meta grid */}
        <View style={[s.summaryMetaGrid, s.mb24]}>
          {[
            ['Avg. Adjusted Price', fc(valuationSummary.averageAdjustedPrice)],
            ['Avg. Price per Sqft', `$${valuationSummary.pricePerSqftAverage.toLocaleString()}/sqft`],
            ['Market Condition', valuationSummary.marketCondition],
            ['Comps Analyzed', `${comps.length} closed sales`],
          ].map(([label, value]) => (
            <View key={label} style={s.summaryMetaCell}>
              <Text style={s.summaryMetaLabel}>{label}</Text>
              <Text style={s.summaryMetaValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Confidence */}
        <View style={[s.confidenceBlock, { borderLeftColor: confColor }]}>
          <Text style={s.confidenceLabel}>Confidence Score</Text>
          <Text style={[s.confidenceValue, { color: confColor }]}>
            {valuationSummary.confidenceScore} Confidence
          </Text>
          <Text style={s.confidenceReason}>{valuationSummary.confidenceReason}</Text>
        </View>

        {/* Subject summary */}
        <Text style={s.sectionTitle}>Subject Property</Text>
        <View style={{ backgroundColor: LIGHT_GRAY, borderRadius: 6, padding: 12 }}>
          <Text style={[s.summaryMetaValue, { fontSize: 11, marginBottom: 4 }]}>
            {subjectProperty.address || 'Address not provided'}
          </Text>
          <Text style={s.summaryMetaLabel}>
            {subjectProperty.beds} bed · {subjectProperty.baths} bath ·{' '}
            {subjectProperty.sqft.toLocaleString()} sqft · Built {subjectProperty.yearBuilt}
          </Text>
        </View>
      </View>
      <PageFooter address={subjectProperty.address} date={reportDate} />
    </Page>
  );
}

function ComparableSalesPage({
  comps,
  subjectProperty,
  reportDate,
}: {
  comps: Comp[];
  subjectProperty: SubjectProperty;
  reportDate: string;
}) {
  const cols = [
    { label: 'Address',    flex: 2.5 },
    { label: 'Close Date', flex: 1.3 },
    { label: 'Close Price',flex: 1.3, right: true },
    { label: 'Sqft',       flex: 1,   right: true },
    { label: '$/Sqft',     flex: 1,   right: true },
    { label: 'Condition',  flex: 1 },
    { label: 'Match',      flex: 0.8, right: true },
    { label: 'Adj. Price', flex: 1.3, right: true },
  ];

  return (
    <Page size="LETTER" style={s.page}>
      <PageHeader title="Comparable Sales" />
      <View style={s.pageBody}>
        <Text style={[s.sectionTitle, s.mb16]}>Top {comps.length} Closed Comparable Sales</Text>

        {/* Table header */}
        <View style={s.tableHeader}>
          {cols.map((col) => (
            <Text
              key={col.label}
              style={[s.thCell, { flex: col.flex, textAlign: col.right ? 'right' : 'left' }]}
            >
              {col.label}
            </Text>
          ))}
        </View>

        {/* Table rows */}
        {comps.map((comp, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <Text style={[s.tdCell, { flex: 2.5 }]}>{comp.address}</Text>
            <Text style={[s.tdCell, { flex: 1.3 }]}>{fd(comp.closeDate)}</Text>
            <Text style={[s.tdCell, { flex: 1.3, textAlign: 'right' }]}>
              {fc(comp.closePrice)}
            </Text>
            <Text style={[s.tdCell, { flex: 1, textAlign: 'right' }]}>
              {comp.sqft.toLocaleString()}
            </Text>
            <Text style={[s.tdCell, { flex: 1, textAlign: 'right' }]}>
              {comp.pricePerSqft > 0 ? `$${comp.pricePerSqft.toLocaleString()}` : '—'}
            </Text>
            {/* Condition badge */}
            <View style={{ flex: 1, padding: '8 6', justifyContent: 'center' }}>
              <ConditionPill signal={comp.conditionSignal} />
            </View>
            <Text style={[s.tdCell, { flex: 0.8, textAlign: 'right' }]}>
              {pct(comp.similarityScore)}
            </Text>
            <Text style={[s.tdCellHighlight, { flex: 1.3, textAlign: 'right' }]}>
              {fc(comp.adjustedPrice)}
            </Text>
          </View>
        ))}

        {/* Summary row */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: NAVY,
            padding: '8 6',
            marginTop: 8,
            borderRadius: 4,
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ fontSize: 9, color: '#94A3B8', marginRight: 8 }}>
            Median Adjusted Value:
          </Text>
          <Text style={{ fontSize: 9, color: WHITE, fontFamily: 'Helvetica-Bold' }}>
            See Executive Summary
          </Text>
        </View>
      </View>
      <PageFooter address={subjectProperty.address} date={reportDate} />
    </Page>
  );
}

function AdjustmentDetailPage({
  comps,
  subjectProperty,
  reportDate,
}: {
  comps: Comp[];
  subjectProperty: SubjectProperty;
  reportDate: string;
}) {
  return (
    <Page size="LETTER" style={s.page}>
      <PageHeader title="Adjustment Detail" />
      <View style={s.pageBody}>
        <Text style={[s.sectionTitle, s.mb16]}>
          Per-Comparable Adjustment Breakdown
        </Text>
        {comps.map((comp, i) => (
          // wrap={false} keeps each comp block on one page — if it won't fit, it starts on a new page
          <View key={i} style={s.compCard} wrap={false}>
            <Text style={s.compCardHeader}>
              Comp {i + 1}: {comp.address}
            </Text>
            <Text style={[s.summaryMetaLabel, { marginBottom: 8 }]}>
              Close Price: {fc(comp.closePrice)}  ·  {comp.sqft.toLocaleString()} sqft ·{' '}
              {comp.beds}bd / {comp.baths}ba · Built {comp.yearBuilt || '—'} ·{' '}
              {pct(comp.similarityScore)} match
            </Text>

            {[
              ['Square Footage', comp.adjustmentBreakdown.sqft],
              ['Bedrooms', comp.adjustmentBreakdown.bedrooms],
              ['Bathrooms', comp.adjustmentBreakdown.bathrooms],
              ['Age / Year Built', comp.adjustmentBreakdown.age],
              ['Condition', comp.adjustmentBreakdown.condition],
            ].map(([label, desc]) => (
              <View key={label} style={s.adjRow}>
                <Text style={s.adjLabel}>{desc}</Text>
              </View>
            ))}

            <View style={s.adjRowTotal}>
              <Text style={s.adjTotalLabel}>{comp.adjustmentBreakdown.total}</Text>
              <Text style={s.adjTotalValue}>
                Adjusted: {fc(comp.adjustedPrice)}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <PageFooter address={subjectProperty.address} date={reportDate} />
    </Page>
  );
}

function MethodologyPage({
  subjectProperty,
  reportDate,
}: {
  subjectProperty: SubjectProperty;
  reportDate: string;
}) {
  return (
    <Page size="LETTER" style={s.page}>
      <PageHeader title="Methodology & Disclaimer" />
      <View style={s.pageBody}>
        <Text style={s.sectionTitle}>Adjustment Methodology</Text>
        <Text style={s.bodyText}>
          TrueCMA employs a paired sales analysis methodology developed in collaboration with
          licensed Oregon appraisers. Each comparable sale is adjusted to reflect the estimated
          value difference between the comparable property and the subject property. Adjustments
          are applied to the comparable&apos;s close price to produce an adjusted value that accounts
          for differences in square footage, bedroom count, bathroom count, and property age.
        </Text>
        <Text style={s.bodyText}>
          Adjustment rates applied in this report:{'\n'}
          • Square Footage: $65 per square foot difference{'\n'}
          • Bedrooms: $8,000 per bedroom difference{'\n'}
          • Bathrooms: $5,000 per bathroom difference{'\n'}
          • Year Built / Age: $500 per year difference (newer properties command a premium)
        </Text>

        <Text style={[s.sectionTitle, s.mb8]}>Confidence Scoring</Text>
        <Text style={s.bodyText}>
          Each comparable sale is assigned a similarity score based on its proximity to the
          subject property across four weighted dimensions: square footage (40%), bedroom count
          (30%), bathroom count (20%), and year built (10%). The overall confidence score for the
          report is determined by the minimum similarity score across all selected comparables.
          High confidence requires all comparables to score above 80%. Medium confidence requires
          all to exceed 65%. Otherwise, the report is assigned a Low confidence rating.
        </Text>

        <Text style={[s.sectionTitle, s.mb8]}>Market Conditions</Text>
        <Text style={s.bodyText}>
          Market condition is assessed using the average days on market (DOM) of the selected
          comparable sales. A Seller&apos;s Market is indicated when average DOM is under 30 days.
          A Balanced Market is indicated at 30–60 days. A Buyer&apos;s Market is indicated above 60
          days. This metric reflects supply-demand conditions at the time comparables were listed.
        </Text>

        <View style={s.disclaimer}>
          <Text style={[s.disclaimerText, { fontFamily: 'Helvetica-Bold', marginBottom: 4 }]}>
            Important Disclaimer
          </Text>
          <Text style={s.disclaimerText}>
            This Comparative Market Analysis (CMA) is prepared for informational and marketing
            purposes only. It is not a licensed appraisal and does not constitute professional
            appraisal advice. This report should not be used as the sole basis for any real estate
            transaction. Values are estimates derived from MLS data and may not reflect all market
            factors. For a certified value opinion, consult a licensed appraiser.
          </Text>
        </View>
      </View>
      <PageFooter address={subjectProperty.address} date={reportDate} />
    </Page>
  );
}

// ─── Main document export ─────────────────────────────────────────────────────
export function CMAPdfDocument({
  subjectProperty,
  comps,
  valuationSummary,
  agentName = '[Agent Name]',
  reportDate,
}: CMAPdfProps) {
  const date =
    reportDate ??
    new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <Document
      title="Comparative Market Analysis"
      author="TrueCMA"
      subject={subjectProperty.address}
    >
      <CoverPage
        subjectProperty={subjectProperty}
        agentName={agentName}
        reportDate={date}
      />
      <ExecutiveSummaryPage
        subjectProperty={subjectProperty}
        valuationSummary={valuationSummary}
        comps={comps}
        reportDate={date}
      />
      <ComparableSalesPage
        comps={comps}
        subjectProperty={subjectProperty}
        reportDate={date}
      />
      <AdjustmentDetailPage
        comps={comps}
        subjectProperty={subjectProperty}
        reportDate={date}
      />
      <MethodologyPage subjectProperty={subjectProperty} reportDate={date} />
    </Document>
  );
}
