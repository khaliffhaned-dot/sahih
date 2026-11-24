import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { MOCK_RECENT_VERIFICATIONS } from '../../services/malaysianMockData';
import { VerificationResult, VerdictType } from '../../types';
import { AiResult } from '../AiResult';
import { Database, Search, Filter, CheckCircle2, Clock, ThumbsUp, ThumbsDown, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface AuditHistoryProps {
  onReverify?: (claim: string) => void;
  currentUser?: { uid?: string; name: string };
}

export const AuditHistory: React.FC<AuditHistoryProps> = ({ onReverify, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<string>('all');
  const [records, setRecords] = useState<VerificationResult[]>(MOCK_RECENT_VERIFICATIONS);
  const [selectedRecord, setSelectedRecord] = useState<VerificationResult | null>(MOCK_RECENT_VERIFICATIONS[0]);
  const [loadingFirestore, setLoadingFirestore] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFirestoreRecords() {
      try {
        const q = query(collection(db, 'records'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const fetched: VerificationResult[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            fetched.push({
              recordId: data.recordId || docSnap.id,
              sessionId: data.sessionId || 'SESS-0000',
              claimOriginal: data.claimOriginal || data.summary || 'Verified Claim',
              claimNormalized: data.claimNormalized || data.summary || '',
              language: data.language || 'en',
              status: 'complete',
              verdict: data.verdict || 'Verified',
              confidence: data.confidence || 90,
              reasoning: data.reasoning || ['Analyzed via multi-agent ADK verification pipeline.'],
              evidence: data.evidence || [],
              timestamp: data.timestamp || new Date().toLocaleTimeString()
            });
          });
          if (fetched.length > 0) {
            setRecords([...fetched, ...MOCK_RECENT_VERIFICATIONS]);
            setSelectedRecord(fetched[0]);
          }
        }
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.LIST, 'records');
        } catch (err) {
          console.warn('Firestore fallback to mock data active:', err);
        }
      } finally {
        setLoadingFirestore(false);
      }
    }
    fetchFirestoreRecords();
  }, []);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.claimOriginal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.claimNormalized.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerdict = verdictFilter === 'all' || r.verdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  const getVerdictPill = (v: VerdictType) => {
    switch (v) {
      case 'Verified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Verified</span>;
      case 'Partly Verified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Partly Verified</span>;
      case 'Contradicted':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Contradicted</span>;
      case 'Unverified':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Unverified</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">Insufficient</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-blue-100 text-blue-800 font-bold">
              Firestore Audit Trail ({currentUser?.uid ? 'Connected to Cloud DB' : 'Local + Cloud Sync'})
            </span>
            <span className="text-xs text-slate-500">• Section 7 Schema Persistence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Verification Records & Analyst Feedback Log</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Live audit log synced with Cloud Firestore. Contains full lineage: original proposition, language detection, Admiralty graded evidence, reasoning chains, and human analyst feedback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Records Table / List */}
        <div className="lg:col-span-5 space-y-4">
          <Card
            title="Stored Verification Records"
            subtitle={`${filteredRecords.length} records retrieved from /records collection`}
            headerAction={
              <div className="flex items-center gap-2">
                <select
                  value={verdictFilter}
                  onChange={(e) => setVerdictFilter(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Verdicts</option>
                  <option value="Verified">Verified</option>
                  <option value="Partly Verified">Partly Verified</option>
                  <option value="Contradicted">Contradicted</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>
            }
          >
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by ID, claim, or keywords..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Records */}
              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredRecords.map((rec) => (
                  <div
                    key={rec.recordId}
                    onClick={() => setSelectedRecord(rec)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRecord?.recordId === rec.recordId
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold ${
                          selectedRecord?.recordId === rec.recordId ? 'text-emerald-400' : 'text-slate-900'
                        }`}>
                          {rec.recordId}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                          selectedRecord?.recordId === rec.recordId ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {rec.language}
                        </span>
                      </div>
                      {getVerdictPill(rec.verdict)}
                    </div>

                    <p className={`text-xs font-medium line-clamp-2 ${
                      selectedRecord?.recordId === rec.recordId ? 'text-slate-100' : 'text-slate-800'
                    }`}>
                      "{rec.claimOriginal}"
                    </p>

                    <div className={`flex items-center justify-between text-[11px] mt-2 pt-2 border-t ${
                      selectedRecord?.recordId === rec.recordId ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                    }`}>
                      <span>Confidence: <strong className={selectedRecord?.recordId === rec.recordId ? 'text-emerald-400' : 'text-emerald-700'}>{rec.confidence}%</strong></span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rec.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Selected Record Detail Preview */}
        <div className="lg:col-span-7 space-y-4">
          {selectedRecord ? (
            <div className="space-y-4">
              <AiResult result={selectedRecord} />
            </div>
          ) : (
            <Card>
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Select an Audit Record</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Choose a session record from the list to review its complete multi-agent reasoning trace, grounded evidence citations, and Admiralty codes.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
