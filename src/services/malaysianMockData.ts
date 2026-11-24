import { VerificationResult, GroundedNews, UserPersona, BenchmarkCase, MalaysianAuthority } from '../types';

export const CURRENT_USER: UserPersona = {
  name: 'Aiman Zulkifli',
  role: 'Lead Fact-Checking Intelligence Analyst',
  organization: 'SAHIH / Escalate AI (Kuala Lumpur)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const DEMO_PRESET_CLAIMS = [
  {
    id: 'claim-1',
    text: 'Eh boss, confirm ke gov nak bagi free RM500 e-wallet untuk semua rakyat Malaysia start bulan depan? Mcm scam je ni.',
    language: 'manglish' as const,
    category: 'Public Finance & Phishing Scams',
    tags: ['MOF', 'e-Wallet', 'WhatsApp Scam'],
    ambiguityFlag: false,
  },
  {
    id: 'claim-2',
    text: 'Bantuan kerajaan RM1,000 confirm masuk akaun bank minggu depan kan? Ramai orang share kat Telegram.',
    language: 'manglish' as const,
    category: 'Government Aid (Ambiguous Claim)',
    tags: ['STR', 'Telegram Rumor', 'Needs Clarification'],
    ambiguityFlag: true,
    suggestedClarification: 'Which specific government aid scheme do you mean? (1) Sumbangan Tunai Rahmah (STR) Phase 3, (2) Bantuan Awal Persekolahan (BAP), or (3) SARA Cashless Aid?',
    suggestedOptions: ['STR Phase 3', 'Bantuan e-Dompet Belia', 'Bantuan Musibah Banjir']
  },
  {
    id: 'claim-3',
    text: 'Kementerian Kesihatan Malaysia (KKM) mengesahkan wabak demam denggi jenis baru strain Omega melanda Lembah Klang dan mengisytiharkan darurat kesihatan.',
    language: 'ms' as const,
    category: 'Public Health & Viral Advisories',
    tags: ['KKM', 'Health Emergency', 'Lembah Klang'],
    ambiguityFlag: false,
  },
  {
    id: 'claim-4',
    text: 'PLUS Malaysia Berhad announced free toll across all highways for 7 days straight during the upcoming Deepavali holidays.',
    language: 'en' as const,
    category: 'Transport & Infrastructure',
    tags: ['PLUS', 'LLM', 'Highway Toll'],
    ambiguityFlag: false,
  },
  {
    id: 'claim-5',
    text: 'Kerajaan Malaysia batalkan penyasaran subsidi diesel dan kembalikan subsidi pukal untuk semua pengguna kenderaan mulai 1 September.',
    language: 'ms' as const,
    category: 'Energy & Fuel Subsidies',
    tags: ['KPDN', 'Budi Madani', 'Diesel Subsidy'],
    ambiguityFlag: false,
  },
  {
    id: 'claim-6',
    text: 'KWSP (EPF) allows immediate full unconditional withdrawal of Account 3 (Akaun Fleksibel) without limits or verification for all members regardless of balance.',
    language: 'en' as const,
    category: 'Retirement & Banking Policy',
    tags: ['KWSP', 'EPF Account 3', 'Akaun Fleksibel'],
    ambiguityFlag: false,
  }
];

