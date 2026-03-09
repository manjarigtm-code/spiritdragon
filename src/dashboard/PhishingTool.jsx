import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailWarning, AlertTriangle, CheckCircle, Globe, Link2, Search, ShieldAlert } from 'lucide-react';

const maliciousKeywords = ['urgent', 'verify your account', 'click here', 'suspended', 'confirm identity', 'unauthorized', 'password reset', 'act now', 'limited time', 'winner'];
const suspiciousDomains = ['paypa1.com', 'g00gle.com', 'amaz0n-secure.com', 'update-banking.com', 'login-verify.net'];

function analyzeContent(text) {
  const lower = text.toLowerCase();
  let score = 0;
  const findings = [];

  // Check for malicious keywords
  maliciousKeywords.forEach(kw => {
    if (lower.includes(kw)) {
      score += 12;
      findings.push({ type: 'Suspicious Keyword', detail: `Contains "${kw}"`, severity: 'warning' });
    }
  });

  // Check for suspicious domains
  suspiciousDomains.forEach(d => {
    if (lower.includes(d)) {
      score += 25;
      findings.push({ type: 'Malicious Domain', detail: `Contains known phishing domain: ${d}`, severity: 'critical' });
    }
  });

  // Check for URLs
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const urls = text.match(urlRegex) || [];
  if (urls.length > 0) {
    score += 8;
    findings.push({ type: 'External Links', detail: `Found ${urls.length} URL(s) in content`, severity: 'info' });
  }

  // Check for urgency patterns
  if (/(!{2,}|URGENT|IMMEDIATE|ACT NOW)/i.test(text)) {
    score += 15;
    findings.push({ type: 'Urgency Pattern', detail: 'Message uses high-pressure urgency tactics', severity: 'warning' });
  }

  // Check for credential requests
  if (/password|ssn|social security|credit card|bank account/i.test(text)) {
    score += 20;
    findings.push({ type: 'Credential Harvesting', detail: 'Requests sensitive personal information', severity: 'critical' });
  }

  score = Math.min(score, 100);

  return { score, findings, risk: score >= 60 ? 'High' : score >= 30 ? 'Medium' : 'Low' };
}

export default function PhishingTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setResult(analyzeContent(input));
  };

  const riskColor = { High: 'text-red-400', Medium: 'text-yellow-400', Low: 'text-cyber-green' };
  const riskBg = { High: 'from-red-500/20', Medium: 'from-yellow-500/20', Low: 'from-green-500/20' };
  const severityIcon = { critical: <AlertTriangle className="w-4 h-4 text-red-400"/>, warning: <ShieldAlert className="w-4 h-4 text-yellow-400"/>, info: <CheckCircle className="w-4 h-4 text-cyber-blue"/> };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-white">Phishing Detection</h2>
        <p className="text-sm text-gray-400 mt-1">Paste suspicious email content or URLs to analyze for phishing indicators</p>
      </div>

      {/* Input Area */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MailWarning className="w-5 h-5 text-cyber-blue" />
          <h3 className="text-white font-semibold">Content Scanner</h3>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Paste the suspicious email body, URL, or message content here..."
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all font-mono text-sm resize-none"
        />
        <button onClick={handleAnalyze}
          className="mt-4 flex items-center px-6 py-3 bg-cyber-blue text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all"
        >
          <Search className="w-5 h-5 mr-2" />
          Analyze Content
        </button>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Risk Score */}
          <div className={`glass-panel p-6 bg-gradient-to-r ${riskBg[result.risk]} to-transparent`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Threat Assessment</h3>
                <p className="text-gray-400 text-sm">Content risk analysis complete</p>
              </div>
              <div className="text-right">
                <p className={`text-5xl font-bold ${riskColor[result.risk]} drop-shadow-[0_0_10px_currentColor]`}>{result.score}</p>
                <p className={`text-sm font-medium mt-1 ${riskColor[result.risk]}`}>{result.risk} Risk</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all duration-700 ${result.risk === 'High' ? 'bg-red-500' : result.risk === 'Medium' ? 'bg-yellow-500' : 'bg-cyber-green'}`}
                style={{ width: `${result.score}%` }}></div>
            </div>
          </div>

          {/* Findings */}
          {result.findings.length > 0 && (
            <div className="glass-panel p-6">
              <h3 className="text-white font-semibold mb-4">Detected Indicators ({result.findings.length})</h3>
              <div className="space-y-3">
                {result.findings.map((f, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg border border-gray-800">
                    {severityIcon[f.severity]}
                    <div>
                      <p className="text-white text-sm font-medium">{f.type}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Actions */}
          <div className="glass-panel p-6 border-l-4 border-cyber-purple">
            <h3 className="text-white font-semibold mb-3">🛡️ Recommended Actions</h3>
            <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
              {result.risk === 'High' && <><li>Do NOT click any links in this message</li><li>Report this email to your IT security team immediately</li><li>Block the sender's domain at the mail gateway</li></>}
              {result.risk === 'Medium' && <><li>Verify the sender's identity through an independent channel</li><li>Hover over URLs to confirm they point to legitimate domains</li></>}
              {result.risk === 'Low' && <><li>Content appears mostly safe, but remain cautious</li><li>Always verify unexpected requests for information</li></>}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
