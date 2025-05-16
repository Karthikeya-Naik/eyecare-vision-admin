import { Home, Calendar, Users, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Patients', icon: Users, path: '/patients' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center mb-8 p-2">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Calendar className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">EyeCare Vision</h1>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;