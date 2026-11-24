import React from 'react';
import { EvidenceItem } from '../types';
import { ExternalLink, ShieldAlert, Award } from 'lucide-react';

interface SourceCardProps {
  evidence: EvidenceItem;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ evidence, index }) => {
  const { sourceName, sourceUrl, snippet, admiraltyCode, publishedDate } = evidence;

  // Color mapping for Admiralty reliability
  const getReliabilityColor = (rel: string) => {
    switch (rel) {
      case 'A': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'B': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'C': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'D': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'E': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
            {index + 1}
          </span>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{sourceName}</h4>
            {publishedDate && <span className="text-[10px] text-slate-500">Published: {publishedDate}</span>}
          </div>
        </div>

        {/* Admiralty Code Badge */}
        <div className="flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${getReliabilityColor(admiraltyCode.reliability)}`} title={`Reliability: ${admiraltyCode.reliability}, Credibility: ${admiraltyCode.credibility}`}>
            {admiraltyCode.codeString}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-700 bg-white p-3 rounded border border-slate-100 my-2 italic">
        "{snippet}"
      </p>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 mt-2 border-t border-slate-200/60">
        <span className="truncate max-w-[280px]">
          <strong className="text-slate-700">Admiralty Justification:</strong> {admiraltyCode.justification}
        </span>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium shrink-0 ml-2"
          >
            <span>Verify Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
