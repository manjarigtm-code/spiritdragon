import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './dashboard/DashboardHome';
import ThreatMonitor from './dashboard/ThreatMonitor';
import PhishingTool from './dashboard/PhishingTool';
import EncryptionTool from './dashboard/EncryptionTool';
import IncidentReport from './dashboard/IncidentReport';

function App() {
  // Mock auth state for layout testing
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="threats" element={<ThreatMonitor />} />
          <Route path="phishing" element={<PhishingTool />} />
          <Route path="encryption" element={<EncryptionTool />} />
          <Route path="incidents" element={<IncidentReport />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
