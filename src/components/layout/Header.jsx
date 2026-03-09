// Using lucide-react icons instead of react-router-dom which doesn't export these
import { Bell as BellIcon, Search as SearchIcon, UserCircle as UserIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 glass-panel border-b border-gray-800 rounded-none flex items-center justify-between px-8 z-20 relative">
      <div className="flex-1 flex items-center">
        <div className="relative w-96">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search threats, IP addresses, logs..." 
            className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-cyber-blue transition-colors">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>

        <div className="h-8 w-px bg-gray-700"></div>

        {/* Profile */}
        <div className="flex items-center cursor-pointer group">
          <div className="text-right mr-3">
            <p className="text-sm font-medium text-white group-hover:text-cyber-blue transition-colors">Admin User</p>
            <p className="text-xs text-cyber-green/70">Security Analyst</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-cyber-blue/50 flex items-center justify-center bg-cyber-blue/10 overflow-hidden">
             <UserIcon className="w-6 h-6 text-cyber-blue" />
          </div>
        </div>
      </div>
    </header>
  );
}
