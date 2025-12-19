import React, { useState, useEffect } from 'react';

function Academics() {
  const [activeSide, setActiveSide] = useState(0);
  
  const academicSides = [
    {
      id: 0,
      title: "Undergraduate Programs",
      image: "/images/academics-1.jpg",
      icon: "/images/icons/graduation-cap.png", // Real graduation cap icon
      description: "Comprehensive bachelor's degrees across engineering, sciences, business, and humanities with industry-aligned curriculum.",
      keyPoints: [
        { icon: "📚", text: "15+ Engineering Disciplines" },
        { icon: "🔧", text: "Industry Internships" },
        { icon: "🌍", text: "Global Study Options" },
        { icon: "💼", text: "Career Development" }
      ],
      stats: "4,500+ Students | 95% Placement"
    },
    {
      id: 1,
      title: "Postgraduate Excellence",
      image: "/images/academics-2.jpg",
      icon: "/images/icons/research.png", // Real research icon
      description: "Advanced master's and doctoral programs with world-class research facilities and international collaborations.",
      keyPoints: [
        { icon: "🎯", text: "25+ Specializations" },
        { icon: "🤝", text: "Industry Partnerships" },
        { icon: "📝", text: "Thesis Support" },
        { icon: "🏆", text: "Research Grants" }
      ],
      stats: "1,200+ Scholars | 500+ Publications"
    },
    {
      id: 2,
      title: "Research Innovation",
      image: "/images/academics-3.jpg",
      icon: "/images/icons/innovation.png", // Real innovation icon
      description: "Cutting-edge research centers focusing on emerging technologies and sustainable solutions.",
      keyPoints: [
        { icon: "🔬", text: "30+ Research Labs" },
        { icon: "💡", text: "Patent Incubation" },
        { icon: "🌱", text: "Sustainable Tech" },
        { icon: "🤖", text: "AI Research" }
      ],
      stats: "50+ Patents | 100+ Projects"
    },
    {
      id: 3,
      title: "Global Learning",
      image: "/images/academics-4.jpg",
      icon: "/images/icons/global.png", // Real global icon
      description: "International partnerships, exchange programs, and multicultural learning environment.",
      keyPoints: [
        { icon: "✈️", text: "50+ Partner Universities" },
        { icon: "🎓", text: "Dual Degrees" },
        { icon: "🌏", text: "Cultural Exchange" },
        { icon: "💻", text: "Online Courses" }
      ],
      stats: "20+ Countries | 100+ Online Courses"
    }
  ];



  // Handle side click
  const handleSideClick = (id) => {
    setActiveSide(id);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-red-600 to-red-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            Academic Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover Four Dimensions of World-Class Education
          </p>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
      </div>

      {/* Rotating Cube Display */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Explore Our Academic Dimensions
          </h2>
        </div>

        {/* Cube Container */}
        <div className="relative mb-16">
          {/* Current Active Side Display */}
          <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={academicSides[activeSide].image} 
              alt={academicSides[activeSide].title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="text-3xl" style={{ display: 'none' }}>
                    {academicSides[activeSide].keyPoints[0].icon}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-serif">
                    {academicSides[activeSide].title}
                  </h3>
                </div>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">
                  {academicSides[activeSide].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {academicSides[activeSide].stats}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-4">
            {academicSides.map((side, index) => (
              <button
                key={side.id}
                onClick={() => handleSideClick(index)}
                className={`w-4 h-4 rounded-full transition-all ${
                  activeSide === index 
                    ? 'bg-red-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View ${side.title}`}
              />
            ))}
          </div>
        </div>

        {/* Key Points Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Key Features of {academicSides[activeSide].title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicSides[activeSide].keyPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {point.text.split(' ')[0]}
                </h4>
                <p className="text-gray-600 text-sm">
                  {point.text.substring(point.text.indexOf(' ') + 1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-linear-to-r from-red-50 to-white rounded-2xl shadow-lg p-8">
  <div className="flex items-center mb-6">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-6">
      <img 
        src={academicSides[activeSide].icon} 
        alt="Program Icon"
        className="w-10 h-10"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'block';
        }}
      />
      <span className="text-2xl" style={{ display: 'none' }}>
        {academicSides[activeSide].keyPoints[0].icon}
      </span>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">
        About {academicSides[activeSide].title}
      </h3>
      <p className="text-gray-600">Detailed program insights</p>
    </div>
  </div>
  
  <div className="space-y-6 text-gray-700">
    {/* First Paragraph */}
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-lg leading-relaxed">
        {academicSides[activeSide].description}
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Program Highlights Section */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Program Highlights</h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Industry-aligned curriculum designed with input from leading corporations and updated annually to match current market demands.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Hands-on practical training through laboratory sessions, workshops, and real-world projects that build essential technical skills.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Expert faculty guidance from professors with extensive industry experience and research credentials in their respective fields.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Modern infrastructure including smart classrooms, advanced laboratories, and digital learning resources for comprehensive education.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Student Benefits Section */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Student Benefits</h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Career placement support through dedicated placement cells, interview preparation, and connections with top recruiting companies.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Scholarship opportunities based on academic merit, financial need, and special talents to support diverse student backgrounds.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Research publications support including guidance, funding, and platforms for students to publish in reputed journals and conferences.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">✓</span>
              <p className="text-gray-700">
                Alumni network access connecting current students with successful graduates for mentorship, internships, and career opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Additional Details Section */}
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-4">Additional Program Details</h4>
      <div className="space-y-4">
        <p className="text-gray-700">
          The program duration spans across multiple semesters with flexible credit systems, allowing students to pace their learning according to individual preferences and capabilities.
        </p>
        <p className="text-gray-700">
          Assessment methods include continuous evaluation through assignments, projects, presentations, and semester-end examinations to ensure comprehensive learning outcomes.
        </p>
        <p className="text-gray-700">
          International exposure opportunities include semester exchange programs, summer schools, and collaborative research projects with partner institutions worldwide.
        </p>
        <p className="text-gray-700">
          Certification and recognition from professional bodies and accreditation agencies ensure the program meets global standards of quality and relevance.
        </p>
      </div>
    </div>
  </div>
</div>
      </div>

      {/* All Sides Preview */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-serif">
            Explore All Academic Areas
          </h3>
          <p className="text-gray-600">Click on any area to learn more</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {academicSides.map((side, index) => (
            <button
              key={side.id}
              onClick={() => handleSideClick(index)}
              className={`bg-white rounded-xl shadow-lg overflow-hidden text-left transition-all duration-300 transform hover:-translate-y-2 ${
                activeSide === index 
                  ? 'ring-2 ring-red-500 ring-offset-2' 
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="relative h-48">
                <img 
                  src={side.image} 
                  alt={side.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                  <img 
                    src={side.icon} 
                    alt="Icon"
                    className="w-6 h-6"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-lg" style={{ display: 'none' }}>
                    {side.keyPoints[0].icon}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {side.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {side.description.substring(0, 80)}...
                </p>
                <div className="text-red-600 font-semibold text-sm">
                  {side.stats.split('|')[0]}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Academics;