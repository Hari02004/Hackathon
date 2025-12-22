import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [registrationData, setRegistrationData] = useState({
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    department: '',
    semester: '',
    year: '',
    admissionNumber: ''
  });
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // Fetch user's existing registrations
  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
          const user = JSON.parse(userStr);
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/event-registrations/user/${user.email}`);
          const data = await response.json();
          if (data.success) {
            setUserRegistrations(data.registrations || []);
          }
        }
      } catch (error) {
        console.error('Error fetching user registrations:', error);
      }
    };

    fetchUserRegistrations();
  }, []);

  // Auto-fill registration data when modal opens
  useEffect(() => {
    if (showRegistrationModal && selectedEvent) {
      // Get user data from localStorage or session
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setRegistrationData({
            participantName: user.name || '',
            participantEmail: user.email || '',
            participantPhone: user.phone || '',
            department: user.department || '',
            semester: user.batch || '',
            year: user.batch || '',
            admissionNumber: user.admissionNumber || ''
          });

          // Check if already registered for this event
          const alreadyRegistered = userRegistrations.some(reg => 
            reg.eventId === selectedEvent._id || reg.eventId?._id === selectedEvent._id
          );
          setIsAlreadyRegistered(alreadyRegistered);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, [showRegistrationModal, selectedEvent, userRegistrations]);

  useEffect(() => {
    setAnimate(true);
    
    // Fetch events from backend API
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/events`);
        const data = await response.json();
        if (data.success && data.events) {
          const eventsWithStatus = data.events.map(event => ({
            ...event,
            status: event.status || 'upcoming'
          }));
          setEvents(eventsWithStatus);
          setFilteredEvents(eventsWithStatus.filter(event => event.status === 'upcoming'));
        } else {
          const eventsWithStatus = (data.events || []).map(event => ({
            ...event,
            status: event.status || 'upcoming'
          }));
          setEvents(eventsWithStatus);
          setFilteredEvents(eventsWithStatus.filter(event => event.status === 'upcoming'));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to sample data if API fails
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents.filter(event => event.status === 'upcoming'));
      }
    };

    // Fetch categories from sample data
    const fetchCategories = () => {
      // Use categories from sample data since backend doesn't have a categories endpoint
      setCategories([
        { id: 0, name: 'All', count: events.length },
        { id: 1, name: 'Technical', count: 2 },
        { id: 2, name: 'Academic', count: 2 },
        { id: 3, name: 'Cultural', count: 1 },
        { id: 4, name: 'Sports', count: 1 },
        { id: 5, name: 'Workshop', count: 1 },
        { id: 6, name: 'Entrepreneurship', count: 1 },
        { id: 7, name: 'Career', count: 1 }
      ]);
    };

    fetchEvents();
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredEvents(events.filter(event => event.status === activeTab));
    } else {
      setFilteredEvents(
        events.filter(
          event => event.category === activeCategory && event.status === activeTab
        )
      );
    }
  }, [activeCategory, activeTab, events]);

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Fallback sample data
  const sampleEvents = [
    {
      id: 1,
      title: "Annual Tech Fest 2024",
      description: "The biggest technological extravaganza featuring cutting-edge innovations, tech talks, workshops, and competitions.",
      date: "2024-03-15",
      time: "9:00 AM - 9:00 PM",
      venue: "University Main Auditorium",
      category: "Technical",
      image: "tech-fest.jpg",
      status: "upcoming",
      featured: true,
      speakers: ["Dr. Sarah Chen", "Rajesh Kumar"]
    },
    {
      id: 2,
      title: "International Conference on Sustainable Development",
      description: "Global gathering of environmental scientists discussing sustainable solutions for climate change.",
      date: "2024-03-22",
      time: "10:00 AM - 5:00 PM",
      venue: "Green Auditorium",
      category: "Academic",
      image: "sustainable-conference.jpg",
      status: "upcoming",
      featured: true,
      speakers: ["Prof. David Wilson", "Dr. Priya Sharma"]
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Entrepreneurs pitch ideas to investors. Prizes worth ₹10 lakhs.",
      date: "2024-03-28",
      time: "2:00 PM - 7:00 PM",
      venue: "Innovation Hub",
      category: "Entrepreneurship",
      image: "startup-pitch.jpg",
      status: "upcoming",
      featured: false
    },
    {
      id: 4,
      title: "Cultural Night 2024",
      description: "Celebration of cultural diversity through music and dance performances.",
      date: "2024-04-05",
      time: "6:00 PM - 11:00 PM",
      venue: "Open Air Amphitheater",
      category: "Cultural",
      image: "cultural-night.jpg",
      status: "upcoming",
      featured: false
    },
    {
      id: 5,
      title: "Career Fair 2024",
      description: "Connect with top companies for internships and placements.",
      date: "2024-04-12",
      time: "9:00 AM - 6:00 PM",
      venue: "University Sports Complex",
      category: "Career",
      image: "career-fair.jpg",
      status: "upcoming",
      featured: true
    },
    {
      id: 6,
      title: "Sports Week 2024",
      description: "Inter-department sports competition with various games.",
      date: "2024-04-20",
      time: "8:00 AM - 8:00 PM",
      venue: "University Stadium",
      category: "Sports",
      image: "sports-week.jpg",
      status: "upcoming",
      featured: false
    },
    {
      id: 7,
      title: "AI & ML Workshop Series",
      description: "Hands-on workshop covering machine learning and AI applications.",
      date: "2024-03-10",
      time: "3:00 PM - 6:00 PM",
      venue: "Computer Lab 302",
      category: "Workshop",
      image: "ai-workshop.jpg",
      status: "ongoing",
      featured: true
    },
    {
      id: 8,
      title: "Research Symposium 2023",
      description: "Showcasing groundbreaking research from students and faculty.",
      date: "2023-11-15",
      time: "10:00 AM - 4:00 PM",
      venue: "Research Center Auditorium",
      category: "Academic",
      image: "research-symposium.jpg",
      status: "past",
      featured: true
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-serif">Loading Events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: 'float',
                animationDuration: `${3 + Math.random() * 4}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-20 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-serif animate-slide-down">
            University Events
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0 animate-slide-up">
            Where Ideas Meet Opportunities - Experience the Vibrant Campus Life
          </p>
          <div className={`w-24 sm:w-32 h-1 bg-white mx-auto mb-8 sm:mb-12 transition-all duration-1000 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20">
        {/* Event Tabs - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {['upcoming', 'ongoing', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="hidden sm:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)} Events</span>
              <span className="sm:hidden">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {events.filter(e => e.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Categories Filter - Mobile Responsive */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center font-serif px-2">
            Event Categories
          </h3>
          
          {/* Scrollable categories for mobile */}
          <div className="overflow-x-auto pb-2 sm:pb-0 -mx-3 sm:mx-0">
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 px-3 sm:px-0 min-w-max sm:min-w-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    activeCategory === category.name
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 sm:ml-2 text-xs opacity-80">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Events Banner - Mobile Responsive */}
        {activeTab === 'upcoming' && events.filter(e => e.featured && e.status === 'upcoming').length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif px-2 sm:px-0">
              Featured Events
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {events
                .filter(event => event.featured && event.status === 'upcoming')
                .slice(0, 2)
                .map((event) => (
                  <div
                    key={event.id}
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-90"></div>
                    
                    <div className="relative z-10 p-4 sm:p-6 md:p-8 text-white">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm font-semibold">
                          Featured
                        </span>
                        <span className="text-base sm:text-lg">🔥</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 font-serif">
                        {event.title}
                      </h3>
                      
                      <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-sm">📅</span>
                          <span className="text-sm sm:text-base">{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm">⏰</span>
                          <span className="text-sm sm:text-base">{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4 sm:mb-6">
                        <span className="mr-2 text-sm">📍</span>
                        <span className="font-medium text-sm sm:text-base">{event.venue}</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegistrationModal(true);
                          setRegistrationMessage('');
                        }}
                        disabled={userRegistrations.some(reg => 
                          reg.eventId === event._id || reg.eventId?._id === event._id
                        )}
                        className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                          userRegistrations.some(reg => 
                            reg.eventId === event._id || reg.eventId?._id === event._id
                          )
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-60'
                            : 'bg-white text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        {userRegistrations.some(reg => 
                          reg.eventId === event._id || reg.eventId?._id === event._id
                        ) ? '✓ Already Registered' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Events Grid - Mobile Responsive */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center font-serif px-2 sm:px-0">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events
            <span className="ml-2 text-red-600">({filteredEvents.length})</span>
          </h3>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-red-500">📅</div>
              <h4 className="text-lg sm:text-2xl font-bold text-gray-700 mb-2">
                No {activeTab} events found
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Check back soon for upcoming events!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  {/* Event Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl opacity-20">
                      {event.category === 'Technical' ? '💻' : 
                       event.category === 'Academic' ? '📚' :
                       event.category === 'Cultural' ? '🎭' :
                       event.category === 'Sports' ? '⚽' :
                       event.category === 'Workshop' ? '🔧' :
                       event.category === 'Entrepreneurship' ? '🚀' : '🎓'}
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        event.status === 'upcoming'
                          ? 'bg-red-100 text-red-800'
                          : event.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-red-800">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 font-serif line-clamp-2">
                        {event.title}
                      </h4>
                      {event.featured && (
                        <span className="text-yellow-500 text-base sm:text-lg shrink-0 ml-2">⭐</span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                      {event.description}
                    </p>
                    
                    {/* Event Details */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center text-gray-700">
                        <span className="mr-2 sm:mr-3 text-red-600 text-sm sm:text-base">📅</span>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{event.date}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{event.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <span className="mr-2 sm:mr-3 text-red-600 text-sm sm:text-base">📍</span>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{event.venue}</div>
                        </div>
                      </div>
                      
                      {event.speakers && event.speakers.length > 0 && (
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2 sm:mr-3 text-red-600 text-sm sm:text-base">🎤</span>
                          <div>
                            <div className="font-medium text-sm sm:text-base">Speakers</div>
                            <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                              {event.speakers.slice(0, 2).join(', ')}
                              {event.speakers.length > 2 && '...'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                      <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base">
                        View Details
                      </button>
                      {event.status === 'upcoming' && (
                        <button 
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowRegistrationModal(true);
                            setRegistrationMessage('');
                          }}
                          disabled={userRegistrations.some(reg => 
                            reg.eventId === event._id || reg.eventId?._id === event._id
                          )}
                          className={`w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                            userRegistrations.some(reg => 
                              reg.eventId === event._id || reg.eventId?._id === event._id
                            )
                              ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-60 border-2 border-gray-400'
                              : 'border-2 border-red-600 text-red-600 hover:bg-red-50'
                          }`}
                        >
                          {userRegistrations.some(reg => 
                            reg.eventId === event._id || reg.eventId?._id === event._id
                          ) ? '✓ Registered' : 'Register'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Calendar Section - Fully Mobile Responsive */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center font-serif px-2 sm:px-0">
            Event Calendar
          </h3>
          
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 overflow-x-auto">
            {/* Mobile: Simplified calendar view */}
            <div className="block sm:hidden">
              <div className="grid grid-cols-7 gap-1 text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={`day-${idx}`} className="font-bold text-gray-700 text-xs">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 35 }).map((_, index) => {
                  const day = index + 1;
                  const hasEvent = events.some(event => {
                    const eventDay = parseInt(event.date.split('-')[2]);
                    return eventDay === day;
                  });
                  
                  return (
                    <div
                      key={index}
                      className={`p-1.5 rounded text-xs ${
                        hasEvent
                          ? 'bg-red-100 text-red-800 font-semibold'
                          : day <= 31
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                    >
                      {day <= 31 ? day : ''}
                      {hasEvent && (
                        <div className="w-1 h-1 bg-red-500 rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Desktop: Full calendar view */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="font-bold text-gray-700 text-sm sm:text-base">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 35 }).map((_, index) => {
                  const day = index + 1;
                  const hasEvent = events.some(event => {
                    const eventDay = parseInt(event.date.split('-')[2]);
                    return eventDay === day;
                  });
                  
                  return (
                    <div
                      key={index}
                      className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                        hasEvent
                          ? 'bg-red-100 text-red-800 font-semibold'
                          : day <= 31
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                    >
                      {day <= 31 ? day : ''}
                      {hasEvent && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mx-auto mt-1 sm:mt-1.5"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button 
                onClick={() => setShowFullCalendar(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
                View Full Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action - Mobile Responsive */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-serif text-center">
              Organize Your Event
            </h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-8 max-w-2xl mx-auto opacity-90 text-center px-2">
              Want to host an event at Knowledge Nexus University? Submit your proposal and get support from our events team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-white text-red-600 hover:bg-gray-100 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Submit Event Proposal
              </button>
              <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base">
                Contact Events Team
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup - Mobile Responsive */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
            Stay Updated with Events
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base px-2">
            Subscribe to our newsletter and never miss an important event or update.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Event Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full my-4 sm:my-8 shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedEvent.title}</h2>
                <p className="text-red-100 text-xs sm:text-sm mt-1">Register for this event</p>
              </div>
              <button 
                onClick={() => setShowRegistrationModal(false)}
                className="text-2xl hover:opacity-70 transition shrink-0 ml-4"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8 max-h-[70vh] overflow-y-auto">
              {isAlreadyRegistered && (
                <div className="mb-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base bg-yellow-100 text-yellow-800">
                  ✓ You are already registered for this event. Your registration is pending admin approval.
                </div>
              )}
              
              {registrationMessage && (
                <div className={`mb-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                  registrationMessage.includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {registrationMessage}
                </div>
              )}

              {/* Event Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">📅 Date:</span>
                    <p className="font-semibold">{selectedEvent.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">⏰ Time:</span>
                    <p className="font-semibold">{selectedEvent.time}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">📍 Venue:</span>
                    <p className="font-semibold">{selectedEvent.venue}</p>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-800">ℹ️ Your information is automatically filled from your profile</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={registrationData.participantName}
                    onChange={(e) => setRegistrationData({...registrationData, participantName: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base bg-gray-50"
                    placeholder="Your full name"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Email *</label>
                  <input
                    type="email"
                    value={registrationData.participantEmail}
                    onChange={(e) => setRegistrationData({...registrationData, participantEmail: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base bg-gray-50"
                    placeholder="your.email@example.com"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={registrationData.participantPhone}
                    onChange={(e) => setRegistrationData({...registrationData, participantPhone: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base bg-white hover:border-red-300 transition"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={registrationData.department}
                      onChange={(e) => setRegistrationData({...registrationData, department: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm bg-gray-50"
                      placeholder="e.g., CSE"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Year</label>
                    <select
                      value={registrationData.year}
                      onChange={(e) => setRegistrationData({...registrationData, year: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm bg-white cursor-pointer hover:border-red-300 transition"
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Semester</label>
                    <input
                      type="text"
                      value={registrationData.semester}
                      onChange={(e) => setRegistrationData({...registrationData, semester: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Admission #</label>
                    <input
                      type="text"
                      value={registrationData.admissionNumber}
                      onChange={(e) => setRegistrationData({...registrationData, admissionNumber: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
                      placeholder="ADM-2024-001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl sm:rounded-b-3xl flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-4">
              <button 
                onClick={() => setShowRegistrationModal(false)}
                disabled={registrationLoading}
                className="px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition text-sm sm:text-base disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  // Validation
                  if (!registrationData.participantName) {
                    setRegistrationMessage('❌ Name is required');
                    return;
                  }
                  if (!registrationData.participantEmail) {
                    setRegistrationMessage('❌ Email is required');
                    return;
                  }
                  if (!registrationData.participantPhone) {
                    setRegistrationMessage('❌ Phone is required');
                    return;
                  }

                  setRegistrationLoading(true);
                  setRegistrationMessage('⏳ Registering you for the event...');
                  
                  try {
                    const eventIdToUse = selectedEvent._id || selectedEvent.id;
                    
                    if (!eventIdToUse) {
                      setRegistrationMessage('❌ Event ID is missing. Please refresh the page and try again.');
                      setRegistrationLoading(false);
                      return;
                    }

                    const payload = {
                      eventId: eventIdToUse,
                      participantName: registrationData.participantName.trim(),
                      participantEmail: registrationData.participantEmail.trim().toLowerCase(),
                      participantPhone: registrationData.participantPhone.trim(),
                      department: registrationData.department.trim() || '',
                      semester: registrationData.semester.trim() || '',
                      year: registrationData.year.trim() || '',
                      admissionNumber: registrationData.admissionNumber.trim() || ''
                    };

                    console.log('📤 Sending registration payload:', JSON.stringify(payload, null, 2));

                    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/event-registrations/register`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(payload)
                    });

                    console.log('Response Status:', response.status);
                    console.log('Response Headers:', response.headers);

                    const data = await response.json();
                    console.log('📥 Server Response:', JSON.stringify(data, null, 2));

                    if (response.ok && data.success) {
                      setRegistrationMessage('✅ Successfully registered! Check your email for confirmation details.');
                      if (data.data) {
                        setUserRegistrations([...userRegistrations, data.data]);
                      }
                      setIsAlreadyRegistered(true);
                      
                      setTimeout(() => {
                        setShowRegistrationModal(false);
                        setRegistrationData({
                          participantName: '',
                          participantEmail: '',
                          participantPhone: '',
                          department: '',
                          semester: '',
                          year: '',
                          admissionNumber: ''
                        });
                        setRegistrationMessage('');
                      }, 2500);
                    } else {
                      setRegistrationMessage(`❌ ${data.message || 'Registration failed. Please try again.'}`);
                    }
                  } catch (error) {
                    console.error('❌ Registration Error:', error);
                    if (error.message.includes('Failed to fetch')) {
                      setRegistrationMessage('❌ Cannot connect to server. Make sure the backend is running at http://localhost:5000');
                    } else {
                      setRegistrationMessage(`❌ Error: ${error.message}`);
                    }
                  } finally {
                    setRegistrationLoading(false);
                  }
                }}
                disabled={registrationLoading || isAlreadyRegistered}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base transform hover:scale-105 ${
                  isAlreadyRegistered
                    ? 'bg-green-500 text-white cursor-not-allowed opacity-75'
                    : registrationLoading
                    ? 'bg-yellow-500 text-white cursor-wait'
                    : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
                }`}
              >
                {registrationLoading ? '⏳ Registering...' : isAlreadyRegistered ? '✅ Registered' : '📝 Register Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Calendar Modal */}
      {showFullCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-red-600 text-white p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Event Calendar</h2>
              <button 
                onClick={() => setShowFullCalendar(false)}
                className="text-2xl font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            {/* Calendar Content */}
            <div className="p-4 sm:p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={previousMonth}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
                >
                  ← Previous
                </button>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                </div>
                <button 
                  onClick={nextMonth}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
                >
                  Next →
                </button>
              </div>

              {/* Today Button */}
              <div className="text-center mb-6">
                <button 
                  onClick={goToToday}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Go to Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-bold text-gray-700 py-2 bg-gray-100 rounded">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {Array.from({ length: getFirstDayOfMonth(currentMonth) + getDaysInMonth(currentMonth) }).map((_, index) => {
                  const day = index - getFirstDayOfMonth(currentMonth) + 1;
                  const isCurrentMonth = day > 0 && day <= getDaysInMonth(currentMonth);
                  const dayEvents = isCurrentMonth ? getEventsForDay(day) : [];
                  const isToday = isCurrentMonth && 
                    day === new Date().getDate() && 
                    currentMonth.getMonth() === new Date().getMonth() &&
                    currentMonth.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-2 rounded-lg border-2 ${
                        isCurrentMonth
                          ? isToday 
                            ? 'bg-red-100 border-red-600'
                            : dayEvents.length > 0
                            ? 'bg-blue-50 border-blue-400'
                            : 'bg-white border-gray-300 hover:border-gray-400'
                          : 'bg-gray-50 border-gray-200'
                      } transition`}
                    >
                      {isCurrentMonth && (
                        <>
                          <div className={`font-bold text-sm mb-1 ${isToday ? 'text-red-600' : 'text-gray-700'}`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={idx}
                                className="text-xs bg-red-500 text-white p-1 rounded truncate cursor-pointer hover:bg-red-600 transition"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-600 font-semibold">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Events List for Current Month */}
              <div className="mt-8 pt-6 border-t-2">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Events in {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                {events.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.getMonth() === currentMonth.getMonth() &&
                         eventDate.getFullYear() === currentMonth.getFullYear();
                }).length === 0 ? (
                  <p className="text-gray-600">No events scheduled for this month.</p>
                ) : (
                  <div className="space-y-3">
                    {events
                      .filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getMonth() === currentMonth.getMonth() &&
                               eventDate.getFullYear() === currentMonth.getFullYear();
                      })
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((event, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-600">
                          <h4 className="font-bold text-gray-800">{event.title}</h4>
                          <p className="text-sm text-gray-600">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-gray-600">📍 {event.venue}</p>
                          <p className="text-sm text-gray-600">🏷️ {event.category}</p>
                          <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;