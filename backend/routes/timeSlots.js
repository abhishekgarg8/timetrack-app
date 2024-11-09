const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/timeslot');

// GET user's time slots for a specific date
router.get('/:date', async (req, res) => {
  try {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    const date = new Date(req.params.date);
    
    const timeSlots = await TimeSlot.find({
      userId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59))
      }
    }).sort({ timeString: 1 });

    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new time slot
router.post('/', async (req, res) => {
  try {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    const timeSlot = new TimeSlot({
      userId,
      ...req.body
    });

    const newTimeSlot = await timeSlot.save();
    res.status(201).json(newTimeSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a time slot
router.put('/:id', async (req, res) => {
  try {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    const timeSlot = await TimeSlot.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    res.json(timeSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a time slot
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    const timeSlot = await TimeSlot.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    res.json({ message: 'Time slot deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;