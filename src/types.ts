export type Language = 'en' | 'ms' | 'manglish';

export type VerdictType = 'Verified' | 'Partly Verified' | 'Unverified' | 'Contradicted' | 'Insufficient Evidence';

export interface AdmiraltyCode {
  reliability: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  credibility: 1 | 2 | 3 | 4 | 5 | 6;
  codeString: string; // e.g. "A1", "B2", "C3"
  justification: string;
}

export interface EvidenceItem {
  id: string;
  sourceName: string;
  sourceUrl?: string;
  snippet: string;
  admiraltyCode: AdmiraltyCode;
  publishedDate?: string;
}

export interface VerificationTraceStep {
  agent: 'Orchestrator' | 'Intake & Clarifier' | 'Retrieval' | 'Source Grader' | 'Synthesis & Verdict' | 'Firestore Sink';
  status: 'completed' | 'in_progress' | 'pending' | 'clarification_needed';
  timestamp: string;
  message: string;
  details?: string;
}

export interface VerificationResult {
  recordId: string;
  sessionId: string;
  claimOriginal: string;
  claimNormalized: string;
  language: Language;
  status: 'complete' | 'awaiting_clarification' | 'in_progress';
  clarificationQuestion?: string;
  clarificationOptions?: string[];
  verdict: VerdictType;
  confidence: number; // 0 - 100
  reasoning: string[];
  evidence: EvidenceItem[];
  timestamp: string;
  feedback?: {
    response: 'accept' | 'dispute';
    note?: string;
    submittedAt?: string;
  };
}

export interface GroundedNews {
  id: string;
  title: string;
  source: string;
  url: string;
  snippet: string;
  timestamp: string;
  verdict?: VerdictType;
}

export interface UserPersona {
  name: string;
  role: string;
  organization: string;
  avatar: string;
}

export interface BenchmarkCase {
  id: string;
  title: string;
  claim: string;
  language: Language;
  category: string;
  expectedVerdict: VerdictType;
  complexity: 'Simple' | 'Ambiguous (Requires Clarifier)' | 'Multi-source';
  notes: string;
}

export interface MalaysianAuthority {
  domain: string;
  name: string;
  category: 'Government Ministry' | 'National Agency' | 'Financial Institution' | 'Regulator' | 'National Wire';
  defaultReliability: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  description: string;
  verified: boolean;
}
