import { Clock, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/constants';

const SlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/slots/read.php`);
        const data = await response.json();
        setSlots(data.data || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const toggleSlot = async (id, isActive) => {
    try {
      const response = await fetch(`${API_BASE_URL}/slots/update.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, is_active: isActive ? 0 : 1 })
      });

      const data = await response.json();
      if (data.success) {
        setSlots(slots.map(slot => 
          slot.id === id ? { ...slot, is_active: isActive ? 0 : 1 } : slot
        ));
      }
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading slots...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Time Slots</h3>
      
      <div className="space-y-4">
        {slots.map((slot) => (
          <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium">
                {slot.start_time} - {slot.end_time}
              </span>
            </div>
            <button
              onClick={() => toggleSlot(slot.id, slot.is_active)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                slot.is_active ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  slot.is_active ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotManagement;