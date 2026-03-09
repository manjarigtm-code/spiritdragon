import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-cyber-bg text-white">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 relative z-10">
          <Outlet />
        </main>

        {/* Cyber grid background effect */}
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>
      </div>
    </div>
  );
}
