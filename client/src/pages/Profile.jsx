import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const quotes = [
    "Education is the most powerful weapon which you can use to change the world.",
    "Your education is a dress rehearsal for a life that is yours to lead.",
    "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Knowledge is power. Information is liberating.",
    "The best time for new beginnings is now."
  ];

  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setEditData(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      
      // Only allow changing name and phone, not email or academic info
      const updateData = {
        name: editData.name,
        phone: editData.phone
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      if (data.success) {
        // Update local state with new data
        const updatedUser = {
          ...user,
          name: editData.name,
          phone: editData.phone
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setMessage('✓ Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-t-3xl p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-4xl sm:text-5xl font-bold text-red-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{user.name}</h1>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-6">
                <span className={`px-4 py-1 rounded-full font-semibold text-sm ${
                  isAdmin 
                    ? 'bg-purple-200 text-purple-800' 
                    : 'bg-blue-200 text-blue-800'
                }`}>
                  {isAdmin ? 'Admin' : 'Student'}
                </span>
                {user.status && (
                  <span className={`px-4 py-1 rounded-full font-semibold text-sm ${
                    user.status === 'approved'
                      ? 'bg-green-200 text-green-800'
                      : user.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                )}
              </div>

              {/* Inspirational Quote - Inside Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 shadow-lg">
                <p className="text-sm sm:text-base text-white font-serif italic mb-1">
                  💡 "{getRandomQuote()}"
                </p>
                <p className="text-xs sm:text-sm text-red-100 font-semibold">
                  — Keep Learning, Keep Growing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-3xl shadow-xl p-8 sm:p-12">
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Edit/Save Buttons */}
          <div className="flex justify-end gap-3 mb-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData(user);
                  }}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-600">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 font-semibold">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact administration if needed.</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{user.phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Admission Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admission Number</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono">{user.admissionNumber}</p>
                </div>
              </div>
            </section>

            {/* Academic Information (Student Only) */}
            {!isAdmin && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Academic Information
                </h2>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Academic information is set during registration and cannot be modified. 
                    Contact administration if you need to update this information.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">📚 Department</label>
                    <div className="px-4 py-3 bg-white rounded-lg border-2 border-blue-300 shadow-sm">
                      <p className="text-gray-900 font-bold text-lg">
                        {user.department && user.department.trim() ? user.department : 'CSE'}
                      </p>
                    </div>
                  </div>

                  {/* Batch/Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">📅 Batch/Year</label>
                    <div className="px-4 py-3 bg-white rounded-lg border-2 border-blue-300 shadow-sm">
                      <p className="text-gray-900 font-bold text-lg">
                        {user.batch && user.batch.trim() ? user.batch : '2022-2026'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Account Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-400">
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 capitalize font-semibold">{user.role}</p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                  <p className={`px-4 py-3 rounded-lg font-bold text-lg capitalize ${
                    user.status === 'approved' || user.isActive
                      ? 'bg-green-100 text-green-800 border-2 border-green-400'
                      : user.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400'
                      : 'bg-red-100 text-red-800 border-2 border-red-400'
                  }`}>
                    {user.status === 'approved' || user.isActive ? '✓ Active' : user.status || 'Active'}
                  </p>
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                {/* Last Login */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'First login'}
                  </p>
                </div>
              </div>
            </section>

            {/* Admin Specific Information */}
            {isAdmin && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-600">
                  Admin Privileges
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Can manage student approvals</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Can manage events and registrations</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Can create and manage news</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Full system access</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your profile information is used for event registrations and communication. 
            If you need to change your password, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
