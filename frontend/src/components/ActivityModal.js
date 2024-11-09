import React, { useState } from 'react';
import { X } from 'lucide-react';

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
          {/* Rest of your modal JSX */}
          {/* ... (keep all the existing modal content) ... */}
        </div>
      </div>
    );
};

export default ActivityModal;