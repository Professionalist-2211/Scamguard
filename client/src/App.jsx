
import { useEffect, useState } from "react";
import {
  ShieldCheck, Search, AlertTriangle, CheckCircle, Languages,
  Trash2, Link as LinkIcon, Lock, Briefcase, ShoppingBag, Zap,
  CreditCard, Gift, History, Copy, MessageSquare, ExternalLink,
  RefreshCw
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

const translations = {
  en: {
    brand: "ScamGuard",
    tagline: "Your digital safety companion",
    title: "Stay safe in the digital world.",
    subtitle: "Check suspicious messages and links before you trust them.",
    analyzer: "Message Analyzer",
    category: "Select category",
    message: "Paste your suspicious message here...",
    analyze: "Analyze Message",
    analyzing: "Analyzing...",
    clear: "Clear",
    result: "Analysis Result",
    safe: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    urlTitle: "Website Link Checker",
    urlPlaceholder: "Paste a website URL...",
    checkUrl: "Check Link",
    history: "Recent Activity",
    clearHistory: "Clear History",
    empty: "No analysis history yet.",
    tips: "Safety Tips",
    tip1: "Never share your OTP or passwords.",
    tip2: "Verify the sender before clicking links.",
    tip3: "Avoid urgent payment requests.",
    disclaimer: "ScamGuard provides preliminary checks, not guaranteed scam detection.",
    summary: "Summary",
    flags: "Warning Signs",
    actions: "Recommended Actions",
    urlWarning: "Suspicious URL patterns were detected.",
    urlSafe: "No common suspicious URL patterns detected.",
    urlInvalid: "Please enter a valid website URL.",
    selectCategory: "Choose a category",
    copied: "Copy Result",
    copySuccess: "Result copied successfully.",
    copyError: "Clipboard access is unavailable.",
    backendError: "Backend unavailable. Showing a basic local pattern check.",
    emptyMessage: "Please enter a message first.",
    invalidUrl: "Invalid URL format.",
    noFlags: "No common warning patterns detected.",
    domain: "Domain",
    protocol: "Connection",
    secure: "HTTPS",
    insecure: "HTTP",
    invalidIp: "Invalid IP address."
  },

  ta: {
    brand: "ScamGuard",
    tagline: "உங்கள் டிஜிட்டல் பாதுகாப்பு துணை",
    title: "டிஜிட்டல் உலகில் பாதுகாப்பாக இருங்கள்.",
    subtitle: "சந்தேகமான செய்திகள் மற்றும் இணைப்புகளை சரிபார்க்கவும்.",
    analyzer: "செய்தி சரிபார்ப்பு",
    category: "வகையை தேர்வு செய்யவும்",
    message: "சந்தேகமான செய்தியை இங்கே பதிவிடவும்...",
    analyze: "செய்தியை சரிபார்க்கவும்",
    analyzing: "சரிபார்க்கப்படுகிறது...",
    clear: "அழி",
    result: "சரிபார்ப்பு முடிவு",
    safe: "குறைந்த ஆபத்து",
    medium: "மிதமான ஆபத்து",
    high: "அதிக ஆபத்து",
    urlTitle: "இணையதள இணைப்பு சரிபார்ப்பு",
    urlPlaceholder: "இணையதள முகவரியை பதிவிடவும்...",
    checkUrl: "சரிபார்க்கவும்",
    history: "சமீபத்திய செயல்பாடுகள்",
    clearHistory: "வரலாற்றை அழி",
    empty: "இதுவரை வரலாறு இல்லை.",
    tips: "பாதுகாப்பு குறிப்புகள்",
    tip1: "OTP அல்லது கடவுச்சொல்லை பகிர வேண்டாம்.",
    tip2: "இணைப்புகளை திறக்கும் முன் அனுப்புநரை சரிபார்க்கவும்.",
    tip3: "அவசர பணம் கேட்கும் செய்திகளை தவிர்க்கவும்.",
    disclaimer: "ScamGuard ஆரம்பநிலை சரிபார்ப்பை மட்டுமே வழங்குகிறது.",
    summary: "சுருக்கம்",
    flags: "எச்சரிக்கை அறிகுறிகள்",
    actions: "பரிந்துரைக்கப்படும் நடவடிக்கைகள்",
    urlWarning: "சந்தேகமான இணைப்பு அமைப்பு கண்டறியப்பட்டது.",
    urlSafe: "பொதுவான சந்தேகமான அமைப்பு கண்டறியப்படவில்லை.",
    urlInvalid: "சரியான இணையதள முகவரியை பதிவிடவும்.",
    selectCategory: "வகையை தேர்வு செய்யவும்",
    copied: "முடிவை நகலெடுக்கவும்",
    copySuccess: "முடிவு நகலெடுக்கப்பட்டது.",
    copyError: "நகலெடுக்க முடியவில்லை.",
    backendError: "Backend கிடைக்கவில்லை. அடிப்படை சரிபார்ப்பு பயன்படுத்தப்படுகிறது.",
    emptyMessage: "முதலில் ஒரு செய்தியை பதிவிடவும்.",
    invalidUrl: "தவறான இணையதள முகவரி.",
    noFlags: "எச்சரிக்கை அறிகுறிகள் இல்லை.",
    domain: "டொமைன்",
    protocol: "இணைப்பு",
    secure: "பாதுகாப்பான HTTPS",
    insecure: "HTTP",
    invalidIp: "தவறான IP முகவரி."
  },

  te: {
    brand: "ScamGuard",
    tagline: "మీ డిజిటల్ భద్రత సహాయకుడు",
    title: "డిజిటల్ ప్రపంచంలో సురక్షితంగా ఉండండి.",
    subtitle: "సందేహాస్పద సందేశాలు మరియు లింకులను తనిఖీ చేయండి.",
    analyzer: "సందేశ విశ్లేషణ",
    category: "వర్గాన్ని ఎంచుకోండి",
    message: "సందేహాస్పద సందేశాన్ని ఇక్కడ నమోదు చేయండి...",
    analyze: "సందేశాన్ని తనిఖీ చేయండి",
    analyzing: "తనిఖీ చేస్తోంది...",
    clear: "తొలగించు",
    result: "విశ్లేషణ ఫలితం",
    safe: "తక్కువ ప్రమాదం",
    medium: "మధ్యస్థ ప్రమాదం",
    high: "అధిక ప్రమాదం",
    urlTitle: "వెబ్‌సైట్ లింక్ తనిఖీ",
    urlPlaceholder: "వెబ్‌సైట్ URL నమోదు చేయండి...",
    checkUrl: "లింక్ తనిఖీ",
    history: "ఇటీవలి కార్యకలాపాలు",
    clearHistory: "చరిత్ర తొలగించు",
    empty: "ఇంకా చరిత్ర లేదు.",
    tips: "భద్రతా చిట్కాలు",
    tip1: "మీ OTP లేదా పాస్‌వర్డ్‌లను పంచుకోవద్దు.",
    tip2: "లింక్‌లను తెరవడానికి ముందు పంపినవారిని ధృవీకరించండి.",
    tip3: "అత్యవసర చెల్లింపు అభ్యర్థనలను నివారించండి.",
    disclaimer: "ScamGuard ప్రాథమిక తనిఖీలను మాత్రమే అందిస్తుంది.",
    summary: "సారాంశం",
    flags: "హెచ్చరిక సంకేతాలు",
    actions: "సూచించిన చర్యలు",
    urlWarning: "అనుమానాస్పద URL నమూనాలు గుర్తించబడ్డాయి.",
    urlSafe: "సాధారణ అనుమానాస్పద నమూనాలు కనిపించలేదు.",
    urlInvalid: "దయచేసి సరైన URL నమోదు చేయండి.",
    selectCategory: "వర్గాన్ని ఎంచుకోండి",
    copied: "ఫలితాన్ని కాపీ చేయండి",
    copySuccess: "ఫలితం కాపీ చేయబడింది.",
    copyError: "కాపీ చేయడం సాధ్యం కాలేదు.",
    backendError: "Backend అందుబాటులో లేదు. స్థానిక తనిఖీ ఉపయోగించబడుతోంది.",
    emptyMessage: "ముందుగా సందేశాన్ని నమోదు చేయండి.",
    invalidUrl: "చెల్లని URL.",
    noFlags: "హెచ్చరిక సంకేతాలు కనుగొనబడలేదు.",
    domain: "డొమైన్",
    protocol: "కనెక్షన్",
    secure: "HTTPS",
    insecure: "HTTP",
    invalidIp: "చెల్లని IP చిరునామా."
  }
};

const categories = [
  { id: "other", label: "General Message", icon: MessageSquare },
  { id: "job", label: "Job Offer", icon: Briefcase },
  { id: "shopping", label: "Online Shopping", icon: ShoppingBag },
  { id: "bank", label: "Bank & Payment", icon: CreditCard },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "rewards", label: "Prize & Rewards", icon: Gift },
  { id: "impersonation", label: "Impersonation", icon: Lock },
  { id: "trading", label: "Investment", icon: CreditCard }
];

