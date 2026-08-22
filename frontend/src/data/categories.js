// src/data/categories.js

export const CATEGORIES = [
  {
    id: "women",
    title: "Women/Children Related Crime",
    desc: "Report concerns related to women safety, harassment, abuse, stalking, or crimes against children.",
    badge: "High Priority",
    gradient: "linear-gradient(135deg, #701a75 0%, #be185d 100%)",
    icon: "shield-alert",
    department: "Special Cyber Unit for Women & Child Safety",
    subtypes: [
      "Cyber Stalking / Online Following",
      "Morphing & Non-Consensual Image Sharing",
      "Sextortion / Blackmail",
      "Defamation & Character Assassination",
      "Obscene Calls & Lewd Messages",
      "Cyber Flashing / Vulgar Content",
      "Other Women Safety Concern"
    ],
    fields: [
      { key: "offenseSubtype", label: "Nature of Offense", type: "select", required: true, optionsKey: "subtypes" },
      { key: "suspectRelation", label: "Suspect Relationship", type: "select", required: true, options: ["Stranger / Unknown", "Acquaintance", "Ex-partner", "Colleague / Classmate", "Family Member", "Multiple Suspects"] },
      { key: "platformUsed", label: "Platform / Medium Involved", type: "select", required: true, options: ["WhatsApp", "Instagram", "Telegram", "Facebook", "Snapchat", "Phone Call / SMS", "Email", "Dating App", "Other"] },
      { key: "suspectHandle", label: "Suspect Profile URL / Username / Phone Number", type: "text", placeholder: "e.g. @user_handle or +91 9876543210", required: true },
      { key: "immediateThreat", label: "Is there any immediate physical or blackmail threat?", type: "radio", options: ["Yes - Urgent Intervention Required", "No - Legal Action & Content Takedown Required"] }
    ]
  },
  {
    id: "financial",
    title: "Financial Fraud",
    desc: "Report online fraud, banking fraud, UPI scams, identity theft and unauthorized transactions.",
    badge: "1930 Integrated",
    gradient: "linear-gradient(135deg, #064e3b 0%, #0d9488 100%)",
    icon: "credit-card",
    department: "Cyber Financial Crime & Rapid Recovery Cell",
    subtypes: [
      "UPI / QR Code Scam",
      "Phishing / Credit & Debit Card Fraud",
      "Work-from-Home / Task Scam",
      "Investment / Stock Trading Fraud",
      "Instant Loan App Extortion",
      "KYC Update / Bank Impersonation Scam",
      "SIM Swap / OTP Interception Fraud",
      "Cryptocurrency Scam",
      "Lottery / Prize Fraud"
    ],
    fields: [
      { key: "fraudType", label: "Fraud Sub-Type", type: "select", required: true, optionsKey: "subtypes" },
      { key: "bankName", label: "Your Bank / Payment Wallet", type: "text", placeholder: "e.g. State Bank of India, HDFC, Paytm, PhonePe", required: true },
      { key: "amountLost", label: "Total Amount Lost (in INR ₹)", type: "number", placeholder: "e.g. 45000", required: true },
      { key: "transactionId", label: "Transaction ID / UTR / Reference No.", type: "text", placeholder: "e.g. 239482938492 or UTR123456", required: true },
      { key: "transactionDate", label: "Date & Time of Transaction", type: "datetime-local", required: true },
      { key: "fraudsterAccount", label: "Suspect UPI ID / Account / Mobile / Link", type: "text", placeholder: "e.g. scammer@ybl or account no. / suspicious link", required: true },
      { key: "bankInformed", label: "Have you alerted your bank to freeze transactions?", type: "radio", options: ["Yes - Ticket / Ref Number Assigned", "Not Yet - Need Immediate Assistance"] }
    ]
  },
  {
    id: "social",
    title: "Social Media Crime",
    desc: "Hateful content, fake profiles, account hacking, impersonation and online harassment.",
    badge: "Takedown Protocol",
    gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 100%)",
    icon: "share-2",
    department: "Social Media Intelligence & Cyber Forensic Wing",
    subtypes: [
      "Account Hijacking / Hacking",
      "Fake Account / Impersonation",
      "Deepfake / AI-Generated Defamatory Content",
      "Hate Speech & Provocative Content",
      "Copyright / Intellectual Property Infringement",
      "Organized Trolling & Doxxing",
      "Online Extortion via Social Platform"
    ],
    fields: [
      { key: "socialPlatform", label: "Social Media Platform", type: "select", required: true, options: ["Instagram", "Facebook", "X (Twitter)", "YouTube", "LinkedIn", "Telegram", "Reddit", "Discord", "Snapchat", "Other"] },
      { key: "offenseType", label: "Type of Crime", type: "select", required: true, optionsKey: "subtypes" },
      { key: "profileUrl", label: "URL of Offending Profile / Post / Video", type: "text", placeholder: "https://instagram.com/suspect_page or post link", required: true },
      { key: "victimHandle", label: "Victim's Handle / Account Link", type: "text", placeholder: "Your profile link or affected handle" },
      { key: "reportedToPlatform", label: "Have you reported this link to the platform?", type: "radio", options: ["Yes - Report Submitted", "No - Need Formal RouteIQ Notice"] }
    ]
  },
  {
    id: "landmark",
    title: "Landmark Related Crime",
    desc: "Unauthorized use, damage, cyber vandalism or illegal digital activities at landmarks.",
    badge: "Heritage & Infra",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
    icon: "landmark",
    department: "Critical Infrastructure & Public Asset Protection Unit",
    subtypes: [
      "Portal Defacement / Cyber Attack on Landmark Website",
      "Unauthorized Drone Surveillance / Mapping",
      "Fake Ticketing / Monument Booking Scam",
      "Digital Vandalism / AR Geo-tagging Defacement",
      "Trespass / Security Breach Streamed Online",
      "Illegal Filming / Commercial Exploitation"
    ],
    fields: [
      { key: "landmarkName", label: "Landmark / Monument / Asset Name", type: "text", placeholder: "e.g. Red Fort, Gateway of India, State Secretariat Portal", required: true },
      { key: "landmarkLocation", label: "Landmark Location (City / State)", type: "text", placeholder: "e.g. New Delhi, Delhi", required: true },
      { key: "incidentType", label: "Nature of Cyber / Security Incident", type: "select", required: true, optionsKey: "subtypes" },
      { key: "evidenceUrl", label: "Public Broadcast / Video / Phishing Website Link", type: "text", placeholder: "https://... or social media post" }
    ]
  },
  {
    id: "harassment",
    title: "Harassment",
    desc: "Bullying, intimidation, obscene calls/messages, continuous threats and extortion.",
    badge: "Rapid Response",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    icon: "alert-triangle",
    department: "Anti-Cyber Harassment & Digital Threat Cell",
    subtypes: [
      "Continuous Abusive / Threatening Phone Calls",
      "Extortion Demands & Blackmail",
      "Spam Bombing / Harassing Messages",
      "Doxxing (Personal Number / Address Leaked)",
      "Defamatory Emails / Group Messages",
      "Workplace Online Harassment"
    ],
    fields: [
      { key: "harassmentType", label: "Harassment Method", type: "select", required: true, optionsKey: "subtypes" },
      { key: "medium", label: "Primary Communication Medium", type: "select", required: true, options: ["Phone Calls / SMS", "WhatsApp / Telegram", "Email", "Social Media DMs", "Multiple Channels"] },
      { key: "suspectContact", label: "Suspect Phone Numbers / Email IDs", type: "text", placeholder: "Enter numbers / email addresses (comma separated)", required: true },
      { key: "frequency", label: "Frequency of Harassment", type: "select", required: true, options: ["Continuous / Daily", "Multiple times a week", "Occasional / Specific events", "Escalating threats"] }
    ]
  },
  {
    id: "bullying",
    title: "Cyber Bullying",
    desc: "Online bullying, rumors, hate raids, non-consensual memes, or psychological harassment.",
    badge: "Psychological Support",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)",
    icon: "message-square",
    department: "Youth & Community Cyber Safety Wing",
    subtypes: [
      "Targeted Hate Raids & Mass Trolling",
      "Meme Defamation / Humiliating Content",
      "Secret Group Smear Campaigns",
      "Exclusion & Online Mobbing",
      "Doxxing Private Conversations",
      "Impersonating to Harm Reputation"
    ],
    fields: [
      { key: "bullyingType", label: "Bullying Category", type: "select", required: true, optionsKey: "subtypes" },
      { key: "targetVictim", label: "Who is being targeted?", type: "select", required: true, options: ["Myself", "My Child / Minor", "Student / Classmate", "Colleague", "Other"] },
      { key: "groupCommunity", label: "Platform / Group / Server Name", type: "text", placeholder: "e.g. Discord Server Name, WhatsApp Class Group, IG Page", required: true },
      { key: "suspectHandles", label: "Culprit Usernames / Phone Numbers", type: "text", placeholder: "@handle1, @handle2, +91...", required: true },
      { key: "counselingRequired", label: "Would you like confidential counseling support?", type: "radio", options: ["Yes - Connect with Counselor", "No - Just Legal / Takedown Action"] }
    ]
  },
  {
    id: "child",
    title: "Child Crime",
    desc: "Child abuse, exploitation, child pornography, online grooming, or missing children leads.",
    badge: "Critical / POCSO",
    gradient: "linear-gradient(135deg, #831843 0%, #e11d48 100%)",
    icon: "heart-handshake",
    department: "Special Child Cyber Protection & POCSO Investigation Taskforce",
    subtypes: [
      "CSAM / Child Exploitative Material Online",
      "Online Child Grooming / Solicitation",
      "Minor Sextortion & Blackmail",
      "Cyberbullying of a Minor",
      "Missing Child Digital Clues / Footprint",
      "Illegal Adoption / Child Trafficking Lead"
    ],
    fields: [
      { key: "offenseClassification", label: "Crime Classification", type: "select", required: true, optionsKey: "subtypes" },
      { key: "victimAgeGroup", label: "Victim Age Group", type: "select", required: true, options: ["Under 10 years", "10 to 14 years", "15 to 18 years", "Age Unknown"] },
      { key: "suspectDetails", label: "Suspect Identifiers (Username, Phone, Gaming Tag)", type: "text", placeholder: "e.g. Roblox/Discord tag, WhatsApp contact, etc.", required: true },
      { key: "evidenceLocation", label: "Where is the illegal material hosted / shared?", type: "text", placeholder: "Cloud link, website URL, chat group link, or uploaded below", required: true }
    ]
  },
  {
    id: "other",
    title: "Other Cyber Crime",
    desc: "Ransomware, malware attacks, IoT hacks, SIM swaps, or any cyber offense not listed above.",
    badge: "Forensics Cell",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    icon: "cpu",
    department: "Advanced Threat Response & Digital Forensics Unit",
    subtypes: [
      "Ransomware & System Lockout Attack",
      "Malware / Trojan Infection",
      "Corporate Data Breach / Database Leak",
      "IoT / Smart Security Camera Hacking",
      "Website Defacement / DDoS Attack",
      "Identity Theft / Forged Digital Documents",
      "SIM Swap / Unauthorized Telephony",
      "Other Uncategorized Cyber Offense"
    ],
    fields: [
      { key: "crimeType", label: "Crime Classification", type: "select", required: true, optionsKey: "subtypes" },
      { key: "affectedSystems", label: "Affected Device / Network / System", type: "text", placeholder: "e.g. Windows PC, Android phone, Cloud Server, Router", required: true },
      { key: "suspiciousIpDomain", label: "Suspicious IP Address / Domain / Hash (if known)", type: "text", placeholder: "e.g. 192.0.2.1, malicious-domain.xyz, or Ransom Note details" },
      { key: "estimatedDamage", label: "Estimated Impact / Data Loss", type: "select", required: true, options: ["Personal Data Compromised", "Financial Loss", "Business Disruption", "Critical System Lockout", "Under Assessment"] }
    ]
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "RQ-2026-89412",
    ackNumber: "ACK-MH-94812",
    category: "financial",
    categoryTitle: "Financial Fraud",
    title: "Unauthorized UPI debits via Fake Electricity Bill APK",
    description: "Received an urgent SMS about power disconnection with a link to download an APK. Upon opening, ₹48,500 was debited in three transactions without OTP consent.",
    name: "Vikram Deshmukh",
    contact: "+91 98201 45872",
    email: "vikram.deshmukh@example.com",
    state: "Maharashtra",
    city: "Mumbai",
    policeStation: "Bandra Cyber Police Station",
    status: "Under Investigation",
    priority: "High",
    department: "Cyber Financial Crime & Rapid Recovery Cell",
    assignedOfficer: "Inspector Rajesh Sharma (Badge #4092)",
    createdAt: "2026-08-16T14:30:00.000Z",
    specificData: {
      fraudType: "UPI / QR Code Scam",
      bankName: "HDFC Bank Ltd",
      amountLost: "48500",
      transactionId: "HDFC-UPI-9823481239",
      transactionDate: "2026-08-16T13:45",
      fraudsterAccount: "electbill.pay@axisbank",
      bankInformed: "Yes - Ticket / Ref Number Assigned"
    },
    updates: [
      { timestamp: "2026-08-16T14:30:00.000Z", title: "Complaint Registered", detail: "Complaint logged and assigned tracking ID RQ-2026-89412." },
      { timestamp: "2026-08-16T15:10:00.000Z", title: "1930 Portal Auto-Sync", detail: "Transaction hash synchronized with National Cyber Crime Reporting Portal." },
      { timestamp: "2026-08-17T10:00:00.000Z", title: "Bank Lien Request Dispatched", detail: "Notice sent to Axis Bank nodals to freeze beneficiary account electbill.pay@axisbank." },
      { timestamp: "2026-08-18T11:20:00.000Z", title: "Officer Assigned", detail: "Assigned to Inspector Rajesh Sharma, Bandra Cyber Cell for tracing IP origin." }
    ]
  },
  {
    id: "RQ-2026-77301",
    ackNumber: "ACK-DL-29401",
    category: "social",
    categoryTitle: "Social Media Crime",
    title: "Fake Instagram Impersonation Account Defaming Business",
    description: "A fraudulent account using my brand logo and name is messaging customers asking for crypto deposits. Several followers have been targeted.",
    name: "Aakash Verma",
    contact: "+91 98111 23456",
    email: "aakash.v@example.com",
    state: "Delhi",
    city: "New Delhi",
    policeStation: "Cyber Police Station, Connaught Place",
    status: "Resolved",
    priority: "Medium",
    department: "Social Media Intelligence & Cyber Forensic Wing",
    assignedOfficer: "Sub-Inspector Priya Mehta (Badge #7112)",
    createdAt: "2026-08-14T09:15:00.000Z",
    specificData: {
      socialPlatform: "Instagram",
      offenseType: "Fake Account / Impersonation",
      profileUrl: "https://instagram.com/aakash_official_support_fake",
      victimHandle: "@aakash_official",
      reportedToPlatform: "Yes - Report Submitted"
    },
    updates: [
      { timestamp: "2026-08-14T09:15:00.000Z", title: "Complaint Registered", detail: "Case registered under Section 66D IT Act." },
      { timestamp: "2026-08-14T11:45:00.000Z", title: "Takedown Notice Issued", detail: "Legal notice under Section 79(3)(b) served to Meta Law Enforcement Portal." },
      { timestamp: "2026-08-15T16:30:00.000Z", title: "Account Deactivated", detail: "Meta confirmed termination of the infringing profile." },
      { timestamp: "2026-08-16T09:00:00.000Z", title: "Case Closed / Resolved", detail: "Infringing content removed and complainant notified." }
    ]
  }
];

export const STATES_AND_UT = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCT)",
  "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry"
];
