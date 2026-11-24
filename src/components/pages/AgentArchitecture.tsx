import React, { useState } from 'react';
import { Card } from '../Card';
import { AgentArchitectureDiagram } from '../AgentArchitectureDiagram';
import { 
  Cpu, 
  Workflow, 
  Server, 
  Database, 
  Layers, 
  Sparkles, 
  Search, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Terminal
} from 'lucide-react';

export const AgentArchitecture: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<number>(0);

  const agents = [
    {
      id: 'orchestrator',
      name: 'Orchestrator Agent',
      role: 'Pipeline State & Failure Tolerance Manager',
      geminiModel: 'Gemini 2.5 Flash',
      adkPrimitive: 'Sequential & Evaluator Optimizer Loops',
      description: 'Coordinates agent lifecycles, manages session state, handles retry/backoff policies, and writes transaction logs to Firestore.',
      capabilities: [
        'Session state machine and task dispatching',
        'Failure detection and fallback routing',
        'Transaction logging to Firestore /sessions and /records',
        'Analyst feedback loop ingestion and model re-tuning'
      ],
      inputOutput: {
        input: 'Raw user claim string or WhatsApp audio transcript',
        output: 'Orchestrated multi-agent verification payload with confidence envelope'
      }
    },
    {
      id: 'intake',
      name: 'Intake & Clarifier Agent',
      role: 'BM / Manglish Normalization & Collaborative Clarifier',
      geminiModel: 'Gemini 2.5 Flash',
      adkPrimitive: 'Human-in-the-Loop Clarification Gate',
      description: 'Detects input dialect (Bahasa Malaysia, Manglish, or English), normalizes the statement to a single checkable proposition, and triggers interactive clarification when propositions are ambiguous.',
      capabilities: [
        'Multilingual token parsing (Manglish slang: "mcm", "lah", "boss", "confirm ke")',
        'Proposition normalization and entity extraction',
        'Ambiguity detection and collaborative question generation',
        'Analyst prompt generation with pre-populated option pills'
      ],
      inputOutput: {
        input: 'Colloquial claim: "Eh boss confirm ke gov nak bagi RM500?"',
        output: 'Normalized: "Does Malaysian MOF offer RM500 universal e-wallet aid?"'
      }
    },
    {
      id: 'retrieval',
      name: 'Parallel Retrieval Agent',
      role: 'Search Grounding & Institutional Scraper',
      geminiModel: 'Gemini 2.5 Flash (Google Search Tool)',
      adkPrimitive: 'Parallel Tool Execution & Domain Filter',
      description: 'Executes parallel grounded queries across official Malaysian portals (.gov.my, bnm.gov.my, moh.gov.my), Bernama statutory wires, and accredited press agencies.',
      capabilities: [
        'Real-time Google Search Grounding with query optimization',
        'Institutional domain prioritization (Sebenarnya.my, MOF, KKM, PDRM)',
        'Parallel snippet fetching and deduplication',
        'Temporal filtering for recent circulars and policy notices'
      ],
      inputOutput: {
        input: 'Normalized proposition query terms',
        output: 'Ranked collection of 4-8 grounded citations with publication dates'
      }
    },
    {
      id: 'grader',
      name: 'Source Grader Agent',
      role: 'Admiralty Reliability & Credibility Evaluator',
      geminiModel: 'Gemini 2.5 Flash',
      adkPrimitive: 'Multi-Criteria Scoring Engine',
      description: 'Evaluates each retrieved evidence snippet against the NATO/Admiralty Intelligence scale, assigning independent Source Reliability (A-F) and Information Credibility (1-6) codes with structured justification.',
      capabilities: [
        'Admiralty coordinate computation (A1 to F6)',
        'Authoritative source weighting vs social media discounting',
        'Itemized evidence justification and timestamp verification',
        'Direct refutation detection (e.g. ministerial debunk notices)'
      ],
      inputOutput: {
        input: 'Raw source snippets + publisher domain metadata',
        output: 'Admiralty codes (e.g. A1, B2) with explicit reasoning strings'
      }
    },
    {
      id: 'synthesis',
      name: 'Synthesis & Verdict Agent',
      role: 'Consensus Weighing & Verdict Determination',
      geminiModel: 'Gemini 2.5 Flash',
      adkPrimitive: 'Evaluator Optimizer & Confidence Scorer',
      description: 'Weighs graded evidence, resolves conflicting claims, calculates a mathematical confidence percentage, and outputs one of five discrete verdicts with a cited reasoning chain.',
      capabilities: [
        '5-State Verdict Mapping (Verified / Partly / Unverified / Contradicted / Insufficient)',
        'Confidence score algorithm based on highest Admiralty weightings',
        'Step-by-step audit reasoning chain generation',
        'User-facing executive summary generation in plain language'
      ],
      inputOutput: {
        input: 'Graded evidence array + Admiralty justifications',
        output: 'Final Verdict, Confidence % (0-100), and Cited Reasoning Steps'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-100 text-emerald-800 font-bold">
              ADK & Cloud Run Architecture
            </span>
            <span className="text-xs text-slate-500">• 5-Agent Autonomous Verifier</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Multi-Agent System Topology & Cloud Infrastructure</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Detailed breakdown of the 5 autonomous agents built during the submission window, their agentic primitives, Google GenAI SDK integration, and Cloud Run microservices.
          </p>
        </div>
      </div>

      {/* Visual Flow Topology Component */}
      <AgentArchitectureDiagram />

      {/* Cloud Run Microservices Topology Diagram */}
      <Card title="Microservice Architecture (Dual Cloud Run Container)" subtitle="Disclosed prior work + Fresh Hackathon ADK engine">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          {/* Microservice 1 */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold font-mono text-slate-400">Microservice A</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 text-[10px] font-mono">Port 3000</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>escalate-web (Cloud Run)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                React 18 + Vite + Express proxy container serving intelligence dashboard & fact-checking workspace.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span>Origin: Disclosed Prior Work</span>
            </div>
          </div>

          {/* Microservice 2 */}
          <div className="p-4 rounded-xl bg-emerald-950 text-white border border-emerald-800 space-y-3 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold font-mono text-emerald-400">Microservice B</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 text-[10px] font-mono font-bold">Hackathon Build</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>verify-engine (Cloud Run)</span>
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1">
                Autonomous 5-Agent ADK engine powered by Gemini 2.5 Flash with Google Search Grounding.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900 text-[11px] text-emerald-300 font-semibold">
              <span>Category: Collaborative Partner</span>
            </div>
          </div>

          {/* Database Layer */}
          <div className="p-4 rounded-xl bg-blue-950 text-white border border-blue-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold font-mono text-blue-400">Persistence</span>
              <span className="px-2 py-0.5 rounded bg-blue-900 text-blue-300 text-[10px] font-mono">Firestore</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-400" />
                <span>Google Cloud Firestore</span>
              </h3>
              <p className="text-xs text-blue-200/80 mt-1">
                Persistent storage for /sessions, /records, /evidence, and /feedback collections.
              </p>
            </div>
            <div className="pt-2 border-t border-blue-900 text-[11px] text-blue-300">
              <span>Sync Mode: Real-time Event Sink</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 5-Agent Topology Pipeline */}
      <Card title="5-Agent Pipeline Visualizer" subtitle="Click an agent below to inspect its prompt schema and ADK role">
        {/* Step Flow Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-2">
          {agents.map((ag, idx) => (
            <button
              key={ag.id}
              onClick={() => setSelectedAgent(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedAgent === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  selectedAgent === idx ? 'bg-emerald-500 text-slate-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono opacity-70">Agent</span>
              </div>
              <p className="text-xs font-bold truncate">{ag.name.replace(' Agent', '')}</p>
            </button>
          ))}
        </div>

        {/* Selected Agent Details */}
        <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Agent #{selectedAgent + 1} of 5
                </span>
                <span className="text-xs text-slate-500">• Model: {agents[selectedAgent].geminiModel}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{agents[selectedAgent].name}</h3>
              <p className="text-xs text-slate-600 font-medium">{agents[selectedAgent].role}</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 text-right">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">ADK Primitive</span>
              <span className="text-xs font-mono font-bold text-purple-700">{agents[selectedAgent].adkPrimitive}</span>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">{agents[selectedAgent].description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">Key Capabilities</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {agents[selectedAgent].capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">Data Flow Contracts</span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Input:</span>
                  <p className="font-mono text-slate-800 bg-slate-50 p-2 rounded border border-slate-200 mt-0.5">
                    {agents[selectedAgent].inputOutput.input}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Output:</span>
                  <p className="font-mono text-emerald-900 bg-emerald-50/60 p-2 rounded border border-emerald-200 mt-0.5">
                    {agents[selectedAgent].inputOutput.output}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Firestore Schema Explorer */}
      <Card title="Google Cloud Firestore Schema" subtitle="Data structures defined in section 7 of the specification">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">/sessions</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Collection</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-white p-3 rounded border border-slate-200 overflow-x-auto">
{`{
  sessionId: string,
  createdAt: timestamp,
  status: "complete",
  claimCount: number
}`}
            </pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">/records</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Collection</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-white p-3 rounded border border-slate-200 overflow-x-auto">
{`{
  recordId: string,
  sessionId: string,
  claimOriginal: string,
  claimNormalized: string,
  language: "manglish"|"ms"|"en",
  verdict: VerdictType,
  confidence: number,
  reasoning: string[],
  evidence: EvidenceItem[],
  createdAt: timestamp
}`}
            </pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">/feedback</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Collection</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-white p-3 rounded border border-slate-200 overflow-x-auto">
{`{
  feedbackId: string,
  recordId: string,
  response: "accept"|"dispute",
  note: string,
  analyst: string,
  timestamp: timestamp
}`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
};
