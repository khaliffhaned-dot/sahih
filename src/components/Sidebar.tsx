import React from 'react';
import { SAHIH_NAV_ITEMS, NavItem } from '../constants';
import { ShieldCheck, Sparkles, Terminal, Activity, Layers } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-sm text-white tracking-tight">SAHIH Verify</h1>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
              v2.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium truncate">Autonomous Multi-Agent Verifier</p>
        </div>
      </div>

      {/* Category Pill Banner */}
      <div className="mx-4 my-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
        <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
          <Sparkles className="w-3 h-3" />
          <span>Hackathon Submission</span>
        </div>
        <p className="text-[11px] text-slate-300 font-medium leading-tight">
          Category: <strong className="text-white">Collaborative Partner</strong>
        </p>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Platform Modules
        </div>
        {SAHIH_NAV_ITEMS.map((item: NavItem) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <div className="flex-1 truncate">
                <div className="flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-emerald-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Cloud Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cloud Run Engine</span>
          </span>
          <span className="text-emerald-400 font-mono font-bold">READY</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>5-Agent ADK Grid</span>
          </span>
          <span className="text-blue-400 font-mono font-bold">ACTIVE</span>
        </div>
      </div>
    </aside>
  );
};
