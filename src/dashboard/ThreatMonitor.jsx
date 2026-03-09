import { motion } from 'framer-motion';
import { AlertTriangle, Wifi, Bug, ShieldOff, Globe, Clock, Server, Filter } from 'lucide-react';
import { useState } from 'react';

const mockThreats = [
  { id: 1, type: 'Brute Force Attack', severity: 'Critical', ip: '45.33.22.11', system: 'Auth Server', timestamp: '2 min ago', status: 'active', desc: 'Multiple failed login attempts detected from external IP' },
  { id: 2, type: 'Malware Detected', severity: 'High', ip: '192.168.1.45', system: 'Workstation-07', timestamp: '12 min ago', status: 'investigating', desc: 'Trojan signature found in uploaded file scan' },
  { id: 3, type: 'Suspicious Traffic', severity: 'Medium', ip: '112.54.33.22', system: 'Network Gateway', timestamp: '34 min ago', status: 'active', desc: 'Unusual outbound data spike detected on port 443' },
  { id: 4, type: 'DDoS Attempt', severity: 'Critical', ip: '8.8.4.4', system: 'Load Balancer', timestamp: '1 hr ago', status: 'mitigated', desc: 'Volumetric flood attack from botnet cluster' },
  { id: 5, type: 'Port Scan', severity: 'Low', ip: '10.0.0.55', system: 'Firewall', timestamp: '2 hr ago', status: 'mitigated', desc: 'Sequential port probing from internal subnet' },
  { id: 6, type: 'SQL Injection', severity: 'High', ip: '203.0.113.50', system: 'Web App Server', timestamp: '3 hr ago', status: 'mitigated', desc: 'Malicious payload detected in login form input' },
];

const severityColor = {
  Critical: 'bg-red-500/15 text-red-400 border-red-500/40',
  High: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40',
  Low: 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40',
};
const statusColor = {
  active: 'text-red-400',
  investigating: 'text-yellow-400',
  mitigated: 'text-cyber-green',
};
const severityIcon = {
  Critical: <ShieldOff className="w-5 h-5 text-red-400" />,
  High: <AlertTriangle className="w-5 h-5 text-orange-400" />,
  Medium: <Wifi className="w-5 h-5 text-yellow-400" />,
  Low: <Bug className="w-5 h-5 text-cyber-blue" />,
};

export default function ThreatMonitor() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? mockThreats : mockThreats.filter(t => t.severity === filter);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Threat Detection</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time analysis of suspicious activity and network anomalies</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filter === s ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue' : 'border-gray-700 text-gray-400 hover:bg-white/5'}`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Threats', val: mockThreats.filter(t => t.status === 'active').length, icon: <ShieldOff className="w-5 h-5 text-red-400"/>, c: 'border-red-500/30' },
          { label: 'Investigating', val: mockThreats.filter(t => t.status === 'investigating').length, icon: <Clock className="w-5 h-5 text-yellow-400"/>, c: 'border-yellow-500/30' },
          { label: 'Mitigated', val: mockThreats.filter(t => t.status === 'mitigated').length, icon: <Server className="w-5 h-5 text-cyber-green"/>, c: 'border-cyber-green/30' },
          { label: 'Unique Sources', val: new Set(mockThreats.map(t => t.ip)).size, icon: <Globe className="w-5 h-5 text-cyber-purple"/>, c: 'border-cyber-purple/30' },
        ].map((s, i) => (
          <div key={i} className={`glass-panel p-4 border-l-4 ${s.c}`}>
            <div className="flex justify-between items-center mb-2">{s.icon}<span className="text-xs text-gray-500 uppercase">{s.label}</span></div>
            <p className="text-2xl font-bold text-white">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Threat Cards */}
      <div className="space-y-4">
        {filtered.map((threat, i) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-panel p-5 hover:bg-white/5 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-start space-x-4">
                <div className={`p-2.5 rounded-lg ${severityColor[threat.severity]} border`}>
                  {severityIcon[threat.severity]}
                </div>
                <div>
                  <h4 className="text-white font-semibold group-hover:text-cyber-blue transition-colors">{threat.type}</h4>
                  <p className="text-gray-400 text-sm mt-1">{threat.desc}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="font-mono">IP: {threat.ip}</span>
                    <span>System: {threat.system}</span>
                    <span>{threat.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:flex-col md:items-end md:space-x-0 md:space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityColor[threat.severity]}`}>{threat.severity}</span>
                <span className={`text-xs font-medium capitalize ${statusColor[threat.status]}`}>● {threat.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
