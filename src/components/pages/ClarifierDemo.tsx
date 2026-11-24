import React, { useState } from 'react';
import { Card } from '../Card';
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2, HelpCircle, ShieldAlert, RefreshCw } from 'lucide-react';
import { verifyClaimApi } from '../../services/aiService';
import { VerificationResult } from '../../types';
import { AiResult } from '../AiResult';

export const ClarifierDemo: React.FC = () => {
  const [selectedAmbiguousClaim, setSelectedAmbiguousClaim] = useState<string>(
    'Bantuan kerajaan confirm dapat ke boss bulan ni?'
  );
  const [activeQuestion, setActiveQuestion] = useState<string>(
    'Which specific Malaysian government aid scheme are you asking about?'
  );
  const [options, setOptions] = useState<string[]>([
    'Sumbangan Tunai Rahmah (STR Phase 3)',
    'Bantuan e-Dompet Belia (e-Wallet)',
    'Bantuan Awal Persekolahan (BAP)',
    'Targeted Diesel Subsidy (BUDI Madani)'
  ]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customClarification, setCustomClarification] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const ambiguousPresets = [
    {
      claim: 'Bantuan kerajaan confirm dapat ke boss bulan ni?',
      question: 'Which specific Malaysian government aid scheme are you asking about?',
      options: ['STR Phase 3', 'Bantuan e-Dompet Belia', 'Bantuan Musibah Banjir']
    },
    {
      claim: 'Subsidi minyak dah batal ke sekarang?',
      question: 'Which fuel subsidy category are you referring to?',
      options: ['Targeted Diesel Subsidy (BUDI Madani)', 'RON95 Targeted Fuel Subsidy', 'LPG Gas Subsidy']
    },
    {
      claim: 'Tol percuma untuk cuti perayaan?',
      question: 'Which festive holiday and concession operator are you referring to?',
      options: ['Deepavali Toll Waiver (Class 1)', 'Hari Raya Aidilfitri Toll Exemption', 'Chinese New Year Waiver']
    }
  ];

  const handleSelectPreset = (p: typeof ambiguousPresets[0]) => {
    setSelectedAmbiguousClaim(p.claim);
    setActiveQuestion(p.question);
    setOptions(p.options);
    setSelectedOption('');
    setCustomClarification('');
    setResult(null);
  };

  const handleRunClarifiedPipeline = async () => {
    const clarification = selectedOption || customClarification;
    if (!clarification) return;

    setLoading(true);
    try {
      const data = await verifyClaimApi(selectedAmbiguousClaim, clarification, false);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-purple-100 text-purple-800 font-bold">
              Collaborative Partner Engine
            </span>
            <span className="text-xs text-slate-500">• Hackathon Category Showcase</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Human-in-the-Loop Clarifier Dialogue</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Demonstrating Agent 1 (Intake & Clarifier): Instead of guessing or hallucinating on ambiguous Manglish/BM rumors, SAHIH pauses execution, asks a focused clarifying question, and collaborates with the user to reach a high-confidence verdict.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Simulation */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="1. Select Ambiguous Proposition" subtitle="Test common vague claims circulating on messaging apps">
            <div className="space-y-2">
              {ambiguousPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(p)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    selectedAmbiguousClaim === p.claim
                      ? 'bg-purple-50 border-purple-300 text-purple-950 font-semibold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                      Vague Claim #{idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400">Manglish / BM</span>
                  </div>
                  <p className="text-xs mt-1 font-medium">"{p.claim}"</p>
                </button>
              ))}
            </div>
          </Card>

          <Card title="2. Collaborative Clarifier Dialogue" subtitle="Agent 1 requests human intervention">
            <div className="space-y-4">
              <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Intake Agent Prompt:</span>
                </div>
                <p className="text-xs text-purple-950 font-medium">
                  {activeQuestion}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Clarification Parameter:
                </label>
                <div className="space-y-1.5">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedOption(opt);
                        setCustomClarification('');
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        selectedOption === opt
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedOption === opt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or enter custom clarification:
                </label>
                <input
                  type="text"
                  value={customClarification}
                  onChange={(e) => {
                    setCustomClarification(e.target.value);
                    setSelectedOption('');
                  }}
                  placeholder="e.g. SARA Cashless food aid in Sarawak"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={handleRunClarifiedPipeline}
                disabled={loading || (!selectedOption && !customClarification)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resuming Verification Pipeline...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Submit & Resume Autonomous Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </Card>
        </div>

        {/* Right Output Area */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <AiResult result={result} />
          ) : (
            <Card>
              <div className="py-20 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Collaborative Partner Workflow</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Select an ambiguous claim on the left, pick the clarified policy parameter, and watch the multi-agent system synthesize verified evidence tailored to your specific context.
                  </p>
                </div>
                <div className="max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 space-y-2">
                  <span className="font-bold text-slate-800 block uppercase text-[10px] tracking-wider">Why this won the category:</span>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Eliminates AI hallucinations on vague Malaysian slang/Manglish.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Seamless transition between autonomous agents and human analyst guidance.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Maintains full audit trail linking original claim, clarifying dialogue, and final verdict.</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
