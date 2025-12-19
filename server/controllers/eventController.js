import Event from '../models/Event.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const { category, status, featured, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      count: events.length,
      total,
      pages: Math.ceil(total / limit),
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
};

// Get single event
export const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate('registrations.userId', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message
    });
  }
};

// Create event (admin only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, category, speakers, capacity } = req.body;

    if (!title || !description || !date || !time || !venue || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      time,
      venue,
      category,
      speakers: speakers || [],
      capacity,
      organizer: req.user.name
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
};

// Update event (admin only)
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, venue, category, status, featured } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, time, venue, category, status, featured },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating event',
      error: error.message
    });
  }
};

// Delete event (admin only)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message
    });
  }
};

// Register for event
export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if already registered
    const isRegistered = event.registrations.some(
      reg => reg.userId.toString() === req.userId
    );

    if (isRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }

    // Check capacity
    if (event.capacity && event.registrations.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Add registration
    event.registrations.push({
      userId: req.userId,
      registeredAt: new Date()
    });

    await event.save();

    res.json({
      success: true,
      message: 'Registered for event successfully',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering for event',
      error: error.message
    });
  }
};

// Unregister from event
export const unregisterFromEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    event.registrations = event.registrations.filter(
      reg => reg.userId.toString() !== req.userId
    );

    await event.save();

    res.json({
      success: true,
      message: 'Unregistered from event',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error unregistering from event',
      error: error.message
    });
  }
};
