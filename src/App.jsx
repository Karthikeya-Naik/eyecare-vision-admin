import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AppointmentsPage from './pages/Appointments';
import PatientsPage from './pages/Patients';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;