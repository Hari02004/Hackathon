import React, { useState, useEffect } from 'react';

function Research() {
  const [activeLab, setActiveLab] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [showPublications, setShowPublications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [selectedLab, setSelectedLab] = useState(0);

  const researchPublications = {
    0: [ // AI & ML Lab
      {
        id: 1,
        title: "Deep Learning Approaches for Natural Language Understanding",
        authors: "Dr. Rajesh Kumar, Prof. Priya Sharma, Dr. Amit Patel",
        journal: "IEEE Transactions on AI",
        year: 2024,
        citations: 45,
        topic: "Natural Language Processing",
        abstract: "A comprehensive study on transformer-based models for semantic understanding and contextual analysis.",
        doi: "10.1109/TAI.2024.001",
        downloads: 1240
      },
      {
        id: 2,
        title: "Explainable AI: Making Black Box Models Transparent",
        authors: "Dr. Neha Singh, Prof. Vikram Desai",
        journal: "Nature Machine Intelligence",
        year: 2023,
        citations: 78,
        topic: "Model Interpretability",
        abstract: "Novel methodology for interpreting deep neural networks using attention mechanisms.",
        doi: "10.1038/s42256.2023.045",
        downloads: 2100
      },
      {
        id: 3,
        title: "Generative Models for Image Synthesis and Enhancement",
        authors: "Dr. Arjun Malhotra, Dr. Sakshi Verma",
        journal: "International Conference on Computer Vision",
        year: 2024,
        citations: 32,
        topic: "Computer Vision",
        abstract: "Advanced GAN architectures for high-resolution image generation.",
        doi: "10.1145/ICCV.2024.234",
        downloads: 890
      },
      {
        id: 4,
        title: "Reinforcement Learning in Autonomous Systems",
        authors: "Prof. Rajesh Kumar, Dr. Anita Gupta",
        journal: "ACM Computing Surveys",
        year: 2023,
        citations: 56,
        topic: "Reinforcement Learning",
        abstract: "Survey of state-of-the-art reinforcement learning techniques for robotics applications.",
        doi: "10.1145/ACM.2023.089",
        downloads: 1567
      }
    ],
    1: [ // Sustainable Energy Lab
      {
        id: 5,
        title: "High-Efficiency Solar Cell Design with Perovskite Materials",
        authors: "Dr. Suresh Kumar, Dr. Meera Iyer",
        journal: "Solar Energy Materials & Solar Cells",
        year: 2024,
        citations: 23,
        topic: "Solar Power Optimization",
        abstract: "Novel perovskite compositions achieving 28% efficiency improvement.",
        doi: "10.1016/SOLMAT.2024.112",
        downloads: 567
      },
      {
        id: 6,
        title: "Smart Grid Management using IoT and AI",
        authors: "Dr. Prakash Nair, Prof. Divya Sharma",
        journal: "IEEE Power Systems Journal",
        year: 2023,
        citations: 41,
        topic: "Smart Grids",
        abstract: "Real-time grid optimization using machine learning algorithms.",
        doi: "10.1109/PSJ.2023.056",
        downloads: 1023
      },
      {
        id: 7,
        title: "Energy Storage Solutions for Renewable Integration",
        authors: "Dr. Vivek Mishra, Dr. Anjali Patel",
        journal: "Energy Storage Review",
        year: 2024,
        citations: 18,
        topic: "Energy Storage",
        abstract: "Battery technologies and hybrid storage systems for grid stability.",
        doi: "10.1016/ENERGY.2024.078",
        downloads: 734
      }
    ],
    2: [ // Biotech Lab
      {
        id: 8,
        title: "Gene Therapy Approaches for Inherited Disorders",
        authors: "Dr. Kavya Reddy, Prof. Anil Kumar",
        journal: "Nature Biotechnology",
        year: 2024,
        citations: 112,
        topic: "Genomic Research",
        abstract: "Novel CRISPR applications for treatment of genetic diseases.",
        doi: "10.1038/nbt.2024.045",
        downloads: 3456
      },
      {
        id: 9,
        title: "Personalized Medicine Using Genomic Data",
        authors: "Dr. Sanjana Gupta, Prof. Rajesh Patel",
        journal: "The Lancet Genomics",
        year: 2023,
        citations: 89,
        topic: "Genomic Research",
        abstract: "AI-driven analysis of whole genome sequences for personalized treatment plans.",
        doi: "10.1016/LANCET.2023.089",
        downloads: 2789
      },
      {
        id: 10,
        title: "Telemedicine Platform for Rural Healthcare",
        authors: "Dr. Priya Sharma, Dr. Vikram Singh",
        journal: "Digital Health Journal",
        year: 2024,
        citations: 34,
        topic: "Telemedicine",
        abstract: "IoT-enabled remote patient monitoring and diagnosis system.",
        doi: "10.1145/DHJ.2024.067",
        downloads: 1245
      },
      {
        id: 11,
        title: "Drug Discovery Using Machine Learning Models",
        authors: "Dr. Ananya Das, Prof. Mohan Reddy",
        journal: "Chemical Reviews",
        year: 2023,
        citations: 76,
        topic: "Drug Discovery",
        abstract: "ML pipelines for accelerated drug compound screening.",
        doi: "10.1021/CR.2023.056",
        downloads: 2134
      }
    ],
    3: [ // Quantum Lab
      {
        id: 12,
        title: "Quantum Algorithm Development for Optimization Problems",
        authors: "Dr. Arjun Sharma, Prof. Deepak Kumar",
        journal: "Quantum Information Processing",
        year: 2024,
        citations: 28,
        topic: "Quantum Algorithms",
        abstract: "Novel quantum algorithms solving NP-hard problems efficiently.",
        doi: "10.1007/QIP.2024.123",
        downloads: 890
      },
      {
        id: 13,
        title: "Quantum Cryptography Protocols for Secure Communication",
        authors: "Dr. Neha Verma, Prof. Rohit Patel",
        journal: "IEEE Quantum Electronics",
        year: 2023,
        citations: 45,
        topic: "Quantum Cryptography",
        abstract: "Implementation of BB84 and E91 protocols on quantum hardware.",
        doi: "10.1109/QE.2023.078",
        downloads: 1345
      },
      {
        id: 14,
        title: "Quantum Error Correction: Current Challenges and Solutions",
        authors: "Prof. Ashok Kumar, Dr. Sneha Sharma",
        journal: "Reviews of Modern Physics",
        year: 2024,
        citations: 52,
        topic: "Quantum Hardware",
        abstract: "Comprehensive review of error correction codes for quantum computers.",
        doi: "10.1103/RMP.2024.089",
        downloads: 2567
      }
    ]
  };

const researchLabs = [
  {
    id: 0,
    title: "Artificial Intelligence & Machine Learning Lab",
    image: "/images/research-1.jpg",
    icon: "🤖",
    description: "Advancing intelligent systems through deep learning, neural networks, and cognitive computing for real-world applications.",
    focusAreas: [
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
      "Generative AI"
    ],
    achievements: "50+ Research Papers | 10 Patents",
    color: "from-blue-100 to-blue-200"
  },
  {
    id: 1,
    title: "Sustainable Energy Research Center",
    image: "/images/research-2.jpg",
    icon: "⚡",
    description: "Developing renewable energy solutions, energy storage systems, and green technologies for a sustainable future.",
    focusAreas: [
      "Solar Power Optimization",
      "Wind Energy Systems",
      "Energy Storage",
      "Smart Grids"
    ],
    achievements: "15 Industry Projects | 8 Innovations",
    color: "from-green-100 to-green-200"
  },
  {
    id: 2,
    title: "Biotechnology & Healthcare Innovation Lab",
    image: "/images/research-3.jpg",
    icon: "🧬",
    description: "Pioneering medical research, drug discovery, and healthcare technologies for improved human wellbeing.",
    focusAreas: [
      "Drug Discovery",
      "Medical Devices",
      "Genomic Research",
      "Telemedicine"
    ],
    achievements: "30 Clinical Trials | 5 FDA Approvals",
    color: "from-purple-100 to-purple-200"
  },
  {
    id: 3,
    title: "Quantum Computing Research Facility",
    image: "/images/research-4.jpg",
    icon: "⚛️",
    description: "Exploring quantum algorithms, quantum cryptography, and next-generation computing paradigms.",
    focusAreas: [
      "Quantum Algorithms",
      "Quantum Cryptography",
      "Quantum Simulation",
      "Quantum Hardware"
    ],
    achievements: "3 Quantum Prototypes | 20+ Publications",
    color: "from-red-100 to-red-200"
  }
];

  // Floating animation toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Hero Section */}
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
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif animate-slide-down">
            Research & Innovation
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Where Discovery Meets Impact - Transforming Ideas into Reality
          </p>
          <div className={`w-32 h-1 bg-white mx-auto mb-12 transition-all duration-1000 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}></div>
        </div>
      </div>

      {/* Interactive Research Labs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Cutting-Edge Research Facilities
          </h2>
          <p className="text-gray-600 text-lg">
            Select a lab to explore groundbreaking research
          </p>
        </div>

        {/* Lab Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {researchLabs.map((lab, index) => (
            <button
              key={lab.id}
              onClick={() => setActiveLab(index)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 transform hover:-translate-y-2 ${
                activeLab === index 
                  ? 'ring-4 ring-red-500 ring-offset-2 scale-105' 
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-10`}></div>
              
              {/* Icon with Animation */}
              <div className={`text-5xl mb-4 transition-transform duration-500 ${
                activeLab === index ? 'scale-125 rotate-12' : ''
              }`}>
                {lab.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {lab.title.split(' ')[0]} {lab.title.split(' ')[1]}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {lab.description.substring(0, 80)}...
              </p>
              
              {/* Active Indicator */}
              {activeLab === index && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active Lab Showcase */}
        <div className="relative mb-20">
          {/* Animated Border */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${researchLabs[activeLab].color} rounded-3xl blur opacity-30 transition-all duration-1000`}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Image Side with Parallax Effect */}
              <div className="md:w-2/5 relative overflow-hidden">
                <div 
                  className="h-80 md:h-full bg-cover bg-center transition-all duration-700"
                  style={{
                    backgroundImage: `url(${researchLabs[activeLab].image})`,
                    transform: animate ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">
                    {researchLabs[activeLab].achievements}
                  </div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
                    {researchLabs[activeLab].title}
                  </h3>
                  <div className="text-4xl animate-bounce">
                    {researchLabs[activeLab].icon}
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {researchLabs[activeLab].description}
                </p>
                
                {/* Focus Areas with Animation */}
                <div className="mb-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Research Focus Areas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {researchLabs[activeLab].focusAreas.map((area, index) => (
                      <div 
                        key={index}
                        className={`bg-gradient-to-r ${researchLabs[activeLab].color} bg-opacity-10 rounded-xl p-4 transition-all duration-300 transform hover:translate-x-2 ${
                          animate ? 'border-l-4 border-red-500' : ''
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center">
                          <span className="text-red-500 mr-3">🔬</span>
                          <span className="font-medium text-gray-800">{area}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setShowPublications(true);
                      setSelectedLab(activeLab);
                      setSearchTerm('');
                      setFilterYear('all');
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Research Publications
                  </button>
                  <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                    Collaborate With Lab
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Metrics with Counting Animation */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-serif">
            Research Impact Metrics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "📊", value: "500+", label: "Research Papers", color: "text-blue-300" },
              { icon: "🏆", value: "50+", label: "Patents Filed", color: "text-green-300" },
              { icon: "🤝", value: "100+", label: "Industry Projects", color: "text-yellow-300" },
              { icon: "🌍", value: "30+", label: "Countries", color: "text-pink-300" },
              { icon: "👨‍🔬", value: "200+", label: "Researchers", color: "text-purple-300" },
              { icon: "💰", value: "$10M+", label: "Research Grants", color: "text-red-300" },
              { icon: "🎓", value: "1000+", label: "Research Scholars", color: "text-indigo-300" },
              { icon: "🏛️", value: "25+", label: "Labs & Centers", color: "text-teal-300" }
            ].map((metric, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`text-4xl mb-3 animate-bounce ${metric.color}`} style={{ animationDelay: `${index * 0.2}s` }}>
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm opacity-90">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Research Process */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Research Innovation Pipeline
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-red-300"></div>
            
            <div className="space-y-12">
              {[
                { step: "1", title: "Idea Generation", desc: "Brainstorming and conceptualization of research problems", icon: "💡" },
                { step: "2", title: "Literature Review", desc: "Comprehensive study of existing research and gaps", icon: "📚" },
                { step: "3", title: "Hypothesis Formulation", desc: "Developing testable research hypotheses", icon: "🧪" },
                { step: "4", title: "Experiment Design", desc: "Creating methodology and experimental setup", icon: "🔬" },
                { step: "5", title: "Data Collection", desc: "Gathering and documenting research data", icon: "📊" },
                { step: "6", title: "Analysis & Results", desc: "Statistical analysis and result interpretation", icon: "📈" },
                { step: "7", title: "Publication", desc: "Documenting findings in research papers", icon: "📝" },
                { step: "8", title: "Implementation", desc: "Applying research to real-world solutions", icon: "🚀" }
              ].map((process, index) => (
                <div 
                  key={index}
                  className="relative flex flex-col md:flex-row items-center"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Left Side for Even, Right Side for Odd */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}>
                      <div className="flex items-center md:flex-col-reverse md:items-start">
                        <div className="text-3xl mr-4 md:mr-0 md:mt-4">{process.icon}</div>
                        <div>
                          <div className="text-sm font-semibold text-red-600 mb-1">STEP {process.step}</div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h4>
                          <p className="text-gray-600">{process.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                  
                  {/* Right Side Placeholder */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publications Modal */}
        {showPublications && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-t-3xl sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{researchLabs[selectedLab].title}</h2>
                    <p className="opacity-90 mt-1">Research Publications & Papers</p>
                  </div>
                  <button 
                    onClick={() => setShowPublications(false)}
                    className="text-2xl hover:opacity-70 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>

              {/* Publications List */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {researchPublications[selectedLab]
                  .filter(pub => {
                    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesYear = filterYear === 'all' || pub.year.toString() === filterYear;
                    return matchesSearch && matchesYear;
                  })
                  .map((publication, idx) => (
                    <div 
                      key={idx}
                      className="mb-6 pb-6 border-b border-gray-200 hover:bg-gray-50 p-4 rounded-lg transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 flex-1 pr-4">{publication.title}</h3>
                        <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full whitespace-nowrap">
                          {publication.year}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Authors:</span> {publication.authors}
                      </p>

                      <p className="text-sm text-gray-700 mb-3">
                        {publication.abstract}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                        <div className="bg-blue-50 p-2 rounded">
                          <span className="text-gray-600">Journal:</span><br/>
                          <span className="font-semibold text-blue-900">{publication.journal}</span>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <span className="text-gray-600">Citations:</span><br/>
                          <span className="font-semibold text-green-900">{publication.citations}</span>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <span className="text-gray-600">Topic:</span><br/>
                          <span className="font-semibold text-purple-900">{publication.topic}</span>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                          <span className="text-gray-600">Downloads:</span><br/>
                          <span className="font-semibold text-orange-900">{publication.downloads}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button className="text-sm bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1 rounded-lg transition">
                          📄 View Abstract
                        </button>
                        <button className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-lg transition">
                          🔗 DOI: {publication.doi}
                        </button>
                        <button className="text-sm bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-lg transition">
                          📥 Download PDF
                        </button>
                      </div>
                    </div>
                  ))}

                {researchPublications[selectedLab].filter(pub => {
                  const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesYear = filterYear === 'all' || pub.year.toString() === filterYear;
                  return matchesSearch && matchesYear;
                }).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No publications found matching your criteria.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Total Publications: {researchPublications[selectedLab].length}
                </p>
                <button 
                  onClick={() => setShowPublications(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Research;