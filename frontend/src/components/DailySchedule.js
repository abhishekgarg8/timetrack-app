import React, { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import ActivityModal from './ActivityModal';

// Helper function to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      slots.push({
        timeString: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        activity: null,
        category: null,
        subCategory: null
      });
    }
  }
  return slots;
};

const DailySchedule = () => {
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const categoryColors = {
      'Work': 'bg-blue-100 border-blue-300',
      'Exercise': 'bg-green-100 border-green-300',
      'Sleep': 'bg-purple-100 border-purple-300',
      'Personal': 'bg-orange-100 border-orange-300'
    };
  
    // Rest of your DailySchedule component code
    // ... (keep all the existing DailySchedule logic and JSX)

    return (
      <div className="bg-white rounded-lg shadow">
        {/* Rest of your DailySchedule JSX */}
        {/* ... (keep all the existing JSX) ... */}
      </div>
    );
};

export default DailySchedule;