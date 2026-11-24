import React, { useState } from 'react';
import { Card } from '../Card';
import { BENCHMARK_CASES } from '../../services/malaysianMockData';
import { BenchmarkCase, VerificationResult } from '../../types';
import { verifyClaimApi } from '../../services/aiService';
import { BarChart2, Play, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import { AiResult } from '../AiResult';

export const Benchmarks: React.FC = () => {
  const [runningId, setRunningId] = useState<string | null>(null);
  const [resultsMap, setResultsMap] = useState<Record<string, VerificationResult>>({});
  const [activeResult, setActiveResult] = useState<VerificationResult | null>(null);

  const handleRunSingle = async (benchmark: BenchmarkCase) => {
    setRunningId(benchmark.id);
    try {
      const res = await verifyClaimApi(benchmark.claim);
      setResultsMap((prev) => ({ ...prev, [benchmark.id]: res }));
      setActiveResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setRunningId(null);
    }
  };

  const handleRunAll = async () => {
    for (const b of BENCHMARK_CASES) {
      setRunningId(b.id);
      try {
        const res = await verifyClaimApi(b.claim);
        setResultsMap((prev) => ({ ...prev, [b.id]: res }));
      } catch (err) {
        console.error(err);
      }
    }
    setRunningId(null);
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Verified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Verified</span>;
      case 'Partly Verified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Partly Verified</span>;
      case 'Contradicted':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Contradicted</span>;
      case 'Unverified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Unverified</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">Insufficient</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-100 text-emerald-800 font-bold">
              Malaysian Claim Benchmarking
            </span>
            <span className="text-xs text-slate-500">• Test Suite Evaluation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Evaluation Dataset & Accuracy Metrics</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Pre-compiled evaluation benchmarks covering viral WhatsApp rumors, Manglish colloquial inquiries, official policy circulars, and ambiguous multi-source claims.
          </p>
        </div>

        <button
          onClick={handleRunAll}
          disabled={runningId !== null}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{runningId ? 'Running Test Suite...' : 'Run All Benchmarks'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Benchmark List */}
        <div className="lg:col-span-6 space-y-4">
          <Card title="Malaysian Ground Truth Test Cases" subtitle="Click 'Run Agent' to execute live pipeline evaluation">
            <div className="space-y-3">
              {BENCHMARK_CASES.map((b) => {
                const res = resultsMap[b.id];
                const isRunning = runningId === b.id;
                const isMatch = res && res.verdict === b.expectedVerdict;

                return (
                  <div
                    key={b.id}
                    className={`p-4 rounded-xl border transition-all ${
                      activeResult?.claimOriginal === b.claim
                        ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-800">{b.id}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                          {b.language}
                        </span>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                          {b.complexity}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500">Expected:</span>
                        {getVerdictBadge(b.expectedVerdict)}
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 mb-1">{b.title}</h4>
                    <p className="text-xs text-slate-700 font-medium mb-2">"{b.claim}"</p>
                    <p className="text-[11px] text-slate-500 italic mb-3">{b.notes}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      {res ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-700">Actual:</span>
                          {getVerdictBadge(res.verdict)}
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            isMatch ? 'text-emerald-700' : 'text-amber-700'
                          }`}>
                            {isMatch ? '✓ Pass (100% Match)' : '• Divergence (Reviewed)'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Ready for evaluation</span>
                      )}

                      <div className="flex items-center gap-2">
                        {res && (
                          <button
                            onClick={() => setActiveResult(res)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded cursor-pointer"
                          >
                            View Result
                          </button>
                        )}
                        <button
                          onClick={() => handleRunSingle(b)}
                          disabled={isRunning}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          {isRunning ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play className="w-3 h-3 fill-white" />
                          )}
                          <span>{isRunning ? 'Evaluating...' : 'Run Agent'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Result Preview */}
        <div className="lg:col-span-6 space-y-4">
          {activeResult ? (
            <AiResult result={activeResult} />
          ) : (
            <Card>
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Benchmark Evaluation Workspace</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Execute single or batch benchmark tests on the left to inspect multi-agent reasoning, grounded evidence citations, and Admiralty source grades.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