const suspiciousPatterns = [
  {
    pattern: /\burgent\b|\bimmediately\b|\bright now\b/i,
    label: "Urgent or pressure-based language"
  },
  {
    pattern: /\botp\b|one.time.password|verification code/i,
    label: "Requests or mentions of verification codes"
  },
  {
    pattern: /password|pin number|\bcvv\b/i,
    label: "Requests for confidential information"
  },
  {
    pattern: /free money|you won|lottery|prize winner/i,
    label: "Unexpected prize or money claim"
  },
  {
    pattern: /click here|verify now|account suspended/i,
    label: "Suspicious account or link instruction"
  },
  {
    pattern: /send money|pay now|processing fee/i,
    label: "Unexpected payment request"
  },
  {
    pattern: /guaranteed profit|double your money/i,
    label: "Unrealistic investment promise"
  },
  {
    pattern: /limited time|last chance/i,
    label: "Pressure to act quickly"
  }
];

function getRisk(flags) {
  return flags.length >= 3
    ? "high"
    : flags.length >= 1
      ? "medium"
      : "low";
}

function localAnalyze(message) {
  const text = String(message || "").trim();

  const flags = suspiciousPatterns
    .filter(item => item.pattern.test(text))
    .map(item => item.label);

  const risk = getRisk(flags);

  return {
    category: "Message",
    risk,
    level: risk === "high" ? 85 : risk === "medium" ? 50 : 15,
    flags,
    actions: [
      "Do not share OTPs, passwords, PINs or banking details.",
      "Verify the sender using an official contact channel.",
      "Do not make payments until the claim is independently verified."
    ],
    summary: risk === "high"
      ? "Multiple suspicious patterns were found. Treat this message with caution."
      : risk === "medium"
        ? "Some suspicious patterns were found. Verify the message before responding."
        : "No common warning patterns were found. This does not prove the message is genuine."
  };
}

