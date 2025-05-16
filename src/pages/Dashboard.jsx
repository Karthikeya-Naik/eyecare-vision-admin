import DashboardCards from '../components/DashboardCards';
import AppointmentsTable from '../components/AppointmentsTable';

const Dashboard = () => {
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="space-y-6">
        <DashboardCards />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Appointments</h2>
          <AppointmentsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;