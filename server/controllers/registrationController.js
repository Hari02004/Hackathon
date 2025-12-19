import Registration from '../models/Registration.js';

export const getRegisteredStudents = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ registeredAt: -1 });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations.map(reg => ({
        id: reg._id,
        name: reg.name,
        email: reg.email,
        admissionNumber: reg.admissionNumber,
        phone: reg.phone,
        department: reg.department,
        batch: reg.batch,
        eventTitle: reg.eventTitle,
        eventDate: reg.eventDate,
        eventVenue: reg.eventVenue,
        eventCategory: reg.eventCategory,
        registeredDate: reg.registeredAt,
        status: reg.status
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registered students',
      error: error.message
    });
  }
};
