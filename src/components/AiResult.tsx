import React, { useState } from 'react';
import { VerificationResult } from '../types';
import { SourceCard } from './SourceCard';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, HelpCircle, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { submitFeedbackApi } from '../services/aiService';
import { toast } from 'sonner';

interface AiResultProps {
  result: VerificationResult;
}

export const AiResult: React.FC<AiResultProps> = ({ result }) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'accept' | 'dispute' | null>(result.feedback?.response || null);
  const [disputeNote, setDisputeNote] = useState(result.feedback?.note || '');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getVerdictBadge = (verdict: VerificationResult['verdict']) => {
    switch (verdict) {
      case 'Verified':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified</span>;
      case 'Partly Verified':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Partly Verified</span>;
      case 'Unverified':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><HelpCircle className="w-4 h-4 text-amber-600" /> Unverified</span>;
      case 'Contradicted':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800"><XCircle className="w-4 h-4 text-rose-600" /> Contradicted (False)</span>;
      case 'Insufficient Evidence':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"><AlertTriangle className="w-4 h-4 text-slate-500" /> Insufficient Evidence</span>;
    }
  };

  const handleFeedback = async (responseType: 'accept' | 'dispute') => {
    if (responseType === 'dispute' && !showNoteInput && !feedbackGiven) {
      setShowNoteInput(true);
      toast.info('Please provide optional dispute reasoning or click Submit Dispute again.');
      return;
    }
    setSubmitting(true);
    await submitFeedbackApi(result.recordId, responseType, disputeNote);
    setFeedbackGiven(responseType);
    setSubmitting(false);
    setShowNoteInput(false);

    if (responseType === 'accept') {
      toast.success('Verdict Accepted & Logged', {
        description: `Record ${result.recordId} marked as verified by analyst.`
      });
    } else {
      toast.error('Verdict Disputed', {
        description: `Feedback logged for ${result.recordId} with note: "${disputeNote || 'No note provided'}"`
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header banner */}
      <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
              {result.recordId}
            </span>
            <span className="text-xs text-slate-400">• Session {result.sessionId}</span>
            <span className="text-xs uppercase font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">
              Lang: {result.language}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Verification Verdict</h2>
        </div>

        <div className="flex items-center gap-3">
          {getVerdictBadge(result.verdict)}
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-right">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide">Confidence</span>
            <span className="text-sm font-bold text-emerald-400">{result.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Claim Normalized */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">Normalized Proposition</span>
          <p className="text-sm font-medium text-slate-900">{result.claimNormalized}</p>
        </div>

        {/* Reasoning Chain */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span>Multi-Agent Reasoning Trace</span>
            <span className="text-xs font-normal text-slate-550 bg-slate-100 px-2 py-0.5 rounded-full">
              5-Role ADK Pipeline
            </span>
          </h3>
          <ol className="relative border-l border-slate-200 ml-3 space-y-4">
            {result.reasoning.map((step, idx) => (
              <li key={idx} className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full ring-4 ring-white text-xs font-bold border border-emerald-200">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 font-medium bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Graded Evidence Items */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center justify-between">
            <span>Graded Evidence Sources (Admiralty Scale)</span>
            <span className="text-xs text-slate-500">{result.evidence.length} sources verified</span>
          </h3>
          <div className="space-y-3">
            {result.evidence.map((ev, idx) => (
              <SourceCard key={ev.id || idx} evidence={ev} index={idx} />
            ))}
          </div>
        </div>

        {/* Feedback Loop Control */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Analyst Feedback Loop</h4>
            <p className="text-xs text-slate-500">Rate this verification to train the feedback weighting model.</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {feedbackGiven ? (
              <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Feedback recorded: <strong className="capitalize">{feedbackGiven}</strong></span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleFeedback('accept')}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Accept Verdict</span>
                </button>
                <button
                  onClick={() => handleFeedback('dispute')}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Dispute</span>
                </button>
              </>
            )}
          </div>
        </div>

        {showNoteInput && !feedbackGiven && (
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-3">
            <label className="block text-xs font-semibold text-amber-900">
              Provide reasoning for dispute (optional note):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={disputeNote}
                onChange={(e) => setDisputeNote(e.target.value)}
                placeholder="e.g. Source A1 outdated regarding new circular..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() => handleFeedback('dispute')}
                disabled={submitting}
                className="px-4 py-2 text-xs font-semibold bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