export const BENCHMARK_CASES: BenchmarkCase[] = [
  {
    id: 'bench-1',
    title: 'Universal RM500 e-Wallet WhatsApp Phishing',
    claim: 'Eh boss, confirm ke gov nak bagi free RM500 e-wallet untuk semua rakyat Malaysia start bulan depan? Mcm scam je ni.',
    language: 'manglish',
    category: 'Public Finance',
    expectedVerdict: 'Contradicted',
    complexity: 'Simple',
    notes: 'Classic phishing campaign targeting Malaysians. MOF and MCMC have issued explicit warnings.'
  },
  {
    id: 'bench-2',
    title: 'Ambiguous Government Cash Aid Inquiry',
    claim: 'Bantuan kerajaan confirm dapat ke boss bulan ni?',
    language: 'manglish',
    category: 'Social Welfare',
    expectedVerdict: 'Partly Verified',
    complexity: 'Ambiguous (Requires Clarifier)',
    notes: 'Tests Collaborative Partner intake. Clarifier agent must prompt for specific scheme (STR vs BAP).'
  },
  {
    id: 'bench-3',
    title: 'KKM Dengue Omega Strain Emergency',
    claim: 'Kementerian Kesihatan Malaysia (KKM) mengesahkan wabak demam denggi jenis baru strain Omega melanda Lembah Klang dan mengisytiharkan darurat kesihatan.',
    language: 'ms',
    category: 'Public Health',
    expectedVerdict: 'Partly Verified',
    complexity: 'Multi-source',
    notes: 'Dengue cases increased seasonally, but no "Omega strain emergency" or lockdown was declared.'
  },
  {
    id: 'bench-4',
    title: 'PLUS Deepavali 7-Day Toll Waiver',
    claim: 'PLUS Malaysia Berhad announced free toll across all highways for 7 days straight during the upcoming Deepavali holidays.',
    language: 'en',
    category: 'Transport',
    expectedVerdict: 'Partly Verified',
    complexity: 'Multi-source',
    notes: 'Toll holiday is granted for 2 days for Class 1 private vehicles only, not 7 days.'
  },
  {
    id: 'bench-5',
    title: 'Reversal of Targeted Diesel Subsidy Policy',
    claim: 'Kerajaan batalkan penyasaran subsidi diesel dan kembalikan subsidi pukal mulai 1 September.',
    language: 'ms',
    category: 'Energy Policy',
    expectedVerdict: 'Contradicted',
    complexity: 'Simple',
    notes: 'Ministry of Finance and KPDN confirmed BUDI Madani targeted framework remains in place.'
  }
];

export const MALAYSIAN_AUTHORITIES: MalaysianAuthority[] = [
  {
    domain: 'mof.gov.my',
    name: 'Kementerian Kewangan Malaysia (MOF)',
    category: 'Government Ministry',
    defaultReliability: 'A',
    description: 'Official Ministry of Finance portal; primary authority for fiscal policies, national budget, and public aid.',
    verified: true,
  },
  {
    domain: 'moh.gov.my',
    name: 'Kementerian Kesihatan Malaysia (KKM)',
    category: 'Government Ministry',
    defaultReliability: 'A',
    description: 'Ministry of Health portal & Crisis Preparedness Response Centre (CPRC) for health alerts and disease data.',
    verified: true,
  },
  {
    domain: 'bnm.gov.my',
    name: 'Bank Negara Malaysia (BNM)',
    category: 'Financial Institution',
    defaultReliability: 'A',
    description: 'Central Bank of Malaysia; official authority for monetary policy, OPR rates, and financial fraud alert lists.',
    verified: true,
  },
  {
    domain: 'mcmc.gov.my / sebenarnya.my',
    name: 'Suruhanjaya Komunikasi dan Multimedia Malaysia (MCMC)',
    category: 'Regulator',
    defaultReliability: 'A',
    description: 'Communications & Multimedia regulator operating the Sebenarnya.my national fact-checking portal.',
    verified: true,
  },
  {
    domain: 'bernama.com',
    name: 'Pertubuhan Berita Nasional Malaysia (Bernama)',
    category: 'National Wire',
    defaultReliability: 'A',
    description: 'National statutory news agency of Malaysia; primary official wire service with direct institutional access.',
    verified: true,
  },
  {
    domain: 'kwsp.gov.my',
    name: 'Kumpulan Wang Simpanan Pekerja (KWSP / EPF)',
    category: 'National Agency',
    defaultReliability: 'A',
    description: 'Statutory retirement fund manager; authority on Akaun Fleksibel (Account 3) rules and dividend rates.',
    verified: true,
  },
  {
    domain: 'rmp.gov.my',
    name: 'Polis Diraja Malaysia (PDRM - CCID)',
    category: 'National Agency',
    defaultReliability: 'A',
    description: 'Royal Malaysia Police Commercial Crime Investigation Department; authority on cyber scams & SemakMule.',
    verified: true,
  },
  {
    domain: 'thestar.com.my / malaysiakini.com',
    name: 'Verified Mainstream News Press',
    category: 'National Wire',
    defaultReliability: 'B',
    description: 'Established national press outlets with editorial verification and journalistic standards.',
    verified: true,
  }
];

