import React, { useState, useEffect } from 'react';

const Admission = () => {
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [animate, setAnimate] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const admissionTabs = [
    { id: 'undergraduate', label: 'Undergraduate', icon: '🎓' },
    { id: 'postgraduate', label: 'Postgraduate', icon: '📚' },
    { id: 'phd', label: 'PhD Programs', icon: '🔬' },
    { id: 'international', label: 'International', icon: '🌍' }
  ];

  /* ---------------------- UNDERGRAD PROGRAMS (6) ---------------------- */
  const undergraduatePrograms = [
    {
      id: 1,
      name: "B.Tech in Computer Science",
      duration: "4 Years",
      seats: "120",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "💻",
      color: "from-red-100 to-red-200"
    },
    {
      id: 2,
      name: "B.Tech in Electrical Engineering",
      duration: "4 Years",
      seats: "100",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "⚡",
      color: "from-orange-100 to-orange-200"
    },
    {
      id: 3,
      name: "B.Tech in Mechanical Engineering",
      duration: "4 Years",
      seats: "80",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "⚙️",
      color: "from-amber-100 to-amber-200"
    },
    {
      id: 4,
      name: "B.Tech in Civil Engineering",
      duration: "4 Years",
      seats: "75",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "🏗️",
      color: "from-green-100 to-green-200"
    },
    {
      id: 5,
      name: "B.Tech in Chemical Engineering",
      duration: "4 Years",
      seats: "60",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "🧪",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 6,
      name: "B.Tech in Biotechnology",
      duration: "4 Years",
      seats: "50",
      eligibility: "JEE Advanced Qualified",
      applicationDeadline: "April 30, 2024",
      icon: "🧬",
      color: "from-purple-100 to-purple-200"
    }
  ];

  /* ---------------------- POSTGRAD PROGRAMS (6) ---------------------- */
  const postgraduatePrograms = [
    {
      id: 1,
      name: "M.Tech in Computer Science",
      duration: "2 Years",
      seats: "40",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "💻",
      color: "from-indigo-100 to-indigo-200"
    },
    {
      id: 2,
      name: "M.Tech in Electrical Power Systems",
      duration: "2 Years",
      seats: "35",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "⚡",
      color: "from-green-100 to-green-200"
    },
    {
      id: 3,
      name: "M.Tech in Thermal Engineering",
      duration: "2 Years",
      seats: "30",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "🔥",
      color: "from-yellow-100 to-yellow-200"
    },
    {
      id: 4,
      name: "M.Tech in Structural Engineering",
      duration: "2 Years",
      seats: "28",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "🏗️",
      color: "from-red-100 to-red-200"
    },
    {
      id: 5,
      name: "M.Tech in Chemical Process Engineering",
      duration: "2 Years",
      seats: "20",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "🧪",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 6,
      name: "M.Tech in Biotechnology",
      duration: "2 Years",
      seats: "25",
      eligibility: "GATE Qualified",
      applicationDeadline: "May 15, 2024",
      icon: "🧬",
      color: "from-pink-100 to-pink-200"
    }
  ];

  /* ---------------------- PHD PROGRAMS (6) ---------------------- */
  const phdPrograms = [
    {
      id: 1,
      name: "PhD in Computer Science",
      duration: "3-5 Years",
      seats: "10",
      eligibility: "M.Tech + Research Proposal",
      applicationDeadline: "June 10, 2024",
      icon: "🔬",
      color: "from-purple-100 to-purple-200"
    },
    {
      id: 2,
      name: "PhD in Electrical Engineering",
      duration: "3-5 Years",
      seats: "8",
      eligibility: "M.Tech + GATE/NET",
      applicationDeadline: "June 10, 2024",
      icon: "⚡",
      color: "from-green-100 to-green-200"
    },
    {
      id: 3,
      name: "PhD in Mechanical Engineering",
      duration: "3-5 Years",
      seats: "6",
      eligibility: "M.Tech + GATE/NET",
      applicationDeadline: "June 10, 2024",
      icon: "⚙️",
      color: "from-yellow-100 to-yellow-200"
    },
    {
      id: 4,
      name: "PhD in Civil Engineering",
      duration: "3-5 Years",
      seats: "5",
      eligibility: "M.Tech + Research Proposal",
      applicationDeadline: "June 10, 2024",
      icon: "🏗️",
      color: "from-red-100 to-red-200"
    },
    {
      id: 5,
      name: "PhD in Chemical Engineering",
      duration: "3-5 Years",
      seats: "6",
      eligibility: "M.Tech + GATE/NET",
      applicationDeadline: "June 10, 2024",
      icon: "🧪",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 6,
      name: "PhD in Biotechnology",
      duration: "3-5 Years",
      seats: "4",
      eligibility: "M.Tech + NET",
      applicationDeadline: "June 10, 2024",
      icon: "🧬",
      color: "from-pink-100 to-pink-200"
    }
  ];

  /* ---------------------- INTERNATIONAL PROGRAMS (6) ---------------------- */
  const internationalPrograms = [
    {
      id: 1,
      name: "B.Tech (International Students)",
      duration: "4 Years",
      seats: "30",
      eligibility: "SAT Score + Interview",
      applicationDeadline: "April 20, 2024",
      icon: "🌍",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 2,
      name: "M.Tech (International Students)",
      duration: "2 Years",
      seats: "20",
      eligibility: "Bachelor's Degree + English Proficiency",
      applicationDeadline: "May 30, 2024",
      icon: "📘",
      color: "from-cyan-100 to-cyan-200"
    },
    {
      id: 3,
      name: "International Exchange (1 Semester)",
      duration: "6 Months",
      seats: "15",
      eligibility: "CGPA + English Test",
      applicationDeadline: "March 10, 2024",
      icon: "✈️",
      color: "from-purple-100 to-purple-200"
    },
    {
      id: 4,
      name: "Research Internship (International)",
      duration: "3 Months",
      seats: "10",
      eligibility: "UG/PG Students",
      applicationDeadline: "Feb 28, 2024",
      icon: "🔍",
      color: "from-green-100 to-green-200"
    },
    {
      id: 5,
      name: "Short Term Certification",
      duration: "1 Month",
      seats: "25",
      eligibility: "Open to All",
      applicationDeadline: "April 15, 2024",
      icon: "📜",
      color: "from-orange-100 to-orange-200"
    },
    {
      id: 6,
      name: "International Summer School",
      duration: "45 Days",
      seats: "30",
      eligibility: "English Proficiency",
      applicationDeadline: "May 1, 2024",
      icon: "🏖️",
      color: "from-red-100 to-red-200"
    }
  ];

  /* ---------------------- ADMISSION PROCESS / STATS / DATES / FAQ (original data preserved) ---------------------- */
  const admissionProcess = [
    { step: 1, title: "Application", description: "Submit online application form", icon: "📝", duration: "Jan - Apr" },
    { step: 2, title: "Entrance Exam", description: "Appear for JEE Advanced", icon: "📊", duration: "June" },
    { step: 3, title: "Results", description: "Check merit list and ranks", icon: "📈", duration: "June" },
    { step: 4, title: "Counseling", description: "Participate in JoSAA counseling", icon: "💬", duration: "July" },
    { step: 5, title: "Document Verification", description: "Submit original documents", icon: "📑", duration: "July" },
    { step: 6, title: "Admission Confirmation", description: "Pay fees and confirm seat", icon: "✅", duration: "July" }
  ];

  const admissionStats = [
    { value: "1,50,000+", label: "Annual Applications", icon: "📨", color: "text-red-300" },
    { value: "1,200", label: "Total Seats", icon: "🪑", color: "text-orange-300" },
    { value: "0.8%", label: "Acceptance Rate", icon: "🎯", color: "text-amber-300" },
    { value: "28", label: "Programs Offered", icon: "📚", color: "text-green-300" },
    { value: "₹8-20 LPA", label: "Average Package", icon: "💰", color: "text-blue-300" },
    { value: "100%", label: "Placement Record", icon: "🏆", color: "text-purple-300" },
    { value: "50+", label: "Countries", icon: "🌍", color: "text-pink-300" },
    { value: "75+", label: "Years Legacy", icon: "🏛️", color: "text-cyan-300" }
  ];

  const importantDates = [
    { event: "Application Opens", date: "January 1, 2024", status: "open", icon: "🚀" },
    { event: "Last Date for Application", date: "April 30, 2024", status: "upcoming", icon: "⏰" },
    { event: "JEE Advanced Exam", date: "June 2, 2024", status: "upcoming", icon: "📝" },
    { event: "Results Declaration", date: "June 12, 2024", status: "upcoming", icon: "📊" },
    { event: "Counseling Starts", date: "July 1, 2024", status: "upcoming", icon: "💬" },
    { event: "Academic Session Begins", date: "July 31, 2024", status: "upcoming", icon: "🎓" }
  ];

  const faqs = [
    { 
      question: "What are the eligibility criteria for B.Tech programs?", 
      answer: "Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with minimum 75% aggregate and qualified JEE Advanced.",
      category: "Eligibility"
    },
    { 
      question: "What is the application fee for international students?", 
      answer: "The application fee for international students is USD 100. Fee waivers are available for students from developing countries.",
      category: "Fees"
    },
    { 
      question: "Is there any reservation policy?", 
      answer: "Yes, we follow Government of India reservation policy: 15% for SC, 7.5% for ST, 27% for OBC, and 10% for EWS categories.",
      category: "Reservation"
    },
    { 
      question: "What documents are required during counseling?", 
      answer: "Required documents include: JEE Advanced admit card, rank card, 10+2 marksheet, category certificate (if applicable), and passport size photos.",
      category: "Documents"
    },
    { 
      question: "Are there any scholarships available?", 
      answer: "Yes, we offer merit-based scholarships, need-based financial aid, and various government scholarships. 40% of students receive some form of financial assistance.",
      category: "Scholarships"
    },
    { 
      question: "Can I apply for multiple programs?", 
      answer: "Yes, you can apply for up to 3 programs through a single application. Please indicate your preference order during application.",
      category: "Application"
    }
  ];

  /* ---------------------- FEE TABLE (original rows preserved) ---------------------- */
  const feeRows = [
    { program: "B.Tech Programs", tuition: "₹2,50,000", hostel: "₹80,000", scholarships: "Merit & Need-based" },
    { program: "M.Tech Programs", tuition: "₹1,80,000", hostel: "₹80,000", scholarships: "GATE + Institute" },
    { program: "PhD Programs", tuition: "₹60,000", hostel: "₹80,000", scholarships: "Full Fellowship" },
    { program: "International Students", tuition: "USD 8,000", hostel: "₹1,20,000", scholarships: "Limited" }
  ];

  /* ---------------------- PROGRAM SELECTOR ---------------------- */
  const getPrograms = () => {
    switch (activeTab) {
      case "undergraduate":
        return undergraduatePrograms;
      case "postgraduate":
        return postgraduatePrograms;
      case "phd":
        return phdPrograms;
      case "international":
        return internationalPrograms;
      default:
        return undergraduatePrograms;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Red Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
        
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif animate-slide-down">
            Admissions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Begin Your Journey to Excellence - Shape Your Future at KNU
          </p>
          <div className={`w-32 h-1 bg-white mx-auto mb-12 transition-all duration-1000 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}></div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Admission Tabs */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-serif">
            Choose Your Path
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {admissionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === tab.id ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPrograms().map((program, index) => (
              <div
                key={`${activeTab}-${program.id}`}
                onClick={() => setSelectedProgram(index)}
                className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-2 ${selectedProgram === index ? 'ring-4 ring-red-500 ring-offset-2' : 'hover:shadow-xl'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-20`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{program.icon}</div>
                    <div className="text-sm font-semibold bg-white/80 px-3 py-1 rounded-full">
                      {program.seats} Seats
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {program.name}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">⏱️</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">🎯</span>
                      <span>{program.eligibility}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process Timeline */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-serif">
            Admission Process
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-red-300"></div>
            
            <div className="space-y-8">
              {admissionProcess.map((step, index) => (
                <div 
                  key={step.step}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <div className="flex items-center md:flex-col-reverse md:items-start">
                        <div className="text-3xl mr-4 md:mr-0 md:mt-4">{step.icon}</div>
                        <div>
                          <div className="text-sm font-semibold text-red-600 mb-1">STEP {step.step}</div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-gray-600 mb-2">{step.description}</p>
                          <div className="text-sm font-medium text-gray-500">{step.duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admission Statistics */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-serif">
            Admission Statistics 2024
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {admissionStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`text-4xl mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-10 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center font-serif">
            Fee Structure & Scholarships
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-4 text-left">Program</th>
                  <th className="p-4 text-left">Tuition Fee (Annual)</th>
                  <th className="p-4 text-left">Hostel Fee</th>
                  <th className="p-4 text-left">Scholarships Available</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium text-gray-900">{row.program}</td>
                    <td className="p-4 text-gray-700">{row.tuition}</td>
                    <td className="p-4 text-gray-700">{row.hostel}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {row.scholarships}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              40% of students receive financial assistance through various scholarships
            </p>

          </div>
        </div>

        {/* Brochure Download Section */}
        <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Brochure Info */}
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">📄</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
                    Official Brochure
                  </h3>
                </div>
                <p className="text-gray-700 text-lg mb-6">
                  Download our comprehensive admissions brochure to learn more about KNU CBE and explore all available programs.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Complete Program Details:</strong> All undergraduate, postgraduate & PhD programs</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Eligibility Criteria:</strong> Entry requirements for each program</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Fee Structure:</strong> Detailed breakdown of tuition and expenses</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Scholarship Information:</strong> Available financial aid options</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Campus Facilities:</strong> Infrastructure and amenities</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700"><strong>Student Life:</strong> Activities, clubs, and campus culture</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    window.open('/brochure.html', '_blank');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <span className="mr-2">📥</span>
                  View & Download Brochure
                </button>
              </div>

              {/* Brochure Preview */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs">
                  {/* Brochure Mock-up */}
                  <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6 mb-4 text-white aspect-video flex flex-col justify-between">
                      <div>
                        <div className="text-4xl font-bold font-serif mb-2">KNU CBE</div>
                        <div className="text-sm opacity-90">Admissions 2024-25</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">🎓</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                      <div className="pt-2">
                        <div className="text-xs text-gray-500">Complete information about</div>
                        <div className="text-xs text-gray-500">all academic programs</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-red-600 text-white rounded-full p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold">20+</div>
                      <div className="text-xs">Programs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-3">
                      {faq.category}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                  <span className="text-2xl">❓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Help Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              Need Help with Admission?
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our admission counselors are here to help you throughout the process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">📞</div>
              <h4 className="text-xl font-bold mb-2">Call Us</h4>
              <p className="opacity-90">+91-636-9891-287</p>
              <p className="text-sm opacity-80">Mon-Sat, 9 AM - 6 PM</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">✉️</div>
              <h4 className="text-xl font-bold mb-2">Email Us</h4>
              <p className="opacity-90">admissions@knucbe.ac.in</p>
              <p className="text-sm opacity-80">Response within 24 hours</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="text-xl font-bold mb-2">Visit Campus</h4>
              <p className="opacity-90">Admission Office, KNU CBE</p>
              <p className="text-sm opacity-80">Open for campus tours</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 mr-4">
              Download Brochure
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Schedule Campus Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
