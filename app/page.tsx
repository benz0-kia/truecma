'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdjustmentBreakdown {
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  age: string;
  condition: string;
  total: string;
}

interface Comp {
  address: string;
  closePrice: number;
  closeDate: string;
  sqft: number;
  beds: number;
  baths: number;
  yearBuilt: number;
  conditionSignal: 'Updated' | 'Original' | 'Mixed' | 'Unknown';
  conditionAdjustment: number;
  similarityScore: number;
  pricePerSqft: number;
  sqftAdjustment: number;
  bedroomAdjustment: number;
  bathroomAdjustment: number;
  ageAdjustment: number;
  totalAdjustment: number;
  adjustedPrice: number;
  adjustmentBreakdown: AdjustmentBreakdown;
  outlier: boolean;
  outlierNote: string;
}

interface ValuationSummary {
  averageAdjustedPrice: number;
  medianAdjustedPrice: number;
  suggestedListLow: number;
  suggestedListHigh: number;
  pricePerSqftAverage: number;
  confidenceScore: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  marketCondition: "Seller's Market" | 'Balanced Market' | "Buyer's Market";
}

// ─── Formatters ───────────────────────────────────────────────────────────────
const fc = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const fd = (s: string) =>
  s
    ? new Date(s).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

const pct = (n: number) => `${Math.round(n * 100)}%`;

// ─── Sub-components ───────────────────────────────────────────────────────────
function FormField({
  label,
  children,
  colSpan2,
}: {
  label: string;
  children: React.ReactNode;
  colSpan2?: boolean;
}) {
  return (
    <div className={colSpan2 ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2B4B] focus:border-transparent focus:bg-white transition-colors';

function ConfidenceBadge({ score }: { score: ValuationSummary['confidenceScore'] }) {
  const styles =
    score === 'High'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : score === 'Medium'
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-red-100 text-red-800 border-red-200';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          score === 'High'
            ? 'bg-emerald-500'
            : score === 'Medium'
            ? 'bg-amber-500'
            : 'bg-red-500'
        }`}
      />
      {score} Confidence
    </span>
  );
}

function MarketBadge({ condition }: { condition: ValuationSummary['marketCondition'] }) {
  const styles =
    condition === "Seller's Market"
      ? 'bg-blue-50 text-blue-800 border-blue-200'
      : condition === 'Balanced Market'
      ? 'bg-gray-100 text-gray-700 border-gray-200'
      : 'bg-violet-50 text-violet-800 border-violet-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
      {condition}
    </span>
  );
}

function ConditionBadge({ signal }: { signal: Comp['conditionSignal'] }) {
  const styles =
    signal === 'Updated'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : signal === 'Original'
      ? 'bg-red-50 text-red-700 border-red-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';
  const label = signal === 'Updated' ? 'Updated' : signal === 'Original' ? 'Original' : 'Average';
  return (
    <span
      title="Based on listing remarks"
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${styles}`}
    >
      {label}
    </span>
  );
}

