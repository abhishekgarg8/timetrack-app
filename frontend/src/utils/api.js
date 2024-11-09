// Base API configuration and helpers
const API_URL = process.env.REACT_APP_API_URL;

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('timetrack_token');
  return token ? `Bearer ${token}` : '';
};

// Generic API call function with authentication
const apiCall = async (endpoint, options = {}) => {
  try {
    // Add auth header to every request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader(),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle unauthenticated responses
    if (response.status === 401) {
      localStorage.removeItem('timetrack_token');
      window.location.href = '/login';
      return null;
    }

    // Handle other error responses
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Specific API functions for different operations
export const timeSlotApi = {
  // Get all time slots for a specific date
  getTimeSlots: (date) => 
    apiCall(`/api/timeslots/${date}`),

  // Create a new time slot
  createTimeSlot: (data) => 
    apiCall('/api/timeslots', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update a time slot
  updateTimeSlot: (id, data) => 
    apiCall(`/api/timeslots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete a time slot
  deleteTimeSlot: (id) => 
    apiCall(`/api/timeslots/${id}`, {
      method: 'DELETE',
    }),
};

// User-related API calls
export const userApi = {
  // Get current user profile
  getCurrentUser: () => 
    apiCall('/auth/current-user'),
};