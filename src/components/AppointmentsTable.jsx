import { Calendar, Clock, User, Phone, Mail, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/constants';
import { formatDate, formatTime } from '../utils/helpers';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/appointments/read.php`);
        const data = await response.json();
        setAppointments(data.data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/update.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        setAppointments(appointments.map(appt => 
          appt.id === id ? { ...appt, status: newStatus } : appt
        ));
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading appointments...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{appointment.patient_name}</div>
                      <div className="text-sm text-gray-500">Age: {appointment.age}, {appointment.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-900">
                      {formatDate(appointment.appointment_date)}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">
                      {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    {appointment.phone}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    {appointment.email || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    appointment.status === 'Booked' ? 'bg-blue-100 text-blue-800' :
                    appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="dropdown relative">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                      <div className="py-1">
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Completed')}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;