function AdjustmentDrawer({ comp }: { comp: Comp }) {
  const lines = [
    { label: 'Square Footage', desc: comp.adjustmentBreakdown.sqft },
    { label: 'Bedrooms', desc: comp.adjustmentBreakdown.bedrooms },
    { label: 'Bathrooms', desc: comp.adjustmentBreakdown.bathrooms },
    { label: 'Age / Year Built', desc: comp.adjustmentBreakdown.age },
    { label: 'Condition', desc: comp.adjustmentBreakdown.condition },
  ];

  return (
    <tr>
      <td colSpan={8} className="bg-[#F0F4FA] px-0 py-0">
        <div className="px-6 py-4 border-l-4 border-[#1B2B4B]">
          <p className="text-xs font-semibold text-[#1B2B4B] uppercase tracking-wide mb-3">
            Adjustment Breakdown
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {lines.map((line) => (
              <div
                key={line.label}
                className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-gray-100"
              >
                <span className="text-xs text-gray-400 font-medium w-24 shrink-0 mt-0.5">
                  {line.label}
                </span>
                <span className="text-xs text-gray-700 leading-relaxed">{line.desc}</span>
              </div>
            ))}
          </div>
          {comp.outlier && (
            <div className="mb-2 flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
              <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-amber-700 font-medium">{comp.outlierNote}</span>
            </div>
          )}
          <div className="flex items-center justify-between bg-[#1B2B4B] rounded-lg px-4 py-2.5 text-white">
            <span className="text-xs font-semibold">{comp.adjustmentBreakdown.total}</span>
            <span className="text-sm font-bold">{fc(comp.adjustedPrice)}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const defaultForm = {
  address: '',
  beds: '',
  baths: '',
  sqft: '',
  yearBuilt: '',
  condition: 'Average',
};

export default function Home() {
  const [form, setForm] = useState(defaultForm);
  const [comps, setComps] = useState<Comp[] | null>(null);
  const [summary, setSummary] = useState<ValuationSummary | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mlsStatus, setMlsStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

  async function handleAddressLookup(address: string) {
    if (!address.trim()) return;
    setMlsStatus('loading');
    try {
      const res = await fetch('/api/lookup-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const json = await res.json();
      if (json.found) {
        setForm((prev) => ({
          ...prev,
          beds: json.beds != null ? String(json.beds) : prev.beds,
          baths: json.baths != null ? String(json.baths) : prev.baths,
          sqft: json.sqft != null ? String(json.sqft) : prev.sqft,
          yearBuilt: json.yearBuilt != null ? String(json.yearBuilt) : prev.yearBuilt,
        }));
        setMlsStatus('found');
      } else {
        setMlsStatus('not-found');
      }
    } catch {
      setMlsStatus('not-found');
    }
  }

  function toggleRow(i: number) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setComps(null);
    setSummary(null);
    setExpandedRows(new Set());

    try {
      const res = await fetch('/api/comps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beds: Number(form.beds),
          baths: Number(form.baths),
          sqft: Number(form.sqft),
          yearBuilt: Number(form.yearBuilt),
          condition: form.condition,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong.');
        return;
      }
      setComps(json.comps);
      setSummary(json.valuationSummary);
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGeneratePdf() {
    if (!comps || !summary) return;
    setPdfLoading(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectProperty: {
            address: form.address,
            beds: Number(form.beds),
            baths: Number(form.baths),
            sqft: Number(form.sqft),
            yearBuilt: Number(form.yearBuilt),
          },
          comps,
          valuationSummary: summary,
        }),
      });
      if (!res.ok) {
        setError('PDF generation failed. Please try again.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cma-report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('PDF generation failed. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  }

  const scoreColor = (n: number) =>
    n >= 0.8
      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
      : n >= 0.65
      ? 'bg-amber-50 text-amber-800 border border-amber-200'
      : 'bg-red-50 text-red-800 border border-red-200';

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#1B2B4B]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-white text-2xl font-bold tracking-tight">TrueCMA</span>
            <p className="text-[#94A3B8] text-xs mt-0.5 font-medium">
              Appraisal-Grade Comparative Market Analysis
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            MLS-Connected · Appraiser-Verified
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-8">
        {/* ── Form ───────────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 pt-6 pb-1">
            <h2 className="text-base font-bold text-[#1B2B4B]">Subject Property</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter the property details to generate comparable sales data and an adjusted value range.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Property Address" colSpan2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="123 Main St, Portland, OR 97201"
                    value={form.address}
                    onChange={(e) => {
                      setForm({ ...form, address: e.target.value });
                      if (mlsStatus !== 'idle') setMlsStatus('idle');
                    }}
                    onBlur={(e) => handleAddressLookup(e.target.value)}
                    className={inputCls}
                  />
                  {mlsStatus === 'loading' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {mlsStatus === 'loading' && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="animate-spin h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Looking up property in MLS…
                  </p>
                )}
                {mlsStatus === 'found' && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Property found in MLS
                  </p>
                )}
                {mlsStatus === 'not-found' && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-600">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Property not found — please enter details manually
                  </p>
                )}
              </FormField>
              {[
                { key: 'beds', label: 'Bedrooms', placeholder: '3' },
                { key: 'baths', label: 'Bathrooms', placeholder: '2' },
                { key: 'sqft', label: 'Square Footage', placeholder: '1,800' },
                { key: 'yearBuilt', label: 'Year Built', placeholder: '2005' },
              ].map(({ key, label, placeholder }) => (
                <FormField key={key} label={label}>
                  <input
                    type="number"
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    min={0}
                    className={inputCls}
                  />
                </FormField>
              ))}
              <FormField label="Condition" colSpan2>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className={`${inputCls} cursor-pointer`}
                >
                  {['Fully Remodeled', 'Updated', 'Average', 'Original', 'Poor'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </FormField>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1B2B4B] hover:bg-[#253d6b] disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Analyzing Market…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Run CMA Analysis
                  </>
                )}
              </button>
              {comps && (
                <button
                  type="button"
                  onClick={handleGeneratePdf}
                  disabled={pdfLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#1B2B4B] text-[#1B2B4B] hover:bg-[#1B2B4B] hover:text-white disabled:opacity-60 text-sm font-semibold px-5 py-2.5 transition-colors"
                >
                  {pdfLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate CMA Report
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Error ──────────────────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ── Valuation Summary ──────────────────────────────────────────────── */}
        {summary && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Navy top bar */}
            <div className="bg-[#1B2B4B] px-6 py-5">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">
                Suggested List Price Range
              </p>
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-4xl font-bold text-white tracking-tight">
                  {fc(summary.suggestedListLow)}
                  <span className="text-2xl text-[#94A3B8] mx-2">–</span>
                  {fc(summary.suggestedListHigh)}
                </span>
                <div className="flex flex-wrap items-center gap-2 pb-0.5">
                  <ConfidenceBadge score={summary.confidenceScore} />
                  <MarketBadge condition={summary.marketCondition} />
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
              {[
                { label: 'Median Adjusted Value', value: fc(summary.medianAdjustedPrice) },
                { label: 'Average Adjusted Value', value: fc(summary.averageAdjustedPrice) },
                { label: 'Avg. Price per Sqft', value: `$${summary.pricePerSqftAverage.toLocaleString()}/sqft` },
                { label: 'Comps Analyzed', value: `${comps?.length ?? 0} sales` },
              ].map(({ label, value }) => (
                <div key={label} className="px-5 py-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                  <p className="text-lg font-bold text-[#1B2B4B]">{value}</p>
                </div>
              ))}
            </div>

            {/* Confidence explanation */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-[#1B2B4B] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-600 leading-relaxed">{summary.confidenceReason}</p>
            </div>
          </div>
        )}

        {/* ── Comp Table ─────────────────────────────────────────────────────── */}
        {comps && comps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1B2B4B]">
                  Comparable Sales
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Click any row to expand the full adjustment breakdown
                </p>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {comps.length} of 20 filtered
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[
                      { label: 'Address', left: true },
                      { label: 'Close Date', left: false },
                      { label: 'Close Price', left: false },
                      { label: 'Sqft', left: false },
                      { label: '$/Sqft', left: false },
                      { label: 'Condition', left: false },
                      { label: 'Match', left: false },
                      { label: 'Adj. Price', left: false, navy: true },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${
                          col.navy
                            ? 'bg-[#1B2B4B] text-white text-right rounded-t'
                            : `text-gray-400 ${col.left ? 'text-left' : 'text-right'}`
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                    {/* expand chevron column */}
                    <th className="px-2 py-3 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {comps.map((comp, i) => {
                    const expanded = expandedRows.has(i);
                    return (
                      <>
                        <tr
                          key={`row-${i}`}
                          onClick={() => toggleRow(i)}
                          className={`border-b border-gray-50 cursor-pointer transition-colors ${
                            comp.outlier
                              ? 'bg-amber-50/60'
                              : expanded
                              ? 'bg-[#F0F4FA]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-4 py-3.5 font-medium text-gray-800 max-w-[200px]">
                            <span className="block truncate">{comp.address}</span>
                          </td>
                          <td className="px-4 py-3.5 text-right text-gray-600 whitespace-nowrap">
                            {fd(comp.closeDate)}
                          </td>
                          <td className="px-4 py-3.5 text-right font-semibold text-gray-900 whitespace-nowrap">
                            {fc(comp.closePrice)}
                          </td>
                          <td className="px-4 py-3.5 text-right text-gray-600">
                            {comp.sqft.toLocaleString()}
                          </td>
                          <td className="px-4 py-3.5 text-right text-gray-600 whitespace-nowrap">
                            {comp.pricePerSqft > 0
                              ? `$${comp.pricePerSqft.toLocaleString()}`
                              : '—'}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <ConditionBadge signal={comp.conditionSignal} />
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${scoreColor(
                                comp.similarityScore
                              )}`}
                            >
                              {pct(comp.similarityScore)}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right bg-[#1B2B4B]/5 whitespace-nowrap">
                            <span className={`font-bold ${comp.outlier ? 'text-amber-600' : 'text-[#1B2B4B]'}`}>
                              {fc(comp.adjustedPrice)}
                            </span>
                            {comp.outlier && (
                              <span className="block text-xs font-normal text-amber-500 mt-0.5">Outlier</span>
                            )}
                          </td>
                          <td className="px-2 py-3.5 text-right text-gray-400">
                            <svg
                              className={`w-4 h-4 transition-transform inline-block ${
                                expanded ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </td>
                        </tr>
                        {expanded && <AdjustmentDrawer key={`drawer-${i}`} comp={comp} />}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {comps && comps.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-12 text-center">
            <p className="text-gray-400 text-sm">No closed listings found for this search.</p>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#1B2B4B]">TrueCMA</span>
          <p className="text-xs text-gray-400 text-center">
            Methodology developed with licensed Oregon appraisers · Not a substitute for a licensed appraisal
          </p>
          <p className="text-xs text-gray-400">
            {new Date().getFullYear()} TrueCMA
          </p>
        </div>
      </footer>
    </div>
  );
}
