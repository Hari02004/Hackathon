import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Herosection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEventsCard, setShowEventsCard] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isLoggedIn = !!currentUser.name;


  const slides = [
    {
      image: "/campus-1.jpg",
      title: "Welcome to KNU",
      subtitle: "Knowledge Nexus University - Excellence in Engineering Education"
    },
    {
      image: "/campus-2.jpg", 
      title: "Innovative Learning",
      subtitle: "State-of-the-art facilities for tomorrow's engineers"
    },
    {
      image: "/campus-3.png",
      title: "Beautiful Campus",
      subtitle: "Inspiring environment for academic excellence"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
   <section className="relative h-[60vh] md:h-screen overflow-hidden">
  <div className="relative w-full h-full">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Image */}
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover scale-110 md:scale-100"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    ))}
  </div>

  {/* Welcome Content - Always Visible */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center text-white px-4">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6">
        {slides[currentSlide].title}
      </h1>
      <p className="text-sm md:text-lg lg:text-2xl mb-4 md:mb-8 max-w-xs md:max-w-3xl mx-auto">
        {slides[currentSlide].subtitle}
      </p>
 <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center">
  <button 
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold transition-colors w-fit"
    onClick={() => navigate('/admissions')}
  >
    Apply Now
  </button>
  <button 
    className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold backdrop-blur-sm transition-colors w-fit"
    onClick={() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }}
  >
    Explore Campus
  </button>
</div>

{/* Quick Action Buttons (Only for Logged-in Users) */}
{isLoggedIn && (
  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center items-center mt-4 md:mt-6">
    <button
      onClick={() => setShowProfileCard(!showProfileCard)}
      className="bg-blue-500/80 hover:bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 w-fit"
    >
      👤 View Profile
    </button>
    <button
      onClick={() => setShowEventsCard(!showEventsCard)}
      className="bg-purple-500/80 hover:bg-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 w-fit"
    >
      📅 Chapter Events
    </button>
    <button
      onClick={() => navigate('/alumni')}
      className="bg-green-500/80 hover:bg-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 w-fit"
    >
      🤝 Connect
    </button>
  </div>
)}

{/* Profile Quick Card Popup */}
{isLoggedIn && showProfileCard && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 animate-fade-in">
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
      <button
        onClick={() => setShowProfileCard(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
          {currentUser.name?.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{currentUser.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{currentUser.email}</p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Department:</span> {currentUser.department || 'N/A'}
        </p>
        <button
          onClick={() => {
            navigate('/profile');
            setShowProfileCard(false);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          View Full Profile
        </button>
      </div>
    </div>
  </div>
)}

{/* Chapter Events Popup */}
{isLoggedIn && showEventsCard && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-h-80 overflow-y-auto animate-fade-in">
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
      <button
        onClick={() => setShowEventsCard(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>
      <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Upcoming Events</h3>
      <div className="space-y-3">
        {/* Event 1 */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold text-gray-800 text-sm">Tech Fest 2024</p>
          <p className="text-xs text-gray-600">Mar 15, 2024 • 2:00 PM</p>
          <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600">
            Register
          </button>
        </div>
        
        {/* Event 2 */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
          <p className="font-semibold text-gray-800 text-sm">Alumni Meet & Greet</p>
          <p className="text-xs text-gray-600">Mar 20, 2024 • 4:00 PM</p>
          <button className="text-xs bg-purple-500 text-white px-2 py-1 rounded mt-2 hover:bg-purple-600">
            Register
          </button>
        </div>
        
        {/* Event 3 */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-3 rounded-lg border-l-4 border-green-500">
          <p className="font-semibold text-gray-800 text-sm">Annual Gala Dinner</p>
          <p className="text-xs text-gray-600">Mar 25, 2024 • 6:00 PM</p>
          <button className="text-xs bg-green-500 text-white px-2 py-1 rounded mt-2 hover:bg-green-600">
            Register
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/events');
          setShowEventsCard(false);
        }}
        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors"
      >
        View All Events
      </button>
    </div>
  </div>
)}
    </div>
  </div>

  {/* Slide Indicators */}
  <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
          index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
        }`}
      />
    ))}
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2">
    <div className="animate-bounce">
      <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</section>
  );
};

export default Herosection;