function inspectUrl(value) {
  try {
    const input = String(value || "").trim();

    if (!input || /\s/.test(input)) {
      return {
        valid: false,
        risk: "low",
        flags: [],
        actions: [],
        summary: "Please enter a valid URL."
      };
    }

    const normalized = /^https?:\/\//i.test(input)
      ? input
      : `https://${input}`;

    const parsed = new URL(normalized);

    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      !parsed.hostname
    ) {
      throw new Error("Invalid URL");
    }

    const hostname = parsed.hostname.toLowerCase();
    const labels = hostname.split(".");
    const flags = [];

    // Detect IPv4 addresses
    const isIPv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    if (isIPv4) {
      const validIP = hostname
        .split(".")
        .every(part => {
          const number = Number(part);
          return number >= 0 && number <= 255;
        });

      if (!validIP) {
        return {
          valid: false,
          risk: "low",
          flags: [],
          actions: [],
          summary: "Invalid IP address."
        };
      }

      flags.push("Website uses a direct IP address");
    } else {
      const invalidLabels = labels.some(label =>
        !label ||
        label.length > 63 ||
        label.startsWith("-") ||
        label.endsWith("-") ||
        !/^[a-z0-9-]+$/i.test(label)
      );

      if (
        !hostname.includes(".") ||
        invalidLabels
      ) {
        return {
          valid: false,
          risk: "low",
          flags: [],
          actions: [],
          summary: "Invalid domain format."
        };
      }
    }

    if (parsed.protocol === "http:") {
      flags.push("Website does not use HTTPS");
    }

    const shorteners = [
      "bit.ly",
      "tinyurl.com",
      "t.co",
      "is.gd",
      "cutt.ly",
      "rb.gy",
      "shorturl.at"
    ];

    if (
      shorteners.some(domain =>
        hostname === domain ||
        hostname.endsWith(`.${domain}`)
      )
    ) {
      flags.push("Shortened URL hides the final destination");
    }

    if (hostname.includes("xn--")) {
      flags.push("Internationalized domain name detected");
    }

    if (!isIPv4 && labels.length > 4) {
      flags.push("Unusually long subdomain");
    }

    if (parsed.username || parsed.password) {
      flags.push("URL contains embedded login credentials");
    }

    if (/\d{5,}/.test(hostname)) {
      flags.push("Long number sequence in domain");
    }

    if (hostname.length > 100) {
      flags.push("Unusually long domain name");
    }

    // URL-specific risk calculation
    let risk = "low";

    const highRiskPatterns = [
      "URL contains embedded login credentials",
      "Internationalized domain name detected"
    ];

    const mediumRiskPatterns = [
      "Website uses a direct IP address",
      "Website does not use HTTPS",
      "Shortened URL hides the final destination",
      "Unusually long subdomain",
      "Long number sequence in domain",
      "Unusually long domain name"
    ];

    if (highRiskPatterns.some(flag => flags.includes(flag))) {
      risk = "high";
    } else if (
      mediumRiskPatterns.some(flag => flags.includes(flag))
    ) {
      risk = "medium";
    }

    const actions = risk === "high"
      ? [
          "Avoid opening this link until its destination is independently verified.",
          "Do not enter passwords, OTPs or banking details.",
          "Verify the website using its official address."
        ]
      : risk === "medium"
        ? [
            "Check the complete domain carefully.",
            "Verify the website through an official source.",
            "Avoid entering sensitive information until verified."
          ]
        : [
            "No common suspicious URL patterns were detected.",
            "Check the website identity before sharing information."
          ];

    return {
      valid: true,
      risk,
      level: risk === "high" ? 85 : risk === "medium" ? 50 : 15,
      flags,
      actions,
      hostname,
      protocol: parsed.protocol,
      summary: flags.length
        ? "Potentially suspicious URL patterns were detected."
        : "No common suspicious URL patterns were detected."
    };

  } catch {
    return {
      valid: false,
      risk: "low",
      flags: [],
      actions: [],
      summary: "Unable to parse this URL."
    };
  }
}

