import AppointmentsTable from '../components/AppointmentsTable';

const AppointmentsPage = () => {
  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
      </div>
      
      <AppointmentsTable />
    </div>
  );
};

export default AppointmentsPage;