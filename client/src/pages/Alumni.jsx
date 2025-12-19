import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Alumni = () => {
  const [activeAlumni, setActiveAlumni] = useState(0);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const alumniData = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      batch: "Class of 1995",
      position: "Chief Scientist",
      company: "NASA Research Center",
      location: "California, USA",
      achievements: [
        "NASA Distinguished Service Medal",
        "100+ Research Papers",
        "Led Mars Rover Mission"
      ],
      expertise: "Space Technology",
      impact: "Pioneered satellite communication systems",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Priya Sharma",
      batch: "Class of 2005",
      position: "Founder & CEO",
      company: "TechGen Solutions",
      location: "Bengaluru, India",
      achievements: [
        "Forbes 30 Under 30",
        "$500M Company Valuation",
        "10,000+ Employees"
      ],
      expertise: "AI & Machine Learning",
      impact: "Created India's largest AI research lab",
      icon: "🤖",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Amit Patel",
      batch: "Class of 2010",
      position: "Managing Director",
      company: "Global Investment Bank",
      location: "London, UK",
      achievements: [
        "Young Banker of the Year",
        "$10B+ Portfolio Managed",
        "M&A Deal Maker Award"
      ],
      expertise: "Investment Banking",
      impact: "Funded 50+ tech startups in India",
      icon: "💼",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Dr. Anjali Singh",
      batch: "Class of 2015",
      position: "Research Director",
      company: "MIT Media Lab",
      location: "Boston, USA",
      achievements: [
        "Nobel Prize Nominee",
        "Breakthrough in Quantum Computing",
        "50 International Patents"
      ],
      expertise: "Quantum Physics",
      impact: "Developed quantum encryption technology",
      icon: "⚛️",
      color: "from-red-500 to-orange-500"
    }
  ];

  const alumniStats = [
    { value: "50,000+", label: "Global Alumni", icon: "🌍" },
    { value: "120+", label: "Countries", icon: "🗺️" },
    { value: "$100B+", label: "Collective Worth", icon: "💰" },
    { value: "500+", label: "CXOs & Founders", icon: "👨‍💼" },
    { value: "1000+", label: "PhD Holders", icon: "🎓" },
    { value: "200+", label: "Research Awards", icon: "🏆" },
    { value: "50+", label: "Unicorns Created", icon: "🦄" },
    { value: "10,000+", label: "Jobs Created", icon: "👥" }
  ];

  const alumniChapters = [
    { city: "Silicon Valley", members: "5,000+", year: "1990", icon: "💻" },
    { city: "London", members: "3,200+", year: "1995", icon: "🇬🇧" },
    { city: "Singapore", members: "2,800+", year: "2000", icon: "🏙️" },
    { city: "Dubai", members: "1,500+", year: "2005", icon: "🌆" },
    { city: "Sydney", members: "1,200+", year: "2010", icon: "🇦🇺" },
    { city: "Toronto", members: "900+", year: "2015", icon: "🍁" }
  ];

  const successStories = [
    {
      title: "From Campus to Corporate",
      description: "How our alumni transformed classroom knowledge into billion-dollar businesses",
      icon: "📈",
      count: "100+"
    },
    {
      title: "Research Breakthroughs",
      description: "Groundbreaking innovations by alumni researchers that changed industries",
      icon: "🔬",
      count: "500+"
    },
    {
      title: "Social Impact",
      description: "Alumni-led initiatives that transformed communities and education",
      icon: "❤️",
      count: "1000+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Same Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-700 text-white">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif animate-slide-down">
            Alumni Network
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Connecting Generations of Excellence Across the Globe
          </p>
          <div className={`w-32 h-1 bg-white mx-auto mb-12 transition-all duration-1000 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Introduction */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Our Global Family
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto">
            Join a network of 50,000+ accomplished professionals, entrepreneurs, and researchers 
            who are shaping the future across every continent.
          </p>
        </div>

        {/* Featured Alumni Grid */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Featured Alumni
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {alumniData.map((alumni, index) => (
              <button
                key={alumni.id}
                onClick={() => setActiveAlumni(index)}
                className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left transition-all duration-500 transform hover:-translate-y-2 ${
                  activeAlumni === index 
                    ? 'ring-4 ring-purple-500 ring-offset-2 scale-105' 
                    : 'hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${alumni.color} opacity-10`}></div>
                
                <div className={`text-4xl sm:text-5xl mb-4 transition-transform duration-500 ${
                  activeAlumni === index ? 'scale-125 rotate-12' : ''
                }`}>
                  {alumni.icon}
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {alumni.name}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  {alumni.position}
                </p>
                <p className="text-purple-600 font-semibold text-xs sm:text-sm">
                  {alumni.company}
                </p>
                
                {activeAlumni === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full absolute top-0"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Active Alumni Details */}
          <div className="relative">
            <div className={`absolute -inset-1 bg-gradient-to-r ${alumniData[activeAlumni].color} rounded-3xl blur opacity-30 transition-all duration-1000`}></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5 p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl mb-4">
                      {alumniData[activeAlumni].icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {alumniData[activeAlumni].name}
                    </h3>
                    <p className="text-purple-600 font-semibold text-lg mb-4">
                      {alumniData[activeAlumni].batch}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <span className="text-gray-500 mr-2">📍</span>
                        <span>{alumniData[activeAlumni].location}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-gray-500 mr-2">🎯</span>
                        <span>{alumniData[activeAlumni].expertise}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-3/5 p-6 sm:p-8">
                  <div className="mb-6">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      Professional Journey
                    </h4>
                    <p className="text-gray-700 text-base sm:text-lg">
                      {alumniData[activeAlumni].impact}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Notable Achievements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {alumniData[activeAlumni].achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className={`bg-gradient-to-r ${alumniData[activeAlumni].color} bg-opacity-10 rounded-xl p-4`}
                        >
                          <div className="flex items-center">
                            <span className="text-purple-500 mr-3">🏅</span>
                            <span className="font-medium text-gray-800">{achievement}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        // Store selected alumni data
                        localStorage.setItem('selectedAlumni', JSON.stringify(alumniData[activeAlumni]));
                        navigate('/profile');
                      }}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      View Full Profile
                    </button>
                    <button 
                      onClick={() => {
                        // Store current user for connection
                        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                        const connectionData = {
                          from: currentUser.name || 'Anonymous',
                          to: alumniData[activeAlumni].name,
                          timestamp: new Date().toISOString(),
                          message: `I'd like to connect with you!`
                        };
                        // Show connection success message
                        alert(`✅ Connection request sent to ${alumniData[activeAlumni].name}!`);
                        console.log('Connection:', connectionData);
                      }}
                      className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alumni Statistics */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-6 sm:p-8 md:p-12 text-white mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-serif">
            Alumni Network Impact
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {alumniStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-5 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Chapters */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Global Chapters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {alumniChapters.map((chapter, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{chapter.icon}</div>
                  <div className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    Since {chapter.year}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {chapter.city}
                </h4>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">👥</span>
                  <span className="font-medium">{chapter.members} Alumni</span>
                </div>
                <button className="mt-4 w-full text-center text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  View Chapter Events →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Success Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {successStories.map((story, index) => (
              <div 
                key={index}
                className="relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 overflow-hidden"
              >
                <div className="text-5xl mb-4">
                  {story.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {story.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {story.description}
                </p>
                <div className="text-2xl font-bold text-purple-600">
                  {story.count} Stories
                </div>
                <div className="absolute top-4 right-4 text-3xl opacity-10">
                  {story.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Benefits */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-6 sm:p-8 md:p-10 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center font-serif">
            Alumni Benefits
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🎯", title: "Career Services", desc: "Exclusive job opportunities and career guidance" },
              { icon: "🤝", title: "Networking", desc: "Connect with industry leaders worldwide" },
              { icon: "📚", title: "Lifetime Learning", desc: "Access to online courses and research papers" },
              { icon: "🏛️", title: "Campus Access", desc: "Lifetime access to campus facilities" },
              { icon: "💼", title: "Mentorship", desc: "Mentor students and get mentored by seniors" },
              { icon: "🎟️", title: "Events", desc: "Invitations to exclusive alumni events" },
              { icon: "📱", title: "Alumni Portal", desc: "Dedicated networking platform" },
              { icon: "🎓", title: "Continuing Education", desc: "Special discounts on executive programs" }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              Join Our Global Network
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Stay connected with your alma mater and fellow alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/events')}
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Explore Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;