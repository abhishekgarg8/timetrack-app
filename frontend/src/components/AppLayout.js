import React, { useState } from 'react';
import { BarChart, Calendar, Plus, Edit2, X } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

// Activity Modal Component
const ActivityModal = ({ slot, onClose, onSave }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [isNewSubCategory, setIsNewSubCategory] = useState(false);
    const [newSubCategory, setNewSubCategory] = useState('');
  
    const categories = {
      'Work': ['Meetings', 'Coding', 'Emails', 'Planning'],
      'Exercise': ['Gym', 'Running', 'Yoga', 'Sports'],
      'Sleep': ['Night Sleep', 'Nap'],
      'Personal': ['Family Time', 'Reading', 'Entertainment', 'Errands']
    };
  
    const handleSave = () => {
      const finalSubCategory = isNewSubCategory ? newSubCategory : selectedSubCategory;
      onSave({
        category: selectedCategory,
        subCategory: finalSubCategory
      });
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Add Activity
              <div className="text-sm font-normal text-gray-500 mt-1">
                {slot.timeString}
              </div>
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubCategory('');
                setIsNewSubCategory(false);
              }}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
  
          {selectedCategory && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Category *
              </label>
              {!isNewSubCategory ? (
                <div className="space-y-2">
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Sub-Category</option>
                    {categories[selectedCategory].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsNewSubCategory(true)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    + Add New Sub-Category
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    placeholder="Enter new sub-category"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setIsNewSubCategory(false)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
  
          <div className="flex justify-end space-x-2 mt-6">
            <button 
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              onClick={handleSave}
              disabled={!selectedCategory || (!selectedSubCategory && !newSubCategory)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

// Daily Schedule Component
const DailySchedule = () => {
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const categoryColors = {
      'Work': 'bg-blue-100 border-blue-300',
      'Exercise': 'bg-green-100 border-green-300',
      'Sleep': 'bg-purple-100 border-purple-300',
      'Personal': 'bg-orange-100 border-orange-300'
    };
  
    const handleSaveActivity = (activity) => {
      setTimeSlots(slots => 
        slots.map(slot => 
          slot.timeString === selectedSlot.timeString
            ? { 
                ...slot, 
                activity: activity.category,
                category: activity.category,
                subCategory: activity.subCategory
              }
            : slot
        )
      );
      setSelectedSlot(null);
    };
  
    const getSlotContent = (slot) => {
      if (!slot.activity) {
        return (
          <button 
            className="flex items-center justify-center w-full h-full text-gray-400 hover:text-gray-600"
            onClick={() => setSelectedSlot(slot)}
          >
            <Plus className="w-4 h-4" />
            <span className="ml-1 text-sm">Add Activity</span>
          </button>
        );
      }
  
      return (
        <div 
          className={`flex items-center justify-between w-full h-full px-3 ${categoryColors[slot.category]}`}
          onClick={() => setSelectedSlot(slot)}
        >
          <div>
            <span className="text-sm font-medium">{slot.category}</span>
            <span className="text-sm text-gray-500 ml-2">• {slot.subCategory}</span>
          </div>
          <Edit2 className="w-4 h-4 text-gray-500" />
        </div>
      );
    };
  
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Daily Schedule
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
                Next
              </button>
            </div>
          </div>
        </div>
  
        <div className="divide-y">
          {timeSlots.map((slot) => (
            <div 
              key={slot.timeString}
              className="flex items-center h-12 hover:bg-gray-50"
            >
              <div className="w-20 px-4 py-2 text-sm text-gray-500 font-medium">
                {slot.timeString}
              </div>
              
              <div className="flex-1 px-2 py-1">
                {getSlotContent(slot)}
              </div>
            </div>
          ))}
        </div>
  
        {selectedSlot && (
          <ActivityModal 
            slot={selectedSlot}
            onClose={() => setSelectedSlot(null)}
            onSave={handleSaveActivity}
          />
        )}
      </div>
    );
  };

  // Main AppLayout Component
const AppLayout = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('dashboard');
    
    const dummyStats = [
      { activity: 'Sleep', hours: 8.5 },
      { activity: 'Work', hours: 5.1 },
      { activity: 'Play', hours: 2.3 },
      { activity: 'Other', hours: 2.0 }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <span className="text-xl font-semibold">TimeTrack</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setView('dashboard')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    view === 'dashboard' ? 'bg-gray-100' : ''
                  }`}
                >
                  <BarChart className="w-5 h-5" />
                  <span className="ml-2">Dashboard</span>
                </button>
                <button
                  onClick={() => setView('daily')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    view === 'daily' ? 'bg-gray-100' : ''
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="ml-2">Daily View</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {view === 'dashboard' ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Your Time Chart</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={dummyStats}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 12]} />
                      <YAxis type="category" dataKey="activity" width={80} />
                      <Tooltip />
                      <Bar 
                        dataKey="hours" 
                        fill="#4F46E5"
                        radius={[0, 4, 4, 0]}
                        label={{ position: 'right', fill: '#666666' }}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <DailySchedule />
          )}
        </main>
      </div>
    );
  };
  
  export default AppLayout;
  