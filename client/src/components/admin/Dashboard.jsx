import React, { useState, useEffect } from 'react';
import EventRegistrationsManager from './EventRegistrationsManager';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('admissions');
  const [admissions, setAdmissions] = useState([]);
  const [events, setEvents] = useState([]);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [settings, setSettings] = useState({
    googleSheetsId: '',
    googleSheetsEnabled: false,
    emailNotificationsEnabled: true
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAdmission, setNewAdmission] = useState({
    admissionNumber: '',
    studentName: '',
    department: 'Computer Science',
    batch: '',
    rollNumber: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'Academic',
    status: 'upcoming'
  });

  // Fetch all admission numbers (changed to fetch all students)
  useEffect(() => {
    if (activeTab === 'admissions') {
      fetchAllAdmissions();
    }
  }, [activeTab]);

  // Fetch all events
  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents();
    }
  }, [activeTab]);

  // Fetch registered students
  useEffect(() => {
    if (activeTab === 'registrations') {
      fetchRegisteredStudents();
    }
  }, [activeTab]);

  // Fetch pending approvals
  useEffect(() => {
    if (activeTab === 'approvals') {
      fetchPendingApprovals();
    }
  }, [activeTab]);

  // Fetch all students
  useEffect(() => {
    if (activeTab === 'all-students') {
      fetchAllStudents();
    }
  }, [activeTab]);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admission/numbers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setAdmissions(data.data);
      } else {
        alert('Error fetching admission numbers');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all students from users collection (replaces admission numbers)
  const fetchAllAdmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/all-students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setAdmissions(data.users);
      } else {
        setAdmissions([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmission = async (e) => {
    e.preventDefault();

    if (!newAdmission.admissionNumber || !newAdmission.studentName || !newAdmission.batch) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Create a user record instead of just an admission number
      const response = await fetch('http://localhost:5000/api/admin/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newAdmission.studentName,
          admissionNumber: newAdmission.admissionNumber.toUpperCase(),
          phone: '',
          department: newAdmission.department,
          batch: newAdmission.batch,
          role: 'student',
          status: 'pending'
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Student added successfully and added to pending approvals');
        setNewAdmission({
          admissionNumber: '',
          studentName: '',
          department: 'Computer Science',
          batch: '',
          rollNumber: ''
        });
        setShowAddForm(false);
        fetchAllAdmissions();
      } else {
        alert(data.message || 'Error adding student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmission = async (id, admissionNumber, name) => {
    if (!window.confirm(`Delete student "${name}" (${admissionNumber})? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Student and all related records deleted successfully');
        fetchAllAdmissions();
      } else {
        alert('Error deleting student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  const filteredAdmissions = admissions.filter(admission =>
    admission.admissionNumber.includes(searchQuery.toUpperCase()) ||
    admission.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      } else {
        alert('Error fetching events');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.venue) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      const data = await response.json();

      if (data.success) {
        alert('Event added successfully');
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          venue: '',
          category: 'Academic',
          status: 'upcoming'
        });
        setShowAddEventForm(false);
        fetchEvents();
      } else {
        alert(data.message || 'Error adding event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Delete event "${title}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Event deleted successfully');
        fetchEvents();
      } else {
        alert(data.message || 'Error deleting event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  // Fetch registered students from Google Sheets
  const fetchRegisteredStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/registrations/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setRegisteredStudents(data.data);
      } else {
        setRegisteredStudents([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/pending-approvals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setPendingApprovals(data.users);
      } else {
        setPendingApprovals([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/all-students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setAllStudents(data.users);
      } else {
        setAllStudents([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStudent = async (userId) => {
    if (!window.confirm('Approve this student? They will receive credentials via email.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/approve-student/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        alert('Student approved! Credentials sent via email.');
        fetchPendingApprovals();
      } else {
        alert('Error approving student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  const handleRejectStudent = async (userId) => {
    if (!window.confirm('Reject this student? They will be notified via email.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/reject-student/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        alert('Student rejected.');
        fetchPendingApprovals();
      } else {
        alert('Error rejecting student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage admission numbers and student registrations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'admissions'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Manage Admissions
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'events'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'registrations'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Student Registrations
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'approvals'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Student Approvals
          </button>
          <button
            onClick={() => setActiveTab('all-students')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'all-students'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            All Students
          </button>
        </div>

        {/* Admissions Management Tab */}
        {activeTab === 'admissions' && (
          <div className="mt-8">
            {/* Add Button and Search */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by admission number, name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="ml-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                {showAddForm ? 'Cancel' : '+ Add Admission'}
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Admission Number</h2>
                <form onSubmit={handleAddAdmission}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Admission Number *</label>
                      <input
                        type="text"
                        required
                        value={newAdmission.admissionNumber}
                        onChange={(e) => setNewAdmission({...newAdmission, admissionNumber: e.target.value.toUpperCase()})}
                        placeholder="e.g., ADM2024011"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={newAdmission.studentName}
                        onChange={(e) => setNewAdmission({...newAdmission, studentName: e.target.value})}
                        placeholder="Full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                      <select
                        value={newAdmission.department}
                        onChange={(e) => setNewAdmission({...newAdmission, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Civil">Civil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Batch *</label>
                      <input
                        type="text"
                        required
                        value={newAdmission.batch}
                        onChange={(e) => setNewAdmission({...newAdmission, batch: e.target.value})}
                        placeholder="e.g., 2024-2028"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={newAdmission.rollNumber}
                        onChange={(e) => setNewAdmission({...newAdmission, rollNumber: e.target.value})}
                        placeholder="e.g., CS003"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-medium transition-colors`}
                    >
                      {loading ? 'Adding...' : 'Add Admission'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Admissions Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading && filteredAdmissions.length === 0 ? (
                <div className="p-8 text-center text-gray-600">Loading...</div>
              ) : filteredAdmissions.length === 0 ? (
                <div className="p-8 text-center text-gray-600">No admission numbers found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Admission #</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Batch</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmissions.map((admission) => (
                        <tr key={admission._id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{admission.admissionNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{admission.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{admission.department}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{admission.batch}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              admission.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : admission.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {admission.status ? admission.status.charAt(0).toUpperCase() + admission.status.slice(1) : 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => handleDeleteAdmission(admission._id, admission.admissionNumber, admission.name)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events Management Tab */}
        {activeTab === 'events' && (
          <div className="mt-8">
            {/* Add Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddEventForm(!showAddEventForm)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                {showAddEventForm ? 'Cancel' : '+ Add Event'}
              </button>
            </div>

            {/* Add Event Form */}
            {showAddEventForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Event</h2>
                <form onSubmit={handleAddEvent}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                      <input
                        type="text"
                        required
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        placeholder="e.g., Annual Tech Fest"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="Academic">Academic</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        required
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                      <input
                        type="time"
                        required
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
                      <input
                        type="text"
                        required
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        placeholder="e.g., Main Auditorium"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                      <select
                        value={newEvent.status}
                        onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="past">Past</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        required
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        placeholder="Event description..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Adding...' : 'Add Event'}
                  </button>
                </form>
              </div>
            )}

            {/* Events List */}
            {loading && <p className="text-center text-gray-600">Loading events...</p>}
            {!loading && events.length === 0 && (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">No events found</p>
              </div>
            )}
            {!loading && events.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                  <div key={event._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event._id, event.title)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                      <p><strong>🕐 Time:</strong> {event.time}</p>
                      <p><strong>📍 Venue:</strong> {event.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Student Registrations Tab */}
        {activeTab === 'registrations' && (
          <div className="mt-8">
            <EventRegistrationsManager />
          </div>
        )}

        {/* Student Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Student Registration Approvals</h2>
                <p className="text-sm text-gray-600 mt-2">Review and approve pending student registrations</p>
              </div>

              {loading && <p className="text-center text-gray-600 py-8">Loading pending approvals...</p>}
              
              {!loading && pendingApprovals.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-600">No pending approvals. All students have been reviewed!</p>
                </div>
              )}

              {!loading && pendingApprovals.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admission #</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingApprovals.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-mono">{student.admissionNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.batch}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
                          <td className="px-6 py-4 text-sm text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleApproveStudent(student._id)}
                                disabled={loading}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 text-xs font-medium transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectStudent(student._id)}
                                disabled={loading}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 text-xs font-medium transition"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Settings</h2>
            
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Google Sheets Integration</h3>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.googleSheetsEnabled}
                      onChange={(e) => setSettings({...settings, googleSheetsEnabled: e.target.checked})}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">Enable Google Sheets Auto-Save</span>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Google Sheet ID</label>
                  <input
                    type="text"
                    value={settings.googleSheetsId}
                    onChange={(e) => setSettings({...settings, googleSheetsId: e.target.value})}
                    placeholder="1abc2def3ghi4jkl5mno6pqr7stu8vwx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.emailNotificationsEnabled}
                      onChange={(e) => setSettings({...settings, emailNotificationsEnabled: e.target.checked})}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">Enable Email Notifications</span>
                  </label>
                </div>
              </div>

              <div className="border-t pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* All Students Tab */}
        {activeTab === 'all-students' && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Students</h2>
                <p className="text-sm text-gray-600 mt-2">View all registered students and their approval status</p>
              </div>

              {loading && <p className="text-center text-gray-600 py-8">Loading students...</p>}
              
              {!loading && allStudents.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-600">No students registered yet.</p>
                </div>
              )}

              {!loading && allStudents.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admission #</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allStudents.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-mono">{student.admissionNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{student.batch}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              student.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : student.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : student.status === 'deleted'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;