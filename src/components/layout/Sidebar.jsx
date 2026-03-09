import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Activity, 
  Lock, 
  MailWarning, 
  FileWarning, 
  LayoutDashboard,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Threat Monitor', path: '/dashboard/threats', icon: Activity },
  { name: 'Phishing Detection', path: '/dashboard/phishing', icon: MailWarning },
  { name: 'Encryption Tools', path: '/dashboard/encryption', icon: Lock },
  { name: 'Incident Reports', path: '/dashboard/incidents', icon: FileWarning },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 glass-panel border-r border-cyber-blue/30 rounded-none flex flex-col h-full z-20 shadow-[2px_0_15px_rgba(0,243,255,0.1)]">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-800">
        <ShieldAlert className="w-8 h-8 text-cyber-blue mr-3 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
        <h1 className="text-xl font-bold tracking-wider neon-text-blue">NEXUS<span className="text-cyber-purple drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]">SEC</span></h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group
                ${isActive 
                  ? 'bg-cyber-blue/10 border-l-4 border-cyber-blue text-cyber-blue neon-text-blue' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-cyber-blue' : 'group-hover:text-cyber-blue'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-gray-800">
        <Link to="/" className="flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group">
          <LogOut className="w-5 h-5 mr-3 group-hover:drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
