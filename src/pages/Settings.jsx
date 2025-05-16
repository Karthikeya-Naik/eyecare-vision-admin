import { Settings, Clock, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import SlotManagement from '../components/SlotManagement';

const SettingsPage = () => {
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Settings className="h-6 w-6 mr-2" /> Clinic Settings
      </h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" /> Working Hours
          </h2>
          <p className="text-gray-600">
            Current working hours: 6:00 PM to 9:30 PM (30-minute slots)
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" /> Pricing
          </h2>
          <p className="text-gray-600">
            Standard eye checkup fee: ₹100 per appointment
          </p>
        </div>

        <SlotManagement />
      </div>
    </div>
  );
};

export default SettingsPage;