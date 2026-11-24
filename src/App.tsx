import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { FactCheckCenter } from './components/pages/FactCheckCenter';
import { ClarifierDemo } from './components/pages/ClarifierDemo';
import { AgentObservability } from './components/pages/AgentObservability';
import { AdmiraltyMatrix } from './components/pages/AdmiraltyMatrix';
import { AgentArchitecture } from './components/pages/AgentArchitecture';
import { Benchmarks } from './components/pages/Benchmarks';
import { AuditHistory } from './components/pages/AuditHistory';
import { HackathonAudit } from './components/pages/HackathonAudit';
import { ShieldCheck, Bell, Globe, Sparkles, Database, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { CURRENT_USER } from './services/malaysianMockData';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Toaster } from 'sonner';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('verifier');
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        console.log('Google Sign-In popup closed by user.');
      } else {
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  const renderContent = () => {
    const userContext = firebaseUser ? {
      name: firebaseUser.displayName || 'Authenticated Analyst',
      role: 'Verified Google User',
      avatar: firebaseUser.photoURL || CURRENT_USER.avatar,
      uid: firebaseUser.uid
    } : CURRENT_USER;

    switch (currentView) {
      case 'verifier':
        return <FactCheckCenter onNavigateTab={setCurrentView} currentUser={userContext} />;
      case 'clarifier-demo':
        return <ClarifierDemo currentUser={userContext} />;
      case 'observability':
        return <AgentObservability />;
      case 'admiralty':
        return <AdmiraltyMatrix />;
      case 'architecture':
        return <AgentArchitecture />;
      case 'benchmarks':
        return <Benchmarks />;
      case 'audit':
        return <AuditHistory currentUser={userContext} />;
      case 'hackathon-audit':
        return <HackathonAudit />;
      default:
        return <FactCheckCenter onNavigateTab={setCurrentView} currentUser={userContext} />;
    }
  };

  const getModuleTitle = () => {
    switch (currentView) {
      case 'verifier':
        return 'SAHIH Live Multi-Agent Verifier';
      case 'clarifier-demo':
        return 'Collaborative Partner Clarifier Dialogue';
      case 'observability':
        return 'Agent Observability & Telemetry Dashboard';
      case 'admiralty':
        return 'NATO / Admiralty Code System & Source Trust Index';
      case 'architecture':
        return '5-Agent ADK Architecture & Cloud Run Grid';
      case 'benchmarks':
        return 'Malaysian Ground Truth Benchmarks';
      case 'audit':
        return 'Cloud Firestore Audit Records';
      case 'hackathon-audit':
        return 'All Things Agentic Hackathon Rubric & Rules Audit';
      default:
        return 'SAHIH Verify Engine';
    }
  };

  const displayUser = firebaseUser ? {
    name: firebaseUser.displayName || 'Verified User',
    role: firebaseUser.email || 'Google Workspace Account',
    avatar: firebaseUser.photoURL || CURRENT_USER.avatar
  } : CURRENT_USER;

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      <Toaster position="top-right" richColors />
      {/* Sidebar Navigation - Strictly Focused on Hackathon Submission */}
      <Sidebar currentView={currentView} onSelectView={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Module:
            </span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
              {getModuleTitle()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>All Things Agentic Hackathon</span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Region: Malaysia (Kuala Lumpur)</span>
            </div>

            {/* Firebase Auth Controls */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              {firebaseUser ? (
                <div className="flex items-center gap-2">
                  <img
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  />
                  <div className="hidden lg:block text-left">
                    <span className="block text-xs font-semibold text-slate-800 leading-tight">{displayUser.name}</span>
                    <span className="block text-[10px] text-emerald-600 font-medium leading-tight">Firebase Auth Active</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="ml-2 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content View */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-100">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
