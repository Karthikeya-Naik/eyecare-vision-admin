import { Users, CalendarCheck, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/constants';

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingPayments: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all stats in parallel
        const [patientsRes, appointmentsRes, paymentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/patients/read.php`),
          fetch(`${API_BASE_URL}/appointments/read.php`),
          fetch(`${API_BASE_URL}/appointments/read.php?status=Booked`)
        ]);

        const patientsData = await patientsRes.json();
        const appointmentsData = await appointmentsRes.json();
        const paymentsData = await paymentsRes.json();

        const today = new Date().toISOString().split('T')[0];
        const todayApps = appointmentsData.data.filter(
          appt => appt.appointment_date === today
        ).length;

        setStats({
          totalPatients: patientsData.data.length,
          todayAppointments: todayApps,
          pendingPayments: paymentsData.data.length,
          revenue: appointmentsData.data.reduce(
            (sum, appt) => sum + (appt.payment_status === 'Paid' ? parseFloat(appt.amount) : 0),
            0
          )
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: CalendarCheck,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;