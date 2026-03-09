import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock authentication
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-bg relative p-4">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center mb-6 hover:scale-105 transition-transform">
            <Shield className="w-10 h-10 text-cyber-blue mr-3 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
            <h1 className="text-3xl font-bold tracking-wider neon-text-blue">NEXUS<span className="text-cyber-purple">SEC</span></h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Secure Access Portal</h2>
          <p className="text-gray-400 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        <div className="glass-panel p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border-cyber-blue/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                  placeholder="analyst@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-700 bg-black/50 text-cyber-blue focus:ring-cyber-blue" />
                Remember device
              </label>
              <a href="#" className="text-cyber-blue hover:text-white transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-black bg-cyber-blue hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] font-bold transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Authenticate
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an access token? <Link to="/register" className="text-cyber-purple hover:text-white transition-colors">Request Account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
