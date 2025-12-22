import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState("student"); // "student" or "admin"
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [adminLoginData, setAdminLoginData] = useState({ admissionNumber: "", password: "" });
  const [signupStep, setSignupStep] = useState(1); // 1: verify admission, 2: complete registration
  const [verifiedStudent, setVerifiedStudent] = useState(null);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    admissionNumber: "",
    phone: "",
    department: "",
    batch: "",
    role: "student"
  });
  const [verificationLoading, setVerificationLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/student-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setUser(data.user);
        setShowLoginModal(false);
        setLoginData({ email: "", password: "" });
        alert(`Welcome back, ${data.user.name}!`);
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server. Make sure backend is running on port 5000.");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminLoginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setUser(data.user);
        setShowLoginModal(false);
        setAdminLoginData({ admissionNumber: "", password: "" });
        alert(`Welcome Admin, ${data.user.name}!`);
        navigate('/admin');
      } else {
        alert(data.message || "Admin login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      alert("Error connecting to server. Make sure backend is running on port 5000.");
    }
  };

  const handleVerifyAdmissionNumber = async (e) => {
    e.preventDefault();
    setVerificationLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admission/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admissionNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setVerifiedStudent(data.data);
        setSignupData({
          ...signupData,
          admissionNumber: data.data.admissionNumber,
          name: data.data.studentName,
          department: data.data.department,
          batch: data.data.batch
        });
        setSignupStep(2);
      } else {
        alert(data.message || "Admission number not found. Please check and try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Error verifying admission number. Make sure backend is running.");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/student-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          admissionNumber: signupData.admissionNumber,
          phone: signupData.phone || "",
          department: signupData.department || "",
          batch: signupData.batch || ""
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Your account is pending admin approval. You'll receive an email once approved.");
        setShowSignupModal(false);
        setSignupData({ 
          name: "", 
          email: "", 
          admissionNumber: "",
          phone: "",
          department: "",
          batch: "",
          role: "student" 
        });
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error connecting to server. Make sure backend is running on port 5000.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setShowUserDropdown(false);
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/academics', label: 'Academics' },
    { path: '/research', label: 'Research' },
    { path: '/campus-life', label: 'Campus Life' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/events', label: 'Events' },
    { path: '/news', label: 'News' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div onClick={() => navigate('/')} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
                <img 
                  src="/logo.png" 
                  alt="University Logo" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Knowledge Nexus</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">University</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative font-medium transition-colors text-sm lg:text-base ${
                    isActiveLink(item.path) 
                      ? 'text-red-600 font-bold' 
                      : 'text-gray-800 hover:text-red-600'
                  }`}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
                  )}
                </button>
              ))}
              
              {/* User Area */}
              {user ? (
                <div className="flex items-center space-x-3 lg:space-x-4">
                  {/* User Profile with Dropdown */}
                  <div className="relative user-dropdown">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden lg:block text-left">
                        <div className="text-sm font-medium text-gray-900">{user.name.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                      </div>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-red-600 font-medium capitalize mt-1">{user.role}</div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            navigate('/profile');
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>View Profile</span>
                        </button>

                        {user.role === 'admin' && (
                          <button 
                            onClick={() => {
                              navigate('/admin');
                              setShowUserDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Admin Dashboard</span>
                          </button>
                        )}

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <button 
                    onClick={() => {
                      setLoginType("student");
                      setShowLoginModal(true);
                    }}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm lg:text-base"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/admissions')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 px-2 font-medium text-sm ${
                      isActiveLink(item.path) 
                        ? 'text-red-600 font-semibold bg-red-50 border-r-2 border-red-600' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="border-t border-gray-200 pt-3 mt-2">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-2">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => {
                            navigate('/profile');
                            setIsMenuOpen(false);
                          }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm"
                        >
                          Profile
                        </button>
                        {user.role === 'admin' && (
                          <button 
                            onClick={() => {
                              navigate('/admin');
                              setIsMenuOpen(false);
                            }}
                            className="bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded text-sm"
                          >
                            Admin
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="col-span-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => {
                          setLoginType("student");
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors"
                      >
                        Login
                      </button>
                      <button 
                        onClick={() => {
                          setShowSignupModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Unified Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Login to Account</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Login Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginType("student")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    loginType === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("admin")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    loginType === "admin"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Admin
                </button>
              </div>

              <form onSubmit={loginType === "student" ? handleLogin : handleAdminLogin}>
                <div className="space-y-4">
                  {loginType === "student" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your password"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                        <input
                          type="text"
                          required
                          value={adminLoginData.admissionNumber}
                          onChange={(e) => setAdminLoginData({...adminLoginData, admissionNumber: e.target.value.toUpperCase()})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your admission number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={adminLoginData.password}
                          onChange={(e) => setAdminLoginData({...adminLoginData, password: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your password"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-red-600 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    {loginType === "student" && (
                      <button type="button" className="text-sm text-red-600 hover:text-red-700">
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${
                      loginType === "student"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    } text-white py-3 rounded-lg font-semibold transition-colors`}
                  >
                    Sign In
                  </button>

                  {loginType === "student" && (
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowSignupModal(true);
                        }}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Signup/Application Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {signupStep === 1 ? 'Verify Admission' : 'Complete Registration'}
                </h3>
                <button
                  onClick={() => {
                    setShowSignupModal(false);
                    setSignupStep(1);
                    setVerifiedStudent(null);
                    setAdmissionNumber("");
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Step 1: Verify Admission Number */}
              {signupStep === 1 && (
                <form onSubmit={handleVerifyAdmissionNumber}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number *</label>
                      <input
                        type="text"
                        required
                        value={admissionNumber}
                        onChange={(e) => setAdmissionNumber(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your admission number"
                        disabled={verificationLoading}
                      />
                      <p className="text-xs text-gray-500 mt-1">Your admission number can be found in your admission letter</p>
                    </div>

                    <button
                      type="submit"
                      disabled={verificationLoading}
                      className={`w-full ${verificationLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white py-3 rounded-lg font-semibold transition-colors`}
                    >
                      {verificationLoading ? 'Verifying...' : 'Verify Admission'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setShowSignupModal(false);
                          setShowLoginModal(true);
                          setSignupStep(1);
                        }}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Complete Registration */}
              {signupStep === 2 && verifiedStudent && (
                <form onSubmit={handleSignup}>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-green-800">
                        <span className="font-semibold">✓ Verified:</span> {verifiedStudent.studentName}
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Admission: {verifiedStudent.admissionNumber} | Roll: {verifiedStudent.rollNumber}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">📧 Password:</span> A secure password will be auto-generated and sent to your email after admin approval.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={signupData.name}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={signupData.department}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                      <input
                        type="text"
                        value={signupData.batch}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch *</label>
                      <input
                        type="text"
                        required
                        value={signupData.batch}
                        onChange={(e) => setSignupData({...signupData, batch: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., 2024"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-red-600 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-600">
                        I agree to the{' '}
                        <button type="button" className="text-red-600 hover:text-red-700">
                          Terms & Conditions
                        </button>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Create Account
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSignupStep(1);
                        setVerifiedStudent(null);
                        setAdmissionNumber("");
                      }}
                      className="w-full text-gray-600 hover:text-gray-700 py-2 text-sm"
                    >
                      Back to Verify Admission
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;