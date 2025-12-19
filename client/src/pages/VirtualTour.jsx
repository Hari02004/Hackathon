import React, { useState, useEffect } from 'react';

const VirtualTour = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMap, setShowMap] = useState(false);

  // Auto-rotate through locations
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveLocation(prev => (prev + 1) % tourLocations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const tourLocations = [
    {
      id: 0,
      name: "Main Entrance",
      icon: "🚪",
      description: "Welcome to Knowledge Nexus University - Where Innovation Begins",
      image: "/images/campus-1.jpg",
      details: "The grand entrance welcomes students with state-of-the-art architecture and vibrant campus atmosphere.",
      highlights: ["Modern Architecture", "Welcome Plaza", "Information Center", "Parking Facilities"],
      coordinates: { x: 25, y: 30 }
    },
    {
      id: 1,
      name: "Student Residences",
      icon: "🏠",
      description: "Modern dormitories with advanced facilities",
      image: "/images/campus-hostel.jpg",
      details: "5000+ capacity smart residences with Wi-Fi 6, gaming zones, study lounges, and 24/7 security.",
      highlights: ["Smart Rooms", "Gaming Zones", "Laundry Service", "Medical Facility"],
      coordinates: { x: 50, y: 20 }
    },
    {
      id: 2,
      name: "Sports Complex",
      icon: "⚽",
      description: "Olympic-standard athletic facilities",
      image: "/images/campus-sports.jpg",
      details: "Olympic-size swimming pool, synthetic track, tennis courts, and professional coaching facilities.",
      highlights: ["Olympic Pool", "Synthetic Track", "Gym Equipment", "Sports Clinic"],
      coordinates: { x: 75, y: 40 }
    },
    {
      id: 3,
      name: "Digital Library",
      icon: "📚",
      description: "Next-generation learning hub",
      image: "/images/campus-library.jpg",
      details: "1M+ digital resources, AI research tools, VR learning zone, and 24/7 access with biometric entry.",
      highlights: ["1M+ Resources", "AI Assistant", "VR Zone", "Research Labs"],
      coordinates: { x: 30, y: 60 }
    },
    {
      id: 4,
      name: "Research Labs",
      icon: "🔬",
      description: "Cutting-edge research facilities",
      image: "/images/research-1.jpg",
      details: "50+ research centers with AI, IoT, Blockchain, and Quantum Computing laboratories.",
      highlights: ["AI Labs", "IoT Center", "Blockchain Lab", "5G Testing"],
      coordinates: { x: 55, y: 70 }
    },
    {
      id: 5,
      name: "Performing Arts Center",
      icon: "🎭",
      description: "Creative expression hub",
      image: "/images/campus-cultural.jpg",
      details: "1000-seat digital auditorium, recording studios, theater workshops, and art galleries.",
      highlights: ["Auditorium", "Recording Studio", "Dance Studio", "Art Gallery"],
      coordinates: { x: 70, y: 55 }
    },
    {
      id: 6,
      name: "Dining Hall",
      icon: "🍽️",
      description: "Multi-cuisine dining facilities",
      image: "/images/campus-life-1.jpg",
      details: "World-class multi-cuisine dining with international chefs and dietary preferences catered.",
      highlights: ["Indian Cuisine", "International Food", "Vegan Options", "24/7 Café"],
      coordinates: { x: 40, y: 45 }
    },
    {
      id: 7,
      name: "Academic Blocks",
      icon: "🏫",
      description: "State-of-the-art classrooms",
      image: "/images/academics-1.jpg",
      details: "Smart classrooms with interactive displays, AI-powered teaching aids, and collaborative learning spaces.",
      highlights: ["Smart Classes", "Lecture Halls", "Lab Spaces", "Discussion Pods"],
      coordinates: { x: 50, y: 35 }
    }
  ];

  const currentLocation = tourLocations[activeLocation];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="pt-24 pb-8 px-4 text-center bg-gradient-to-r from-red-600 to-red-800">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-serif">
          🌐 Virtual Campus Tour
        </h1>
        <p className="text-white/90 text-lg">Explore Knowledge Nexus University from anywhere in the world</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Viewer */}
          <div className="lg:col-span-2">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={currentLocation.image}
                  alt={currentLocation.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Location Title */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{currentLocation.icon}</span>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">{currentLocation.name}</h2>
                      <p className="text-white/80 text-sm">{currentLocation.description}</p>
                    </div>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg">
                  <button
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                    className="w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded flex items-center justify-center transition-all"
                    title="Zoom In"
                  >
                    🔍+
                  </button>
                  <button
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 1))}
                    className="w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded flex items-center justify-center transition-all"
                    title="Zoom Out"
                  >
                    🔍-
                  </button>
                </div>

                {/* Auto Rotate Toggle */}
                <div className="absolute bottom-6 right-6">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      autoRotate
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    }`}
                  >
                    {autoRotate ? '⏸ Auto' : '▶ Play'}
                  </button>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-gray-700 text-lg mb-4">{currentLocation.details}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentLocation.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 p-3 rounded-lg text-center hover:shadow-md transition-all">
                    <p className="text-sm font-semibold text-red-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              🗺️ {showMap ? 'Hide Map' : 'Show Map'}
            </button>

            {/* Campus Map */}
            {showMap && (
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Campus Map</h3>
                <svg viewBox="0 0 100 100" className="w-full border border-gray-200 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                  {/* Campus outline */}
                  <rect x="5" y="5" width="90" height="90" fill="none" stroke="#ccc" strokeWidth="1" />
                  {/* Location markers */}
                  {tourLocations.map((location, idx) => (
                    <g key={idx}>
                      <circle
                        cx={location.coordinates.x}
                        cy={location.coordinates.y}
                        r="3"
                        fill={idx === activeLocation ? '#dc2626' : '#9ca3af'}
                        className="cursor-pointer transition-all hover:r-4"
                        onClick={() => setActiveLocation(idx)}
                      />
                      {idx === activeLocation && (
                        <circle
                          cx={location.coordinates.x}
                          cy={location.coordinates.y}
                          r="5"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="1"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            )}

            {/* Location List */}
            <h3 className="text-white font-bold text-lg mb-4">Explore Locations</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {tourLocations.map((location, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLocation(idx);
                    setAutoRotate(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all transform ${
                    activeLocation === idx
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div>
                      <p className="font-semibold">{location.name}</p>
                      <p className="text-xs opacity-80">{location.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tour Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => {
              setAutoRotate(false);
              setActiveLocation(Math.max(0, activeLocation - 1));
            }}
            disabled={activeLocation === 0}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm"
          >
            ← Previous
          </button>
          
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-semibold">
            {activeLocation + 1} / {tourLocations.length}
          </div>

          <button
            onClick={() => {
              setAutoRotate(false);
              setActiveLocation(Math.min(tourLocations.length - 1, activeLocation + 1));
            }}
            disabled={activeLocation === tourLocations.length - 1}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm"
          >
            Next →
          </button>
        </div>

        {/* Tour Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "📍", label: "Locations", value: tourLocations.length },
            { icon: "🎥", label: "Views", value: "360°" },
            { icon: "🌍", label: "Coverage", value: "100%" },
            { icon: "⭐", label: "Rating", value: "4.9/5" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Ready to Visit in Person?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Schedule your campus visit and meet our admissions team to explore the infrastructure and facilities firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
              Schedule Visit
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
