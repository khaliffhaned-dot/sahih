import React, { useState } from 'react';
import { Cpu, Workflow, Database, Server, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  model: string;
  adkPrimitive: string;
  description: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
}

export const AgentArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('intake');

  const nodes: AgentNode[] = [
    {
      id: 'orchestrator',
      name: '1. Orchestrator Agent',
      role: 'Pipeline State & Failure Tolerance Manager',
      model: 'Gemini 2.5 Flash',
      adkPrimitive: 'Sequential & Evaluator Optimizer Loops',
      description: 'Coordinates agent lifecycles, manages session state, handles retry/backoff policies, and writes transaction logs to Firestore.',
      color: 'bg-slate-900 text-white',
      borderColor: 'border-slate-700',
      badgeBg: 'bg-slate-800',
      badgeText: 'text-slate-200'
    },
    {
      id: 'intake',
      name: '2. Intake & Clarifier Agent',
      role: 'BM / Manglish Normalization & Collaborative Clarifier',
      model: 'Gemini 2.5 Flash',
      adkPrimitive: 'Human-in-the-Loop Clarification Gate',
      description: 'Detects input dialect (Bahasa Malaysia, Manglish, or English), normalizes the statement into a checkable proposition, and triggers interactive clarification when ambiguous.',
      color: 'bg-blue-950 text-white',
      borderColor: 'border-blue-800',
      badgeBg: 'bg-blue-900',
      badgeText: 'text-blue-200'
    },
    {
      id: 'retrieval',
      name: '3. Parallel Retrieval Agent',
      role: 'Search Grounding & Institutional Scraper',
      model: 'Gemini 2.5 Flash (Google Search Tool)',
      adkPrimitive: 'Parallel Tool Execution & Domain Filter',
      description: 'Executes parallel grounded queries across official Malaysian portals (.gov.my, bnm.gov.my, moh.gov.my), Bernama statutory wires, and accredited press agencies.',
      color: 'bg-emerald-950 text-white',
      borderColor: 'border-emerald-800',
      badgeBg: 'bg-emerald-900',
      badgeText: 'text-emerald-200'
    },
    {
      id: 'grader',
      name: '4. Source Grader Agent',
      role: 'Admiralty Reliability & Credibility Evaluator',
      model: 'Gemini 2.5 Flash',
      adkPrimitive: 'Multi-Criteria Scoring Engine',
      description: 'Evaluates each retrieved evidence snippet against the NATO/Admiralty Intelligence scale, assigning independent Source Reliability (A-F) and Information Credibility (1-6) codes.',
      color: 'bg-purple-950 text-white',
      borderColor: 'border-purple-800',
      badgeBg: 'bg-purple-900',
      badgeText: 'text-purple-200'
    },
    {
      id: 'synthesis',
      name: '5. Synthesis & Verdict Agent',
      role: 'Consensus Weighing & Verdict Determination',
      model: 'Gemini 2.5 Flash',
      adkPrimitive: 'Evaluator Optimizer & Confidence Scorer',
      description: 'Weighs graded evidence, resolves conflicting claims, calculates mathematical confidence percentage, and outputs one of five discrete verdicts with cited reasoning chain.',
      color: 'bg-indigo-950 text-white',
      borderColor: 'border-indigo-800',
      badgeBg: 'bg-indigo-900',
      badgeText: 'text-indigo-200'
    }
  ];

  const currentNodeData = nodes.find(n => n.id === activeNode) || nodes[1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-100 text-emerald-800 font-bold">
              Autonomous 5-Agent ADK Topology
            </span>
            <span className="text-xs text-slate-500">• Interactive Flow Mapper</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Multi-Agent Verification Pipeline Architecture</h3>
          <p className="text-xs text-slate-600">
            Click any agent node below to inspect its data contract, ADK primitive, and Gemini integration parameters.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-slate-700">
          <Server className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cloud Run: verify-engine</span>
        </div>
      </div>

      {/* Visual SVG Flow Diagram */}
      <div className="relative py-4 px-2 bg-slate-900 rounded-xl overflow-x-auto shadow-inner">
        <div className="min-w-[700px] flex items-center justify-between gap-3 relative z-10 p-4">
          {nodes.map((node, index) => {
            const isActive = activeNode === node.id;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setActiveNode(node.id)}
                  className={`flex-1 p-4 rounded-xl border transition-all text-left cursor-pointer relative group ${
                    isActive
                      ? 'bg-slate-800 border-emerald-500 shadow-lg ring-2 ring-emerald-500/50 scale-[1.02]'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {index + 1}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${node.badgeBg} ${node.badgeText}`}>
                      ADK
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mb-1">{node.name}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{node.role}</p>
                  
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rotate-45" />
                  )}
                </button>

                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center text-slate-500 shrink-0">
                    <ArrowRight className="w-5 h-5 animate-pulse text-emerald-500" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Database Sink Footer Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-800 px-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Real-time Event Sink: <strong className="text-slate-200">Google Cloud Firestore</strong> (/sessions, /records, /feedback)</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
            End-to-End Latency &lt; 1.8s
          </span>
        </div>
      </div>

      {/* Selected Node Detailed Breakdown Card */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                Primitive: {currentNodeData.adkPrimitive}
              </span>
              <span className="text-xs text-slate-500">• Model: {currentNodeData.model}</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">{currentNodeData.name}</h4>
            <p className="text-xs text-slate-600 font-medium">{currentNodeData.role}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active Pipeline Stage</span>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
          {currentNodeData.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Execution Framework</span>
            <span className="font-mono text-slate-800 font-medium">Google GenAI SDK + Structured JSON Schema output</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Persistence Target</span>
            <span className="font-mono text-slate-800 font-medium">Firestore Event Sinks & Audit Trail</span>
          </div>
        </div>
      </div>
    </div>
  );
};
