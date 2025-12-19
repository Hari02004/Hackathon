import React, { useState, useEffect } from 'react';

function EventRegistrationsManager() {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
    fetchEvents();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchQuery, filterEvent, filterStatus]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/event-registrations/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRegistrations(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/event-registrations/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    if (searchQuery) {
      filtered = filtered.filter(reg =>
        reg.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.participantEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.participantPhone.includes(searchQuery)
      );
    }

    if (filterEvent !== 'all') {
      filtered = filtered.filter(reg => reg.eventId._id === filterEvent);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(reg => reg.status === filterStatus);
    }

    setFilteredRegistrations(filtered);
  };

  const handleStatusChange = async (registration, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/event-registrations/admin/${registration._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          status: newStatus,
          sendEmail: true,
          participantEmail: registration.participantEmail,
          participantName: registration.participantName,
          eventName: registration.eventName
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(`Status updated to "${newStatus}" and email sent to ${registration.participantEmail}`);
        fetchRegistrations();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating registration:', error);
      alert('Error updating registration');
    }
  };

  const handleExportCSV = async (eventId) => {
    try {
      const url = eventId
        ? `http://localhost:5000/api/event-registrations/admin/export/${eventId}`
        : 'http://localhost:5000/api/event-registrations/admin/export/';

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const blob = await response.blob();
      const url_blob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url_blob;
      a.download = `event-registrations-${new Date().toLocaleDateString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url_blob);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      case 'attended':
        return 'bg-green-100 text-green-800';
      case 'no-show':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Event Registrations</h2>
        
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-gray-600">Total</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-gray-600">Registered</div>
              <div className="text-2xl md:text-3xl font-bold text-green-600">{stats.registered}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-gray-600">Attended</div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{stats.attended}</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-gray-600">No-Show</div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">{stats.noShow}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-gray-600">Cancelled</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-600">{stats.cancelled}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>{event.title}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="registered">Registered</option>
              <option value="attended">Attended</option>
              <option value="no-show">No-Show</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => handleExportCSV(filterEvent !== 'all' ? filterEvent : null)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
            >
              📥 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading registrations...</div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No registrations found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Reg #</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Participant</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Event</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Admission #</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700">{registration.registrationNumber}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{registration.participantName}</div>
                      <div className="text-xs text-gray-500">{registration.participantPhone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{registration.participantEmail}</td>
                    <td className="px-4 py-3 text-gray-700">{registration.eventId?.title || 'N/A'}</td>
                    <td className="px-4 py-3 text-gray-700">{registration.admissionNumber || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={registration.status}
                          onChange={(e) => handleStatusChange(registration, e.target.value)}
                          disabled={registration.status === 'attended'}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-none ${
                            registration.status === 'attended' 
                              ? 'bg-green-200 text-green-700 cursor-not-allowed opacity-75' 
                              : `${getStatusColor(registration.status)} cursor-pointer`
                          }`}
                        >
                          <option value="registered">Registered</option>
                          <option value="attended">Attended</option>
                          <option value="no-show">No-Show</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {registration.status === 'attended' && (
                          <span className="text-xs text-green-700 font-semibold whitespace-nowrap">✓ Locked</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          // Can add view details functionality here
                          console.log('View details for:', registration._id);
                        }}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Registrations Summary */}
      {stats && stats.byEvent.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Registrations by Event</h3>
          <div className="space-y-2">
            {stats.byEvent.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">{item._id}</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold text-sm">{item.count} registrations</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventRegistrationsManager;