function getRiskLabel(risk, t) {
  const normalized = String(risk || "low").toLowerCase();

  if (normalized === "high") return t.high;
  if (normalized === "medium") return t.medium;

  return t.safe;
}

function normalizeApiResult(data) {
  const risk = String(data?.risk || "low").toLowerCase();

  const validRisk = ["low", "medium", "high"].includes(risk)
    ? risk
    : "low";

  return {
    ...data,
    risk: validRisk,
    level:
      Number(data?.level) ||
      (validRisk === "high" ? 85 : validRisk === "medium" ? 50 : 15),
    flags: Array.isArray(data?.flags) ? data.flags : [],
    actions: Array.isArray(data?.actions) ? data.actions : [],
    summary: data?.summary || "Analysis completed."
  };
}

const styles = `
:root { color-scheme: dark; font-family: Inter, Arial, sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; background: #080b18; color: #f4f5ff; }
button, textarea, select, input { font: inherit; }
.sg-app { min-height: 100vh; background: radial-gradient(circle at 50% 0%, #20234a 0, #0b1021 42%, #080b18 100%); padding: 28px 18px 60px; }
.sg-wrap { max-width: 1080px; margin: auto; }
.sg-header { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:55px; }
.sg-brand { display:flex; align-items:center; gap:12px; }
.sg-logo { width:45px; height:45px; display:grid; place-items:center; background:#7657f5; border-radius:14px; }
.sg-brand h2 { margin:0; font-size:21px; }
.sg-muted { color:#9da5c5; font-size:13px; }
.sg-language { background:#171d35; border:1px solid #303958; color:white; padding:10px 12px; border-radius:10px; }
.sg-hero { text-align:center; max-width:720px; margin:0 auto 38px; }
.sg-hero h1 { font-size:clamp(32px,5vw,48px); line-height:1.12; margin:0 0 15px; }
.sg-hero p { color:#aab2d0; line-height:1.7; }
.sg-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.sg-card { background:rgba(20,26,49,.92); border:1px solid #293251; border-radius:19px; padding:23px; box-shadow:0 15px 40px #0003; min-width:0; }
.sg-card h2 { font-size:19px; margin:0 0 18px; display:flex; align-items:center; gap:9px; }
.sg-field { width:100%; color:#f5f5ff; background:#0c1227; border:1px solid #303a5c; border-radius:11px; padding:13px; outline:none; }
.sg-field:focus { border-color:#8b72ff; box-shadow:0 0 0 3px #8065ff22; }
.sg-textarea { min-height:145px; resize:vertical; line-height:1.6; }
.sg-select { margin-bottom:12px; }
.sg-button { border:0; border-radius:10px; background:#795af5; color:white; padding:12px 17px; cursor:pointer; display:inline-flex; justify-content:center; align-items:center; gap:8px; font-weight:600; }
.sg-button:hover { background:#8d73ff; }
.sg-button:disabled { opacity:.55; cursor:not-allowed; }
.sg-button.secondary { background:#252d4a; border:1px solid #3a4567; }
.sg-button.danger { background:#492535; }
.sg-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:13px; }
.sg-result { margin-top:18px; padding:16px; border-radius:13px; background:#101a2e; border:1px solid #33415f; }
.sg-result.high { border-color:#b74c68; }
.sg-result.medium { border-color:#bd9148; }
.sg-result.low { border-color:#3c9977; }
.sg-result h3 { margin:0 0 8px; display:flex; align-items:center; gap:7px; }
.sg-result p { color:#b6bfd8; line-height:1.55; overflow-wrap:anywhere; }
.sg-result ul { padding-left:20px; color:#cbd1e5; line-height:1.8; }
.sg-risk { display:inline-block; border-radius:30px; padding:5px 10px; font-size:12px; background:#26334a; }
.sg-history { margin-top:20px; }
.sg-history-item { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #293251; }
.sg-history-item:last-child { border-bottom:0; }
.sg-history-item p { margin:4px 0 0; font-size:12px; color:#9da5c5; overflow-wrap:anywhere; }
.sg-tips { display:grid; grid-template-columns:repeat(3,1fr); gap:13px; margin-top:20px; }
.sg-tip { background:#141a31; border:1px solid #293251; padding:17px; border-radius:13px; color:#bdc5dd; line-height:1.5; font-size:13px; }
.sg-disclaimer { text-align:center; margin-top:30px; color:#8992b1; font-size:12px; line-height:1.6; }
.sg-error { color:#ff9eaa; margin-top:12px; font-size:13px; }
.sg-success { color:#80ddb5; margin-top:12px; font-size:13px; }
.sg-full { grid-column:1/-1; }
@media(max-width:720px) {
  .sg-grid { grid-template-columns:1fr; }
  .sg-tips { grid-template-columns:1fr; }
  .sg-header { margin-bottom:35px; }
  .sg-card { padding:18px; }
}
`;

