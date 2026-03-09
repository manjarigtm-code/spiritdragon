import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ShieldAlert, Globe, Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

// Mock Data
const attackTrendsData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  datasets: [
    {
      fill: true,
      label: 'Incoming Threats',
      data: [12, 19, 15, 50, 22, 30, 45],
      borderColor: '#00f3ff',
      backgroundColor: 'rgba(0, 243, 255, 0.1)',
      tension: 0.4,
    },
    {
      fill: true,
      label: 'Blocked Traffic',
      data: [8, 12, 10, 40, 18, 25, 38],
      borderColor: '#b026ff',
      backgroundColor: 'rgba(176, 38, 255, 0.1)',
      tension: 0.4,
    }
  ],
};

const threatTypeData = {
  labels: ['DDoS', 'Phishing', 'Malware', 'SQL Injection'],
  datasets: [{
    data: [45, 25, 20, 10],
    backgroundColor: ['#00f3ff', '#b026ff', '#00ff00', '#ff003c'],
    borderWidth: 0,
    hoverOffset: 4
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#e5e7eb' } }
  },
  scales: {
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
  }
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'right', labels: { color: '#e5e7eb' } } }
};

export default function DashboardHome() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Security Overview</h2>
          <p className="text-sm text-gray-400">System health and real-time threat analysis</p>
        </div>
        <div className="flex space-x-3">
           <div className="bg-cyber-blue/10 border border-cyber-blue px-4 py-2 rounded-lg flex items-center">
             <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse mr-2"></span>
             <span className="text-cyber-blue text-sm font-medium">System Online</span>
           </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'System Score', value: '98/100', icon: <ShieldAlert className="text-cyber-green"/>, color: 'border-cyber-green', text: 'text-cyber-green' },
          { title: 'Active Threats', value: '24', icon: <Activity className="text-red-500"/>, color: 'border-red-500', text: 'text-red-500' },
          { title: 'Global IPs Blocked', value: '1,429', icon: <Globe className="text-cyber-blue"/>, color: 'border-cyber-blue', text: 'text-cyber-blue' },
          { title: 'Failed Logins', value: '87', icon: <Terminal className="text-cyber-purple"/>, color: 'border-cyber-purple', text: 'text-cyber-purple' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className={`glass-panel p-6 border-t-4 ${stat.color} hover:bg-white/5 transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
              {stat.icon}
            </div>
            <p className={`text-3xl font-bold ${stat.text} drop-shadow-[0_0_5px_currentColor]`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Attack Trends (24h)</h3>
          <div className="h-72">
            <Line data={attackTrendsData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Threat Distribution</h3>
          <div className="h-72 flex justify-center pb-4">
            <Doughnut data={threatTypeData} options={pieOptions} />
          </div>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5 }}
         className="glass-panel p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Live Security Alerts</h3>
          <button className="text-xs text-cyber-blue hover:text-white transition-colors">View All Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-black/40 text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Threat Type</th>
                <th className="px-4 py-3">IP Source</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '10:42:05', type: 'SQL Injection Attempt', ip: '192.168.1.105', severity: 'Critical', bg: 'bg-red-500/10 text-red-500 border border-red-500/50' },
                { time: '10:39:12', type: 'Brute Force Login', ip: '45.22.19.8', severity: 'High', bg: 'bg-orange-500/10 text-orange-500 border border-orange-500/50' },
                { time: '10:15:33', type: 'Malware Signature', ip: '112.54.33.22', severity: 'High', bg: 'bg-orange-500/10 text-orange-500 border border-orange-500/50' },
                { time: '09:55:01', type: 'Port Scan', ip: '8.8.4.4', severity: 'Low', bg: 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/50' },
              ].map((log, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{log.time}</td>
                  <td className="px-4 py-3 text-white">{log.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cyber-purple">{log.ip}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs px-2.5 py-0.5 ${log.bg}`}>{log.severity}</span>
                  </td>
                  <td className="px-4 py-3 text-cyber-green">Blocked</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
