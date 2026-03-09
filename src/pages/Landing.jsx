import { Link } from 'react-router-dom';
import { Shield, Lock, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-cyber-bg text-white font-sans overflow-x-hidden relative">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Nav */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-white/10 glass-panel border-x-0 border-t-0 rounded-none">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-cyber-blue" />
          <span className="text-2xl font-bold tracking-widest neon-text-blue">NEXUS<span className="text-cyber-purple">SEC</span></span>
        </div>
        <div className="space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white hover:neon-text-blue transition-all">Login</Link>
          <Link to="/register" className="px-6 py-2 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue rounded-lg hover:bg-cyber-blue hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-cyber-green/50 rounded-full text-cyber-green text-sm font-medium bg-cyber-green/10">
            Advanced AI Threat Detection is Live
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Next-Gen <br className="hidden md:block"/>
            <span className="transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
              Cybersecurity Platform
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Protect your institutional data with real-time threat monitoring, advanced encryption, and proactive incident response powered by ML threat detection.
          </p>
          
          <div className="flex justify-center space-x-6">
            <Link to="/register" className="group flex items-center px-8 py-4 bg-cyber-blue text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all">
              Start Monitoring
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-transparent border border-gray-600 text-white font-medium rounded-lg hover:border-cyber-purple hover:text-cyber-purple transition-all shadow-[0_0_15px_rgba(176,38,255,0.2)]">
              View Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards Grid (Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-32 relative">
           {/* Glow behind cards */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyber-blue/20 blur-[120px] -z-10 rounded-full"></div>

           {[
             { title: "Real-Time Threats", icon: <Activity className="w-8 h-8 text-cyber-blue mb-4"/>, desc: "Monitor network anomalies and brute force attempts instantly with AI-driven log analysis." },
             { title: "Zero Trust Auth", icon: <Lock className="w-8 h-8 text-cyber-purple mb-4"/>, desc: "Role-based rigorous authentication schemas, complete with hardware 2FA workflows." },
             { title: "Phishing Shield", icon: <Shield className="w-8 h-8 text-cyber-green mb-4"/>, desc: "Analyze suspicious emails, domains, and links with our specialized ML neural network." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.2 }}
               className="glass-panel p-8 text-left hover:border-cyber-blue/50 transition-colors"
             >
               {item.icon}
               <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
               <p className="text-gray-400 leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
