import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Activity, Clock, CheckCircle2, AlertCircle, Zap, Server, Shield, Cpu, ArrowUpRight } from 'lucide-react';

const latencyData = [
  { step: '1. Intake & Normalizer', latencyMs: 240, targetMs: 300, tokens: 410 },
  { step: '2. Parallel Retrieval', latencyMs: 650, targetMs: 800, tokens: 1250 },
  { step: '3. Source Grader', latencyMs: 380, targetMs: 500, tokens: 680 },
  { step: '4. Synthesis & Verdict', latencyMs: 420, targetMs: 600, tokens: 890 },
  { step: '5. Firestore Sink', latencyMs: 95, targetMs: 150, tokens: 120 },
];

const successRateData = [
  { agent: 'Intake / Manglish', successRate: 98.4, failures: 1.6 },
  { agent: 'Google Search Grounding', successRate: 96.8, failures: 3.2 },
  { agent: 'Admiralty Grader', successRate: 99.1, failures: 0.9 },
  { agent: 'Consensus Synthesis', successRate: 97.5, failures: 2.5 },
  { agent: 'Overall Pipeline', successRate: 98.0, failures: 2.0 },
];

const sourceDistribution = [
  { name: 'Official Portals (.gov.my)', value: 45, color: '#059669' },
  { name: 'Bank Negara / KKM Wires', value: 25, color: '#2563EB' },
  { name: 'Bernama / National News', value: 20, color: '#7C3AED' },
  { name: 'Accredited Press & FactCheck', value: 10, color: '#D97706' },
];

const historicalThroughput = [
  { time: '08:00', requests: 12, avgLatencyMs: 1780 },
  { time: '09:00', requests: 28, avgLatencyMs: 1840 },
  { time: '10:00', requests: 45, avgLatencyMs: 1720 },
  { time: '11:00', requests: 64, avgLatencyMs: 1690 },
  { time: '12:00', requests: 82, avgLatencyMs: 1750 },
  { time: '13:00', requests: 55, avgLatencyMs: 1710 },
];

export const AgentObservability: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('24h');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-blue-100 text-blue-800 font-bold">
              Telemetry & Performance
            </span>
            <span className="text-xs text-slate-500">• Cloud Run Region: asia-southeast1</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Agent Observability & Telemetry Dashboard</h2>
          <p className="text-xs text-slate-600">
            Real-time latency profiling, success rate tracking, and multi-agent execution telemetry powered by Recharts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(['1h', '24h', '7d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Stream</span>
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Pipeline Latency</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1.78s</span>
            <span className="text-xs text-emerald-600 font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3 rotate-180" /> -12ms vs yesterday
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Target SLA: &lt; 2.50s</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Agent Success Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">98.0%</span>
            <span className="text-xs text-emerald-600 font-medium">+0.4% reliability</span>
          </div>
          <p className="text-[11px] text-slate-500">Over 2,450 verified claims</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Cloud Run Nodes</span>
            <Server className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">4 / 4</span>
            <span className="text-xs text-blue-600 font-medium">Scale-to-zero ready</span>
          </div>
          <p className="text-[11px] text-slate-500">Region: asia-southeast1</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Gemini Token Efficiency</span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">3,450</span>
            <span className="text-xs text-purple-600 font-medium">Avg tokens/run</span>
          </div>
          <p className="text-[11px] text-slate-500">Model: Gemini 2.5 / 3.5 Flash</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency by Pipeline Stage */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Agent Response Latency (ms)</h3>
              <p className="text-xs text-slate-500">Breakdown of execution time across the 5 ADK pipeline stages</p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              Real-time Profile
            </span>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="step" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="latencyMs" name="Actual Latency (ms)" fill="#059669" radius={[6, 6, 0, 0]} />
                <Bar dataKey="targetMs" name="Target SLA (ms)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Success Rates */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Agent Success & Reliability (%)</h3>
              <p className="text-xs text-slate-500">Successful inference and parsing rate per agent component</p>
            </div>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-semibold">
              99.1% Max
            </span>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successRateData} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[90, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="agent" tick={{ fontSize: 11 }} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="successRate" name="Success Rate (%)" fill="#2563EB" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical Throughput */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Claim Verification Volume & Latency Trend</h3>
              <p className="text-xs text-slate-500">Hourly request volume vs. average end-to-end latency</p>
            </div>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalThroughput} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" domain={[1500, 2000]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="requests" name="Verification Requests" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="avgLatencyMs" name="Avg Latency (ms)" stroke="#7C3AED" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Distribution Pie */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Grounding Source Share</h3>
            <p className="text-xs text-slate-500">Distribution of official Malaysian evidence sources</p>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {sourceDistribution.map((src, i) => (
              <div key={i} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }}></span>
                  <span className="truncate">{src.name}</span>
                </span>
                <span className="font-semibold font-mono">{src.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
