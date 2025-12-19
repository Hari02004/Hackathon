import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  const topics = [
    {
      title: "Academics",
      description: "Explore our diverse range of engineering programs and cutting-edge curriculum designed for future innovators.",
      icon: "🎓",
      path: "/academics",
      stats: "15+ Engineering Programs"
    },
    {
      title: "Research", 
      description: "Discover groundbreaking research projects and innovation centers driving technological advancement.",
      icon: "🔬",
      path: "/research",
      stats: "50+ Research Centers"
    },
    {
      title: "Campus Life",
      description: "Experience vibrant campus culture with clubs, sports, and cultural activities that shape holistic development.",
      icon: "🏛️",
      path: "/campus-life",
      stats: "30+ Student Clubs"
    },
    {
      title: "Alumni",
      description: "Join our prestigious alumni network and stay connected with the KIT community worldwide.",
      icon: "🌟",
      path: "/alumni",
      stats: "5000+ Global Network"
    },
    {
      title: "Admissions",
      description: "Begin your journey at KIT with our streamlined admission process and scholarship opportunities.",
      icon: "📝",
      path: "/admissions",
      stats: "95% Placement Rate"
    },
    {
      title: "Placements",
      description: "Achieve career success with our 95% placement rate and top company recruiters on campus.",
      icon: "💼",
      path: "/placements",
      stats: "200+ Hiring Partners"
    }
  ];

  return (
  <>
     <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
           OUR CAMPUS
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-4 md:space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              <span className="text-2xl md:text-3xl text-red-600 font-bold font-serif">K</span>
              nowledge <span className="text-2xl md:text-3xl text-red-600 font-bold font-serif">N</span>exus <span className="text-2xl md:text-3xl text-red-600 font-bold font-serif">U</span>niversity stands as a beacon of excellence in engineering education, 
              nurturing innovators and leaders since 1998.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Our sprawling 50-acre campus in the heart of Coimbatore provides a perfect blend of 
              academic rigor and practical learning. With state-of-the-art laboratories, renowned faculty, 
              and industry partnerships, we prepare students for global challenges.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 font-mono">25+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 font-mono">50+</div>
                <div className="text-sm text-gray-600">Academic Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 font-mono">200+</div>
                <div className="text-sm text-gray-600">Expert Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 font-mono">5000+</div>
                <div className="text-sm text-gray-600">Successful Alumni</div>
              </div>
            </div>

            <button 
              onClick={() => setShowAboutPopup(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Discover More About KNU
            </button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/campus-1.jpg" 
                  alt="KIT Campus Overview" 
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-serif">
                  Campus of Innovation
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Where tradition meets technology
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-600 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </section>

    {/* About KNU Popup */}
    {showAboutPopup && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
        <div className="bg-white rounded-3xl max-w-4xl w-full my-4 sm:my-8 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header with Gradient */}
          <div className="relative h-40 md:h-48 bg-gradient-to-r from-red-600 to-red-800 flex items-end p-6 md:p-8">
            <button
              onClick={() => setShowAboutPopup(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all shadow-lg hover:scale-110"
            >
              ✕
            </button>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-serif">
                Knowledge Nexus University
              </h2>
              <p className="text-white/90 text-lg">Where Innovation Meets Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Our Mission
                </h3>
                <p className="text-gray-700">To empower students with cutting-edge knowledge, practical skills, and ethical values to become innovators and leaders shaping a better future.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✨</span> Our Vision
                </h3>
                <p className="text-gray-700">To be a global leader in engineering education, fostering interdisciplinary collaboration and creating solutions for global challenges.</p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">⭐</span> Key Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border-l-4 border-red-600 hover:shadow-lg transition-all">
                  <p className="font-semibold text-gray-900 mb-1">📚 Academic Excellence</p>
                  <p className="text-sm text-gray-700">50+ programs with industry-relevant curriculum and 200+ expert faculty members</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-600 hover:shadow-lg transition-all">
                  <p className="font-semibold text-gray-900 mb-1">🏆 95% Placement Rate</p>
                  <p className="text-sm text-gray-700">200+ recruiting partners and top-tier companies hiring from campus</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition-all">
                  <p className="font-semibold text-gray-900 mb-1">🔬 Research & Innovation</p>
                  <p className="text-sm text-gray-700">50+ research centers driving breakthrough discoveries and patents</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-600 hover:shadow-lg transition-all">
                  <p className="font-semibold text-gray-900 mb-1">🌍 Global Network</p>
                  <p className="text-sm text-gray-700">5000+ alumni in 120+ countries including CEOs and research leaders</p>
                </div>
              </div>
            </div>

            {/* Campus Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> Campus Features
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🏠", title: "Modern Residences", desc: "5000+ capacity with smart room systems and 24/7 support" },
                  { icon: "⚽", title: "Olympic Sports Complex", desc: "30+ sports, professional coaching, and state-of-the-art facilities" },
                  { icon: "📚", title: "Digital Library", desc: "1M+ resources, AI research tools, and 24/7 access" },
                  { icon: "🎭", title: "Performing Arts Center", desc: "1000-seat auditorium with professional studios" },
                  { icon: "🍽️", title: "World-class Dining", desc: "Multi-cuisine facilities with dietary preferences catered" },
                  { icon: "💻", title: "Tech Innovation Labs", desc: "AI, IoT, and blockchain labs with cutting-edge equipment" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-all">
                    <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-white text-center">
              <p className="mb-4 text-lg font-semibold">Ready to explore Knowledge Nexus University?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowAboutPopup(false);
                    navigate('/admissions');
                  }}
                  className="bg-white text-red-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => {
                    setShowAboutPopup(false);
                    navigate('/virtual-tour');
                  }}
                  className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Virtual Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
<section className="py-12 md:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-12 md:mb-20">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6 font-serif tracking-tight">
        Discover Knowledge Nexus University
      </h2>
      <div className="w-20 md:w-24 h-0.5 bg-red-600 mx-auto mb-4 md:mb-6"></div>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
        Where knowledge connects innovation, shaping future leaders through interdisciplinary education.
      </p>
    </div>

    {/* Hero Style Sections for Each Topic */}
    {topics.map((topic, index) => (
      <div key={index} className="mb-16 md:mb-20 last:mb-0">
        {/* Hero Section for Topic */}
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 group">
          {/* Three Images Layout */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {/* Left Image - Full width on mobile, 40% on desktop */}
            <div className="w-full md:w-2/5 h-1/2 md:h-full relative overflow-hidden">
              <img 
                src={`/images/${topic.title.toLowerCase()}-1.jpg`} 
                alt={`${topic.title} Main`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
            </div>
            
            {/* Right Side - Full width on mobile, 60% on desktop */}
            <div className="w-full md:w-3/5 h-1/2 md:h-full flex flex-col">
              {/* Top Right Image */}
              <div className="h-1/2 relative overflow-hidden">
                <img 
                  src={`/images/${topic.title.toLowerCase()}-2.jpg`} 
                  alt={`${topic.title} Facilities`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>
              
              {/* Bottom Right Image */}
              <div className="h-1/2 relative overflow-hidden">
                <img 
                  src={`/images/${topic.title.toLowerCase()}-3.jpg`} 
                  alt={`${topic.title} Community`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>
            </div>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h3 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 font-serif">
                {topic.title}
              </h3>
              <p className="text-sm md:text-base lg:text-xl mb-4 md:mb-6 max-w-xs md:max-w-2xl mx-auto">
                {topic.description}
              </p>
              {/* Hero Overlay Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center">
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold transition-colors w-fit"
                onClick={() => navigate(topic.path)}
              >
                Explore {topic.title}
              </button>
              <button 
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold backdrop-blur-sm transition-colors w-fit"
                onClick={() => navigate('/virtual-tour')}
              >
                Virtual Tour
              </button>
            </div>
            </div>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 md:p-4">
              <div className="text-white text-xs md:text-sm font-semibold">
                {topic.stats}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        {index < topics.length - 1 && (
          <div className="border-t border-gray-200 mt-12 md:mt-16"></div>
        )}
      </div>
    ))}

    {/* Final Call to Action */}
    <div className="text-center mt-16 md:mt-20">
      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl md:rounded-2xl p-8 md:p-12 lg:p-16 text-white">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-serif">
          Ready to Join Knowledge Nexus?
        </h3>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
          Start your journey towards academic excellence and innovation.
        </p>
{/* Final CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center">
  <button 
    className="bg-white text-red-600 hover:bg-gray-100 px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold transition-colors w-fit"
    onClick={() => navigate('/admissions')}
  >
    Apply Now
  </button>
  <button 
    className="border border-white text-white hover:bg-white hover:text-red-600 px-3 py-1.5 md:px-6 md:py-2.5 rounded text-xs md:text-base font-semibold transition-colors w-fit"
    onClick={() => navigate('/contact')}
  >
    Contact Admissions
  </button>
</div>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Overview;