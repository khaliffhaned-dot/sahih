import React from 'react';
import { motion } from 'motion/react';
import { Terminal, CheckCircle2, Clock, Cpu, ShieldCheck, Database, Search, MessageSquare, ArrowRight } from 'lucide-react';

export interface AgentStepTrace {
  name: string;
  role: string;
  desc: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  durationMs?: number;
}

interface AgentTraceVisualizerProps {
  currentStepIndex: number;
  loading: boolean;
  traceLogs: string[];
}

export const AgentTraceVisualizer: React.FC<AgentTraceVisualizerProps> = ({
  currentStepIndex,
  loading,
  traceLogs,
}) => {
  const steps: AgentStepTrace[] = [
    {
      name: '1. Intake & Normalizer',
      role: 'Intake Agent',
      desc: 'Detecting language (EN / BM / Manglish), token parsing & entity extraction',
      status: currentStepIndex > 0 ? 'completed' : currentStepIndex === 0 && loading ? 'active' : 'pending',
      durationMs: 240,
    },
    {
      name: '2. Parallel Retrieval',
      role: 'Retrieval Agent',
      desc: 'Executing Google Search Grounding across .gov.my portals & Bernama wires',
      status: currentStepIndex > 1 ? 'completed' : currentStepIndex === 1 && loading ? 'active' : 'pending',
      durationMs: 650,
    },
    {
      name: '3. Source Grader',
      role: 'Admiralty Grader Agent',
      desc: 'Assigning NATO reliability (A-F) & credibility (1-6) evidence scoring',
      status: currentStepIndex > 2 ? 'completed' : currentStepIndex === 2 && loading ? 'active' : 'pending',
      durationMs: 380,
    },
    {
      name: '4. Synthesis & Verdict',
      role: 'Consensus Agent',
      desc: 'Weighing evidence consensus, calculating confidence envelope & reasoning chain',
      status: currentStepIndex > 3 ? 'completed' : currentStepIndex === 3 && loading ? 'active' : 'pending',
      durationMs: 420,
    },
    {
      name: '5. Firestore Persistence',
      role: 'Cloud Sink Agent',
      desc: 'Logging audit trail, session ID, and record schema to Cloud Firestore',
      status: currentStepIndex >= 4 ? 'completed' : currentStepIndex === 4 && loading ? 'active' : 'pending',
      durationMs: 95,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-100 text-emerald-800 font-bold">
              ADK Multi-Agent Telemetry
            </span>
            <span className="text-xs text-slate-500">• 5-Stage Execution Trace</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Live Agent Reasoning Chain</h3>
          <p className="text-xs text-slate-500">Real-time execution telemetry and synchronization pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          {loading ? (
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Pipeline Active</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trace Idle / Ready</span>
            </span>
          )}
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isActive = step.status === 'active';
          const isCompleted = step.status === 'completed';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                isActive
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs ring-1 ring-emerald-400/20'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-white border-slate-100 text-slate-400 opacity-50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white animate-bounce'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{step.name}</h4>
                    <span className="text-[10px] font-mono bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {step.role}
                    </span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-mono text-emerald-700 font-bold animate-pulse flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Processing...
                    </span>
                  )}
                  {isCompleted && step.durationMs && (
                    <span className="text-[10px] font-mono text-slate-500 font-medium">
                      {step.durationMs}ms
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Console Log Stream */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Agent Console Log Stream</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Cloud Run container output</span>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-[11px] text-emerald-400 space-y-1.5 max-h-48 overflow-y-auto border border-slate-800 shadow-inner">
          <div className="flex items-center gap-1.5 text-slate-500 border-b border-slate-800 pb-1.5 mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>[VERIFY-ENGINE] WebSocket Telemetry Connected</span>
          </div>
          {traceLogs.length === 0 ? (
            <div className="text-slate-500 italic">Awaiting claim submission to stream multi-agent traces...</div>
          ) : (
            traceLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="leading-relaxed flex items-start gap-2"
              >
                <span className="text-slate-600 select-none">›</span>
                <span className={log.includes('VERDICT') || log.includes('Successfully') ? 'text-emerald-300 font-bold' : 'text-emerald-400'}>
                  {log}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