function loadHistory() {
  try {
    const saved = localStorage.getItem("scamguard-history");
    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("other");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [messageResult, setMessageResult] = useState(null);
  const [urlResult, setUrlResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [historyItems, setHistoryItems] = useState(loadHistory);

  const t = translations[language] || translations.en;

  useEffect(() => {
    try {
      localStorage.setItem(
        "scamguard-history",
        JSON.stringify(historyItems)
      );
    } catch {
      // Storage may be unavailable.
    }
  }, [historyItems]);

  function saveHistory(item) {
    setHistoryItems(previous =>
      [item, ...previous].slice(0, 20)
    );
  }

  async function analyzeMessage() {
    if (!message.trim()) {
      setError(t.emptyMessage);
      setMessageResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");
    setMessageResult(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          category
        })
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const result = normalizeApiResult(data);

      setMessageResult(result);

      saveHistory({
        id: Date.now(),
        type: "Message",
        preview: message.trim().slice(0, 65),
        risk: result.risk,
        date: new Date().toLocaleString()
      });

    } catch {
      const result = localAnalyze(message);

      setMessageResult(result);
      setError(t.backendError);

      saveHistory({
        id: Date.now(),
        type: "Message (local check)",
        preview: message.trim().slice(0, 65),
        risk: result.risk,
        date: new Date().toLocaleString()
      });

    } finally {
      setLoading(false);
    }
  }

  function checkUrl() {
    setError("");
    setNotice("");

    const result = inspectUrl(url);

    setUrlResult(result);

    if (!result.valid) return;

    saveHistory({
      id: Date.now(),
      type: "Website URL",
      preview: url.trim().slice(0, 65),
      risk: result.risk,
      date: new Date().toLocaleString()
    });
  }

  function clearMessage() {
    setMessage("");
    setMessageResult(null);
    setError("");
    setNotice("");
  }

  function clearUrl() {
    setUrl("");
    setUrlResult(null);
    setError("");
    setNotice("");
  }

  function clearHistory() {
    setHistoryItems([]);
  }

  async function copyText(value) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(value);
      setError("");
      setNotice(t.copySuccess);

    } catch {
      setNotice("");
      setError(t.copyError);
    }
  }

  return (
    <>
      <style>{styles}</style>

      <main className="sg-app">
        <div className="sg-wrap">

          <header className="sg-header">
            <div className="sg-brand">
              <div className="sg-logo">
                <ShieldCheck size={25} />
              </div>
              <div>
                <h2>{t.brand}</h2>
                <div className="sg-muted">{t.tagline}</div>
              </div>
            </div>

            <label>
              <Languages size={15} />{" "}
              <select
                className="sg-language"
                value={language}
                onChange={event => {
                  setLanguage(event.target.value);
                  setNotice("");
                  setError("");
                }}
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
            </label>
          </header>

          <section className="sg-hero">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </section>

          <div className="sg-grid">

            <section className="sg-card">
              <h2>
                <MessageSquare size={20} />
                {t.analyzer}
              </h2>

              <select
                className="sg-field sg-select"
                value={category}
                onChange={event => setCategory(event.target.value)}
                aria-label={t.category}
              >
                {categories.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>

              <textarea
                className="sg-field sg-textarea"
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder={t.message}
                maxLength={5000}
              />

              <div className="sg-actions">
                <button
                  className="sg-button"
                  onClick={analyzeMessage}
                  disabled={loading || !message.trim()}
                >
                  <Search size={17} />
                  {loading ? t.analyzing : t.analyze}
                </button>

                <button
                  className="sg-button secondary"
                  onClick={clearMessage}
                >
                  <RefreshCw size={16} />
                  {t.clear}
                </button>
              </div>

              {messageResult && (
                <div className={`sg-result ${messageResult.risk}`}>
                  <h3>{t.result}</h3>

                  <span className="sg-risk">
                    {getRiskLabel(messageResult.risk, t)}
                  </span>

                  <p>
                    <strong>{t.summary}:</strong>{" "}
                    {messageResult.summary}
                  </p>

                  <p><strong>{t.flags}:</strong></p>

                  {messageResult.flags.length > 0 ? (
                    <ul>
                      {messageResult.flags.map((flag, index) => (
                        <li key={`${flag}-${index}`}>{flag}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t.noFlags}</p>
                  )}

                  <p><strong>{t.actions}:</strong></p>

                  <ul>
                    {messageResult.actions.map((action, index) => (
                      <li key={`${action}-${index}`}>{action}</li>
                    ))}
                  </ul>

                  <button
                    className="sg-button secondary"
                    onClick={() =>
                      copyText(JSON.stringify(messageResult, null, 2))
                    }
                  >
                    <Copy size={15} /> {t.copied}
                  </button>
                </div>
              )}
            </section>

            <section className="sg-card">
              <h2>
                <LinkIcon size={20} />
                {t.urlTitle}
              </h2>

              <input
                className="sg-field"
                type="text"
                value={url}
                onChange={event => setUrl(event.target.value)}
                placeholder={t.urlPlaceholder}
                onKeyDown={event => {
                  if (event.key === "Enter") checkUrl();
                }}
              />

              <div className="sg-actions">
                <button
                  className="sg-button"
                  onClick={checkUrl}
                  disabled={!url.trim()}
                >
                  <Search size={17} />
                  {t.checkUrl}
                </button>

                <button
                  className="sg-button secondary"
                  onClick={clearUrl}
                >
                  <RefreshCw size={16} />
                  {t.clear}
                </button>
              </div>

              {urlResult && (
                <div className={`sg-result ${urlResult.valid ? urlResult.risk : "medium"}`}>
                  {!urlResult.valid ? (
                    <h3>
                      <AlertTriangle size={18} />
                      {t.urlInvalid}
                    </h3>
                  ) : (
                    <>
                      <h3>
                        {urlResult.risk === "low"
                          ? <CheckCircle size={19} />
                          : <AlertTriangle size={19} />}
                        {getRiskLabel(urlResult.risk, t)}
                      </h3>

                      <p>
                        <strong>{t.domain}:</strong>{" "}
                        {urlResult.hostname}
                      </p>

                      <p>
                        <strong>{t.protocol}:</strong>{" "}
                        {urlResult.protocol === "https:"
                          ? t.secure
                          : t.insecure}
                      </p>

                      <p>
                        <strong>{t.summary}:</strong>{" "}
                        {urlResult.summary}
                      </p>

                      <p><strong>{t.flags}:</strong></p>

                      {urlResult.flags.length > 0 ? (
                        <ul>
                          {urlResult.flags.map((flag, index) => (
                            <li key={`${flag}-${index}`}>{flag}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{t.urlSafe}</p>
                      )}

                      <p><strong>{t.actions}:</strong></p>

                      <ul>
                        {urlResult.actions.map((action, index) => (
                          <li key={`${action}-${index}`}>{action}</li>
                        ))}
                      </ul>

                      <button
                        className="sg-button secondary"
                        onClick={() =>
                          copyText(JSON.stringify(urlResult, null, 2))
                        }
                      >
                        <Copy size={15} /> {t.copied}
                      </button>
                    </>
                  )}
                </div>
              )}
            </section>

            <section className="sg-card sg-full">
              <h2>
                <History size={20} />
                {t.history}
              </h2>

              <div className="sg-actions">
                <button
                  className="sg-button danger"
                  onClick={clearHistory}
                  disabled={historyItems.length === 0}
                >
                  <Trash2 size={16} />
                  {t.clearHistory}
                </button>
              </div>

              <div className="sg-history">
                {historyItems.length === 0 ? (
                  <p className="sg-muted">{t.empty}</p>
                ) : (
                  historyItems.map(item => (
                    <div className="sg-history-item" key={item.id}>
                      <div>
                        <strong>{item.type}</strong>
                        <p>{item.preview}</p>
                        <p>{item.date}</p>
                      </div>

                      <span className="sg-risk">
                        {getRiskLabel(item.risk, t)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="sg-card sg-full">
              <h2>
                <ShieldCheck size={20} />
                {t.tips}
              </h2>

              <div className="sg-tips">
                <div className="sg-tip">
                  <Lock size={18} /> {t.tip1}
                </div>
                <div className="sg-tip">
                  <ExternalLink size={18} /> {t.tip2}
                </div>
                <div className="sg-tip">
                  <CreditCard size={18} /> {t.tip3}
                </div>
              </div>
            </section>

          </div>

          {error && <p className="sg-error">{error}</p>}
          {notice && <p className="sg-success">{notice}</p>}

          <footer className="sg-disclaimer">
            {t.disclaimer}
            <br />
            Low Risk does not mean a message or website is verified safe.
          </footer>

        </div>
      </main>
    </>
  );
}
