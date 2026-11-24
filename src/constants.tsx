import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Database,
  CheckCircle2,
  TableProperties,
  BarChart2,
  Sparkles,
  Award,
  Activity
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
  isPrimary?: boolean;
}

export const SAHIH_NAV_ITEMS: NavItem[] = [
  {
    id: 'verifier',
    label: 'SAHIH Live Verifier',
    icon: ShieldCheck,
    description: 'Autonomous multi-agent claim verification & collaborative clarifier',
    badge: 'Core Submission',
    isPrimary: true
  },
  {
    id: 'clarifier-demo',
    label: 'Collaborative Clarifier',
    icon: Sparkles,
    description: 'Human-in-the-loop ambiguity detection & clarifying dialogue',
    badge: 'Category Focus'
  },
  {
    id: 'observability',
    label: 'Agent Observability',
    icon: Activity,
    description: 'Real-time telemetry, latency breakdown & success rate charts',
    badge: 'Telemetry'
  },
  {
    id: 'admiralty',
    label: 'Admiralty Scale Matrix',
    icon: TableProperties,
    description: 'Source reliability (A-F) & credibility (1-6) grading index',
  },
  {
    id: 'architecture',
    label: '5-Agent ADK Architecture',
    icon: Cpu,
    description: 'Cloud Run microservices, ADK primitives & Firestore topology',
  },
  {
    id: 'benchmarks',
    label: 'Malaysian Benchmark Suite',
    icon: BarChart2,
    description: 'Manglish & BM viral claim test evaluation dataset',
  },
  {
    id: 'audit',
    label: 'Firestore Audit Records',
    icon: Database,
    description: 'Live verified sessions, evidence logs & analyst feedback',
  },
  {
    id: 'hackathon-audit',
    label: 'Hackathon Rubric Audit',
    icon: Award,
    description: 'All Things Agentic Hackathon compliance & scoring report',
    badge: '100% Pass'
  }
];
