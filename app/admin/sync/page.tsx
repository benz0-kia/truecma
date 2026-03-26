'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SyncLog {
  id: number;
  type: string;
  startedAt: string;
  completedAt: string | null;
  recordsProcessed: number;
  status: string;
  error: string | null;
  rangeStart: string | null;
  rangeEnd: string | null;
}

interface SyncStatus {
  totalRecords: number;
  lastSyncDate: string | null;
  recentLogs: SyncLog[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (s: string | null) =>
  s
    ? new Date(s).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit',
      })
    : '—';

const today = new Date().toISOString().slice(0, 10);
const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

// ─── Status badges ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'completed'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : status === 'running'
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-red-100 text-red-800 border-red-200';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {status === 'running' && (
        <svg className="animate-spin w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {status}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SyncAdminPage() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Historical sync form state
  const [startDate, setStartDate] = useState(oneYearAgo);
  const [endDate, setEndDate] = useState(today);
  const [historicalRunning, setHistoricalRunning] = useState(false);
  const [historicalResult, setHistoricalResult] = useState<string | null>(null);

  // Nightly sync state
  const [nightlyRunning, setNightlyRunning] = useState(false);
  const [nightlyResult, setNightlyResult] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/sync-status');
      const json = await res.json();
      setStatus(json);
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  async function runHistoricalSync() {
    setHistoricalRunning(true);
    setHistoricalResult(null);
    try {
      const res = await fetch('/api/admin/sync-historical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate }),
      });
      const json = await res.json();
      if (res.ok) {
        setHistoricalResult(`✓ Synced ${json.recordsProcessed.toLocaleString()} records`);
      } else {
        setHistoricalResult(`Error: ${json.error}`);
      }
    } catch {
      setHistoricalResult('Error: request failed');
    } finally {
      setHistoricalRunning(false);
      fetchStatus();
    }
  }

  async function runNightlySync() {
    setNightlyRunning(true);
    setNightlyResult(null);
    try {
      const res = await fetch('/api/admin/sync-nightly', { method: 'POST' });
      const json = await res.json();
      if (res.ok) {
        setNightlyResult(`✓ Synced ${json.recordsProcessed.toLocaleString()} records`);
      } else {
        setNightlyResult(`Error: ${json.error}`);
      }
    } catch {
      setNightlyResult('Error: request failed');
    } finally {
      setNightlyRunning(false);
      fetchStatus();
    }
  }

  const inputCls =
    'rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2B4B] focus:border-transparent focus:bg-white transition-colors';

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* Header */}
      <header className="bg-[#1B2B4B]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <a href="/" className="text-white text-2xl font-bold tracking-tight">TrueCMA</a>
            <p className="text-[#94A3B8] text-xs mt-0.5 font-medium">MLS Sync Administration</p>
          </div>
          <a href="/" className="text-[#94A3B8] hover:text-white text-xs transition-colors">
            ← Back to CMA
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* ── Stats row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Total Records Synced',
              value: loadingStatus ? '…' : (status?.totalRecords ?? 0).toLocaleString(),
              icon: (
                <svg className="w-5 h-5 text-[#1B2B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              ),
            },
            {
              label: 'Last Sync Date',
              value: loadingStatus ? '…' : fmtDate(status?.lastSyncDate ?? null),
              icon: (
                <svg className="w-5 h-5 text-[#1B2B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              label: 'Sync Runs',
              value: loadingStatus ? '…' : (status?.recentLogs.length ?? 0),
              icon: (
                <svg className="w-5 h-5 text-[#1B2B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4">
              <div className="bg-[#F0F4FA] rounded-xl p-2.5">{icon}</div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-xl font-bold text-[#1B2B4B] mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Historical sync ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#1B2B4B] px-6 py-4">
            <h2 className="text-sm font-bold text-white">Historical Sync</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Pull all closed listings within a date range and store them in the database.
            </p>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputCls}
                />
              </div>
              <button
                onClick={runHistoricalSync}
                disabled={historicalRunning}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1B2B4B] hover:bg-[#253d6b] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 transition-colors shadow-sm"
              >
                {historicalRunning ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Syncing…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Run Historical Sync
                  </>
                )}
              </button>
            </div>
            {historicalResult && (
              <p className={`mt-3 text-sm font-medium ${historicalResult.startsWith('✓') ? 'text-emerald-600' : 'text-red-600'}`}>
                {historicalResult}
              </p>
            )}
            <p className="mt-3 text-xs text-gray-400">
              Pulls in batches of 1,000 · Upserts by MLS ID · Safe to re-run
            </p>
          </div>
        </div>

        {/* ── Nightly sync ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1B2B4B]">Nightly Sync</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Pulls listings modified since the last successful sync and upserts them.
              </p>
            </div>
            <button
              onClick={runNightlySync}
              disabled={nightlyRunning}
              className="inline-flex items-center gap-2 rounded-lg border border-[#1B2B4B] text-[#1B2B4B] hover:bg-[#1B2B4B] hover:text-white disabled:opacity-60 text-sm font-semibold px-4 py-2 transition-colors"
            >
              {nightlyRunning ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Running…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Run Now
                </>
              )}
            </button>
          </div>
          {nightlyResult && (
            <div className="px-6 py-3 border-b border-gray-100">
              <p className={`text-sm font-medium ${nightlyResult.startsWith('✓') ? 'text-emerald-600' : 'text-red-600'}`}>
                {nightlyResult}
              </p>
            </div>
          )}
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Cutoff:</span>{' '}
              {status?.lastSyncDate ? fmtDate(status.lastSyncDate) : 'No prior sync — defaults to 30 days ago'}
            </p>
          </div>
        </div>

        {/* ── Sync log ───────────────────────────────────────────────────────── */}
        {status && status.recentLogs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-[#1B2B4B]">Recent Sync Log</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 10 sync runs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Type', 'Started', 'Completed', 'Records', 'Status', 'Notes'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {status.recentLogs.map((log, i) => (
                    <tr key={log.id} className={`border-b border-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                      <td className="px-4 py-3 font-medium text-gray-800 capitalize">{log.type}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{fmtDate(log.startedAt)}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{fmtDate(log.completedAt)}</td>
                      <td className="px-4 py-3 text-gray-800 font-semibold">
                        {log.recordsProcessed.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px]">
                        {log.error ? (
                          <span className="text-red-500">{log.error}</span>
                        ) : log.rangeStart ? (
                          `${log.rangeStart} → ${log.rangeEnd}`
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {status && status.recentLogs.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-10 text-center">
            <p className="text-gray-400 text-sm">No sync runs yet. Start with a historical sync above.</p>
          </div>
        )}

      </main>

      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center">
          <p className="text-xs text-gray-400">TrueCMA Admin · Demo Spark token · SQLite database</p>
        </div>
      </footer>
    </div>
  );
}
