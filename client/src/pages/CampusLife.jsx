import React, { useState, useEffect } from 'react';

function CampusLife() {
  const [activeArea, setActiveArea] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  // 3D rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const campusAreas = [
    {
      id: 0,
      title: "Student Residences",
      image: "/images/campus-hostel.jpg",
      icon: "🏠",
      description: "Modern, secure, and comfortable residential facilities designed for holistic student development with smart room systems, common areas, and 24/7 support services.",
      features: [
        "Smart Room Systems with IoT",
        "24/7 Security & Surveillance",
        "Common Recreation & Game Zones",
        "Silent Study Lounges",
        "Automated Laundry Facilities",
        "Multi-cuisine Dining Halls",
        "Medical Emergency Response",
        "Guest Accommodation"
      ],
      amenities: ["Wi-Fi 6", "AC Rooms", "Gym", "Library", "Cafeteria"],
      stats: "5,000+ Capacity | 15 Hostels | 24/7 Security",
      color: "from-blue-100 to-blue-200",
      video: "/videos/hostel-tour.mp4"
    },
    {
      id: 1,
      title: "Sports & Fitness Complex",
      image: "/images/campus-sports.jpg",
      icon: "⚽",
      description: "Olympic-standard sports facilities with professional coaching, fitness centers, and recreational zones promoting physical wellness and competitive sports.",
      features: [
        "Olympic-size Swimming Pool",
        "Indoor Multi-sport Stadium",
        "Advanced Fitness & Cardio Center",
        "Tennis, Badminton & Squash Courts",
        "Professional Football Ground",
        "Synthetic Athletics Track",
        "Martial Arts & Yoga Studio",
        "Sports Medicine Clinic"
      ],
      amenities: ["Coaching", "Equipment", "Lockers", "Showers", "Sports Shop"],
      stats: "30+ Sports | 50 Coaches | 5 Olympic Athletes",
      color: "from-green-100 to-green-200",
      video: "/videos/sports-complex.mp4"
    },
    {
      id: 2,
      title: "Digital Library & Innovation Hub",
      image: "/images/campus-library.jpg",
      icon: "📚",
      description: "Next-generation learning space with digital archives, AI research tools, collaborative zones, and innovation labs for academic excellence.",
      features: [
        "AI-powered Research Assistant",
        "Digital Archives & E-books",
        "Silent & Group Study Pods",
        "24/7 Access with Biometric Entry",
        "Research Consultation Services",
        "Innovation & Maker Space",
        "VR Learning Zone",
        "Academic Writing Center"
      ],
      amenities: ["Printers", "Scanners", "Tablets", "Charging", "Coffee"],
      stats: "1M+ Resources | 24/7 Access | 500+ Study Seats",
      color: "from-purple-100 to-purple-200",
      video: "/videos/library-tour.mp4"
    },
    {
      id: 3,
      title: "Performing Arts & Cultural Center",
      image: "/images/campus-cultural.jpg",
      icon: "🎭",
      description: "State-of-the-art performing arts facility with professional studios, theaters, and exhibition spaces for creative expression.",
      features: [
        "1000-seat Digital Auditorium",
        "Professional Recording Studio",
        "Dance & Music Practice Rooms",
        "Theater Workshop & Rehearsal Space",
        "Art Gallery & Exhibition Hall",
        "Film & Media Production Studio",
        "Costume & Prop Workshop",
        "Cultural Heritage Museum"
      ],
      amenities: ["Instruments", "Costumes", "Editing", "Lighting", "Sound"],
      stats: "40+ Cultural Clubs | 100+ Annual Events | Professional Mentors",
      color: "from-red-100 to-red-200",
      video: "/videos/cultural-center.mp4"
    }
  ];

  const campusHighlights = [
    {
      title: "Eco-Friendly Campus",
      description: "50-acre green campus with solar power, rainwater harvesting, and sustainable architecture.",
      icon: "🌿",
      stats: "60% Green Cover | Solar Powered"
    },
    {
      title: "Smart Campus Technology",
      description: "IoT-enabled campus with smart classrooms, digital signage, and campus-wide Wi-Fi 6.",
      icon: "🤖",
      stats: "Wi-Fi 6 Coverage | IoT Integration"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive healthcare, counseling services, yoga, and wellness programs.",
      icon: "💚",
      stats: "24/7 Medical | Counseling Services"
    },
    {
      title: "Transport & Connectivity",
      description: "Campus shuttle service, electric vehicle charging, and excellent public transport links.",
      icon: "🚌",
      stats: "Free Shuttle | EV Charging"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 3D Animated Hero Section */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-r from-red-600 to-red-800">
        {/* 3D Rotating Cube */}
        <div 
          className="absolute right-10 top-1/4 w-32 h-32 md:w-48 md:h-48"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`,
            transition: 'transform 0.1s linear'
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full bg-white/10 border border-white/20"
              style={{
                transform: `rotateY(${i * 60}deg) translateZ(60px)`,
                backfaceVisibility: 'hidden'
              }}
            />
          ))}
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold mb-6 font-serif animate-slide-in-3d">
              Campus Life
            </h1>
            <p className="text-xl md:text-2xl lg:text-2xl mb-8 animate-fade-in-up">
              Where Every Space Tells a Story of Learning & Living
            </p>
            <div 
              className="w-48 h-1 bg-white mx-auto mb-8 transform-gpu"
              style={{ transform: `rotateY(${rotation}deg)` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Campus Highlights with 3D Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Campus Highlights
          </h2>
          <p className="text-gray-600 text-xl">
            Experience world-class facilities designed for excellence
          </p>
        </div>

        {/* 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {campusHighlights.map((highlight, index) => (
            <div
              key={index}
              className="relative h-64 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => setFlipCard(!flipCard)}
            >
              <div
                className={`absolute w-full h-full transition-all duration-700 transform-gpu ${
                  flipCard ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-6 backface-hidden">
                  <div className="text-5xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                  <div className="text-red-600 font-semibold text-sm mb-4">{highlight.stats}</div>
                  <div className="text-gray-500 text-sm">Tap to flip →</div>
                </div>
                
                {/* Back of Card */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-xl p-6 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                  <p className="text-gray-700">{highlight.description}</p>
                  <div className="mt-4 text-red-600 text-sm font-semibold">Tap to flip back</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Campus Areas with 3D Hover */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Explore Campus Facilities
            </h3>
            <p className="text-gray-600">Hover over cards for 3D effect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campusAreas.map((area, index) => (
              <div
                key={area.id}
                className="relative group"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveArea(index)}
              >
                <div
                  className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform-gpu ${
                    hoveredCard === index 
                      ? 'rotate-x-5 rotate-y-5 scale-105' 
                      : ''
                  }`}
                  style={{
                    transform: hoveredCard === index 
                      ? 'rotateX(5deg) rotateY(5deg) translateZ(20px)' 
                      : 'rotateX(0) rotateY(0) translateZ(0)'
                  }}
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <div className="relative h-64 md:h-full">
                        <img 
                          src={area.image} 
                          alt={area.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-6 left-6 bg-white rounded-xl p-3 shadow-lg">
                          <span className="text-3xl">{area.icon}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-3/5 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">{area.title}</h3>
                      <p className="text-gray-600 mb-6">{area.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {area.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-red-600 font-bold text-sm">{area.stats}</span>
                        <button 
                          onClick={() => {
                            setSelectedArea(area);
                            setShowModal(true);
                          }}
                          className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Explore More
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Shadow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${area.color} rounded-3xl opacity-20 -z-10 transition-transform duration-500 ${
                  hoveredCard === index ? 'translate-x-4 translate-y-4' : ''
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Statistics Visualization */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-serif">
            Campus in Numbers
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                value: "50", 
                label: "Acres Campus", 
                icon: "🌳",
                animation: "animate-pulse"
              },
              { 
                value: "10K+", 
                label: "Students", 
                icon: "👨‍🎓",
                animation: "animate-bounce"
              },
              { 
                value: "24/7", 
                label: "Security & Support", 
                icon: "🛡️",
                animation: "animate-spin-slow"
              },
              { 
                value: "100+", 
                label: "Facilities", 
                icon: "🏛️",
                animation: "animate-ping"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`text-4xl mb-3 ${stat.animation}`}>{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Gallery Preview */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Campus Gallery
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/images/campus life-1.jpg", title: "Sunset View" },
              { img: "/images/campus-library.jpg", title: "Campus Library" },
              { img: "/images/campus life-2.jpg", title: "Sports Ground" },
              { img: "/images/campus life-3.jpg", title: "Student Center" }
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <div className="text-white font-semibold">{item.title}</div>
                </div>
                <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Testimonials Carousel */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Student Experiences
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The campus transforms you - from infrastructure to community, everything is designed for growth.",
                name: "Rahul Verma",
                role: "Computer Science, 2023",
                rating: "★★★★★"
              },
              {
                quote: "Sports facilities here helped me train and represent at national level tournaments.",
                name: "Priya Sharma",
                role: "Electrical Engineering, 2022",
                rating: "★★★★★"
              },
              {
                quote: "24/7 library and innovation labs were game-changers for my research projects.",
                name: "Ananya Patel",
                role: "Biotechnology, 2024",
                rating: "★★★★★"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  transform: `rotateY(${index === 1 ? '5deg' : index === 2 ? '-5deg' : '0deg'})`
                }}
              >
                <div className="text-4xl text-red-300 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="text-yellow-400 mb-3">{testimonial.rating}</div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Area Detail Modal */}
        {showModal && selectedArea && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full my-4 sm:my-8 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 hover:shadow-3xl">
              {/* Modal Header with Image */}
              <div className="relative h-48 sm:h-64 md:h-96 rounded-t-2xl sm:rounded-t-3xl overflow-hidden group">
                <img 
                  src={selectedArea.image} 
                  alt={selectedArea.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3 sm:p-4 md:p-6">
                  <div className="text-white w-full transform transition-transform duration-500">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3 hover:bg-white/30 transition-all">
                      <span className="text-4xl sm:text-5xl md:text-6xl">{selectedArea.icon}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 drop-shadow-lg">{selectedArea.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 hover:bg-white text-gray-800 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all shadow-lg hover:scale-110 hover:shadow-xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 max-h-[60vh] sm:max-h-96 overflow-y-auto bg-gradient-to-b from-white via-white to-gray-50">
                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed font-medium">
                  {selectedArea.description}
                </p>

                {/* Stats - Enhanced */}
                <div className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border-l-4 border-red-600 shadow-md hover:shadow-lg transition-all">
                  <p className="text-red-700 font-bold text-center text-sm sm:text-base md:text-lg">{selectedArea.stats}</p>
                </div>

                {/* Features Section - Enhanced */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
                    <span className="text-red-600">⭐</span>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedArea.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 rounded-xl hover:from-red-50 hover:to-orange-50 transition-all duration-300 border border-gray-100 hover:border-red-200 shadow-sm hover:shadow-md">
                        <span className="text-red-600 font-bold text-lg mr-3 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities - Enhanced */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-blue-600">🎯</span>
                    Available Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedArea.amenities.map((amenity, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border border-blue-200 hover:shadow-md transition-all hover:scale-105">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights Box - Enhanced */}
                <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-50 rounded-2xl p-5 sm:p-7 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition-all">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Why This Space Matters
                  </h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      "Designed for holistic development beyond academics",
                      "Facilitates peer learning and community building",
                      "Equipped with modern technology and expert support",
                      "Enhances overall campus experience and well-being"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm md:text-base text-gray-800">
                        <span className="text-red-600 text-lg mr-3 mt-0.5 flex-shrink-0">
                          {["🎯", "👥", "💻", "🌟"][idx]}
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-2xl sm:rounded-b-3xl flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-5 sm:px-8 py-3 sm:py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-gray-400 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                >
                  Close
                </button>
                <button className="px-5 sm:px-8 py-3 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>📅</span>
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampusLife;