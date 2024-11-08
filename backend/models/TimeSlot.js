const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true
  },
  timeString: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
timeSlotSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);