export const MOCK_RECENT_VERIFICATIONS: VerificationResult[] = [
  {
    recordId: 'REC-8849',
    sessionId: 'SESS-1092',
    claimOriginal: 'Free RM500 e-wallet handout announced by MOF for all citizens starting next month.',
    claimNormalized: 'Does the Malaysian Ministry of Finance (MOF) provide a universal RM500 e-wallet handout for all citizens starting next month?',
    language: 'en',
    status: 'complete',
    verdict: 'Contradicted',
    confidence: 94,
    reasoning: [
      'Intake & Clarifier: Detected English query regarding government financial handouts and phishing risk.',
      'Retrieval Agent: Executed parallel grounding across mof.gov.my, sebenarnya.my, and Bernama.',
      'Source Grader: Evaluated Ministry of Finance portal (Admiralty A1) explicitly debunking the viral WhatsApp message as a phishing scam.',
      'Synthesis & Verdict: Concluded viral claim is false; issued high-confidence Contradicted verdict with phishing advisory.'
    ],
    evidence: [
      {
        id: 'ev-1',
        sourceName: 'Kementerian Kewangan Malaysia (MOF Official Portal)',
        sourceUrl: 'https://www.mof.gov.my',
        snippet: 'Kementerian Kewangan menafikan sekeras-kerasnya penularan mesej berhubung bantuan e-wallet RM500 yang tular di media sosial. Orang ramai dinasihatkan agar tidak mengklik pautan palsu yang meminta butiran perbankan.',
        admiraltyCode: {
          reliability: 'A',
          credibility: 1,
          codeString: 'A1',
          justification: 'Completely reliable official ministerial source with direct firsthand authority.'
        },
        publishedDate: '2026-08-25'
      },
      {
        id: 'ev-2',
        sourceName: 'Bernama National News Agency',
        sourceUrl: 'https://www.bernama.com',
        snippet: 'SKMM dan Polis Diraja Malaysia (PDRM) sedang memburu sindiket phishing yang menyamar sebagai portal bantuan kerajaan melalui aplikasi WhatsApp dan Telegram.',
        admiraltyCode: {
          reliability: 'A',
          credibility: 2,
          codeString: 'A2',
          justification: 'Highly trusted national statutory wire service reporting official police enforcement action.'
        },
        publishedDate: '2026-08-26'
      }
    ],
    timestamp: '15 mins ago',
    feedback: {
      response: 'accept',
      submittedAt: '12 mins ago'
    }
  },
  {
    recordId: 'REC-8850',
    sessionId: 'SESS-1093',
    claimOriginal: 'PLUS highway free toll for Deepavali confirmed 7 days?',
    claimNormalized: 'Has PLUS Malaysia Berhad declared a 7-day toll exemption across all major highways for Deepavali?',
    language: 'en',
    status: 'complete',
    verdict: 'Partly Verified',
    confidence: 88,
    reasoning: [
      'Intake & Clarifier: Normalized holiday toll exemption claim proposition.',
      'Retrieval Agent: Fetched PLUS and LLM (Lembaga Lebuhraya Malaysia) official press circulars.',
      'Source Grader: Graded statutory LLM announcement as A1; verified toll exemptions apply only for 2 days for Class 1 private vehicles, not 7 days.',
      'Synthesis & Verdict: Core premise of free toll is true, but duration is 2 days rather than 7 days.'
    ],
    evidence: [
      {
        id: 'ev-3',
        sourceName: 'Lembaga Lebuhraya Malaysia (LLM)',
        sourceUrl: 'https://www.llm.gov.my',
        snippet: 'Pemberian tol percuma selama dua (2) hari diberikan kepada kenderaan persendirian (Kelas 1) sempena perayaan Deepavali berkuat kuasa pada tarikh tertentu.',
        admiraltyCode: {
          reliability: 'A',
          credibility: 1,
          codeString: 'A1',
          justification: 'Statutory highway authority with direct policy jurisdiction.'
        },
        publishedDate: '2026-08-20'
      }
    ],
    timestamp: '2 hours ago',
    feedback: {
      response: 'accept',
      submittedAt: '1 hour ago'
    }
  },
  {
    recordId: 'REC-8851',
    sessionId: 'SESS-1094',
    claimOriginal: 'Bantuan kerajaan confirm dapat ke boss bulan ni?',
    claimNormalized: 'Clarified with analyst: Sumbangan Tunai Rahmah (STR) Phase 3 disbursement date and eligibility criteria for August 2026.',
    language: 'manglish',
    status: 'complete',
    verdict: 'Verified',
    confidence: 93,
    reasoning: [
      'Intake & Clarifier: Detected ambiguous Manglish claim; paused session to clarify scheme with user (Collaborative Partner Flow).',
      'User Clarified: Confirmed focus is STR Phase 3.',
      'Retrieval Agent: Queried LHDNM and MOF STR Portal directly.',
      'Source Grader: Graded MOF announcement A1; confirmed disbursements scheduled from 29 August.',
      'Synthesis & Verdict: Verified verified proposition with high confidence.'
    ],
    evidence: [
      {
        id: 'ev-4',
        sourceName: 'Portal Rasmi Sumbangan Tunai Rahmah (LHDNM / MOF)',
        sourceUrl: 'https://bantuantunai.hasil.gov.my',
        snippet: 'Pembayaran STR Fasa 3 akan disalurkan secara berperingkat ke akaun bank penerima mulai 29 Ogos.',
        admiraltyCode: {
          reliability: 'A',
          credibility: 1,
          codeString: 'A1',
          justification: 'Primary official tax authority portal managing STR disbursements.'
        },
        publishedDate: '2026-08-22'
      }
    ],
    timestamp: '4 hours ago'
  }
];

