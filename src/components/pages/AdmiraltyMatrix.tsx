import React, { useState } from 'react';
import { Card } from '../Card';
import { MALAYSIAN_AUTHORITIES } from '../../services/malaysianMockData';
import { TableProperties, ShieldCheck, Info, CheckCircle2, Search, ExternalLink, Award } from 'lucide-react';

export const AdmiraltyMatrix: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ rel: string; cred: number } | null>({ rel: 'A', cred: 1 });
  const [searchFilter, setSearchFilter] = useState('');

  const reliabilityLevels = [
    { code: 'A', title: 'Completely Reliable', desc: 'No doubt of authenticity, trustworthiness, or competence. Direct official source or statutory agency.' },
    { code: 'B', title: 'Usually Reliable', desc: 'Minor doubt of authenticity or competence. Established national press wires and accredited institutions.' },
    { code: 'C', title: 'Fairly Reliable', desc: 'Doubt of authenticity, trustworthiness, or competence; has provided valid info previously.' },
    { code: 'D', title: 'Not Usually Reliable', desc: 'Significant doubt of authenticity, integrity, or track record.' },
    { code: 'E', title: 'Unreliable', desc: 'Lacking in authenticity, trustworthiness, and competence. Known disinformation channels.' },
    { code: 'F', title: 'Cannot be Judged', desc: 'No basis exists for evaluating reliability of the source.' },
  ];

  const credibilityLevels = [
    { code: 1, title: 'Confirmed by other sources', desc: 'Confirmed by other independent sources, direct official documents, or physical records.' },
    { code: 2, title: 'Probably True', desc: 'Logical in itself; consistent with other information on the subject.' },
    { code: 3, title: 'Possibly True', desc: 'Reasonably possible; not contradicted by known facts.' },
    { code: 4, title: 'Doubtful', desc: 'Not logical; contradicted by other information on the subject.' },
    { code: 5, title: 'Improbable', desc: 'Inconceivable; contradicted by confirmed facts.' },
    { code: 6, title: 'Cannot be Judged', desc: 'No basis exists for evaluating the validity of the information.' },
  ];

  const filteredAuthorities = MALAYSIAN_AUTHORITIES.filter(
    (a) =>
      a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.domain.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-blue-100 text-blue-800 font-bold">
              NATO / Admiralty Code System
            </span>
            <span className="text-xs text-slate-500">• Intelligence Source Evaluation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Admiralty Source Reliability & Credibility Index</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            SAHIH Verify Agent 3 (Source Grader) scores every retrieved citation using the military-standard Admiralty System. Rather than treating all web links equally, each source is rigorously evaluated along independent Source Reliability (A–F) and Information Credibility (1–6) axes.
          </p>
        </div>
      </div>

      {/* Interactive Matrix Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card title="Interactive 6x6 Admiralty Intelligence Matrix" subtitle="Click any coordinate cell to view evaluation criteria">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200">
                      Reliability \ Credibility
                    </th>
                    {credibilityLevels.map((c) => (
                      <th key={c.code} className="p-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200">
                        Level {c.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reliabilityLevels.map((r) => (
                    <tr key={r.code}>
                      <td className="p-2 text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 text-left">
                        <span className="font-mono text-emerald-700 mr-1.5 font-bold">[{r.code}]</span>
                        <span className="hidden sm:inline text-[11px]">{r.title}</span>
                      </td>
                      {credibilityLevels.map((c) => {
                        const isSelected = selectedCell?.rel === r.code && selectedCell?.cred === c.code;
                        const isHighConfidence = (r.code === 'A' || r.code === 'B') && (c.code === 1 || c.code === 2);
                        const isDebunked = (r.code === 'A' || r.code === 'B') && (c.code === 4 || c.code === 5);

                        return (
                          <td
                            key={c.code}
                            onClick={() => setSelectedCell({ rel: r.code, cred: c.code })}
                            className={`p-2.5 text-xs font-mono font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-slate-900 text-white ring-2 ring-emerald-500 scale-105 z-10'
                                : isHighConfidence
                                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                                : isDebunked
                                ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 border-rose-200'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-200 border-slate-200'
                            }`}
                          >
                            {r.code}{c.code}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300" />
                <span>Verified Baseline (A1-B2)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-300" />
                <span>Contradicted / Debunked High Authority (A4-B5)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                <span>Unverified / Secondary</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Matrix Inspector Panel */}
        <div className="lg:col-span-4">
          <Card title="Admiralty Coordinate Inspector" subtitle="Selected Code Definition">
            {selectedCell ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl">
                  <div>
                    <span className="text-[10px] uppercase text-emerald-400 font-mono font-bold tracking-wider">Admiralty Coordinate</span>
                    <h3 className="text-2xl font-bold font-mono text-white mt-0.5">
                      Code {selectedCell.rel}{selectedCell.cred}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-slate-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                    Source Reliability (Axis {selectedCell.rel})
                  </span>
                  <p className="text-xs font-semibold text-slate-900">
                    {reliabilityLevels.find((r) => r.code === selectedCell.rel)?.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {reliabilityLevels.find((r) => r.code === selectedCell.rel)?.desc}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                    Information Credibility (Axis {selectedCell.cred})
                  </span>
                  <p className="text-xs font-semibold text-slate-900">
                    {credibilityLevels.find((c) => c.code === selectedCell.cred)?.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {credibilityLevels.find((c) => c.code === selectedCell.cred)?.desc}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-8 text-center">Click a cell on the matrix to view criteria.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Malaysian Source Trust Catalog */}
      <Card
        title="Malaysian Statutory Source Trust Registry"
        subtitle="Pre-calibrated domain authorities loaded into Agent 3 Source Grader"
        headerAction={
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search domain or agency..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAuthorities.map((auth, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {auth.name}
                    {auth.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </span>
                  <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Reliability {auth.defaultReliability}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2">{auth.domain}</span>
                <p className="text-xs text-slate-600">{auth.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
                  {auth.category}
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Priority Grounding Vector
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