export const MOCK_GROUNDED_NEWS: GroundedNews[] = [
  {
    id: 'news-1',
    title: 'MOF Warns Public Against Fake RM500 e-Wallet Phishing Links on WhatsApp',
    source: 'Malay Mail / Bernama',
    url: 'https://www.malaymail.com',
    snippet: 'The Ministry of Finance has issued an urgent advisory regarding fraudulent messages circulating on messaging platforms...',
    timestamp: '1 hour ago',
    verdict: 'Contradicted'
  },
  {
    id: 'news-2',
    title: 'BNM Maintains OPR at 3.00% Amid Stable Domestic Growth Outlook',
    source: 'Bank Negara Malaysia',
    url: 'https://www.bnm.gov.my',
    snippet: 'The Monetary Policy Committee (MPC) of Bank Negara Malaysia decided today to maintain the Overnight Policy Rate (OPR) at 3.00 percent...',
    timestamp: '5 hours ago',
    verdict: 'Verified'
  },
  {
    id: 'news-3',
    title: 'MRT Putrajaya Line Phase 2 Operations Running Normally Following Maintenance',
    source: 'Rapid KL',
    url: 'https://myrapid.com.my',
    snippet: 'Rapid Rail clarifies that service interruptions reported earlier this morning have been fully resolved.',
    timestamp: '1 day ago',
    verdict: 'Verified'
  }
];
