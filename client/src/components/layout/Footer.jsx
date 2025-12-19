import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
   <footer className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {/* University Branding */}
      <div className="lg:col-span-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">KNU</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Knowledge Nexus
            </h3>
            <p className="text-sm text-gray-400 font-light">University</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Where knowledge connects innovation. Empowering future leaders through interdisciplinary education, research excellence, and global perspectives since 2005.
        </p>
        
        {/* Social Media */}
       {/* Social Media */}
<div className="flex space-x-3">
  {[
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      label: "Facebook",
      color: "hover:text-blue-500" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ), 
      label: "Twitter",
      color: "hover:text-blue-400" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      label: "LinkedIn",
      color: "hover:text-blue-600" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ), 
      label: "Instagram",
      color: "hover:text-pink-500" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      label: "YouTube",
      color: "hover:text-red-500" 
    }
  ].map((social, index) => (
    <button
      key={index}
      className={`text-gray-400 ${social.color} transition-colors duration-300 hover:scale-110`}
      title={social.label}
    >
      {social.icon}
    </button>
  ))}
</div>
      </div>

      {/* Academic Links */}
      <div>
        <h4 className="text-lg font-semibold mb-6 font-serif text-white border-l-4 border-red-600 pl-3">
          Academics
        </h4>
        <ul className="space-y-3">
          {[
            'Undergraduate Programs',
            'Postgraduate Studies', 
            'Research Centers',
            'Online Learning',
            'Faculty Directory',
            'Academic Calendar'
          ].map((item) => (
            <li key={item}>
              <button 
                className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Campus Life */}
      <div>
        <h4 className="text-lg font-semibold mb-6 font-serif text-white border-l-4 border-red-600 pl-3">
          Campus Life
        </h4>
        <ul className="space-y-3">
          {[
            'Student Clubs',
            'Sports Facilities',
            'Cultural Events',
            'Career Services',
            'Health & Wellness',
            'Accommodation'
          ].map((item) => (
            <li key={item}>
              <button 
                className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact & Newsletter */}
      <div>
        <h4 className="text-lg font-semibold mb-6 font-serif text-white border-l-4 border-red-600 pl-3">
          Get In Touch
        </h4>
        
        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-red-400 mt-1">📍</span>
            <div>
              <p className="text-white text-sm font-medium">Main Campus</p>
              <p className="text-gray-400 text-sm">123 Innovation Drive<br />Tech City, CBE-641001</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-red-400">📞</span>
            <div>
              <p className="text-white text-sm font-medium">+1 (555) 123-4567</p>
              <p className="text-gray-400 text-sm">Mon-Fri, 9AM-5PM</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-red-400">✉️</span>
            <div>
              <p className="text-white text-sm font-medium">info@knu.edu</p>
              <p className="text-gray-400 text-sm">Admissions: apply@knu.edu</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-white text-sm font-semibold mb-2">Stay Updated</p>
          <p className="text-gray-400 text-xs mb-3">Get latest news and updates</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg text-xs font-semibold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        {/* Copyright */}
        <div className="text-center lg:text-left">
          <p className="text-gray-400 text-sm">
            © 2025 <span className="text-red-400 font-semibold">Knowledge Nexus University</span>. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Empowering minds, connecting futures.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            'Privacy Policy',
            'Terms of Service', 
            'Accessibility',
            'Careers',
            'Sitemap',
            'Emergency Info'
          ].map((item) => (
            <button 
              key={item}
              className="text-gray-400 hover:text-red-400 text-xs transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Accreditation Badges */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 px-3 py-1 rounded-full">
            <span className="text-gray-300 text-xs font-semibold">NAAC A+</span>
          </div>
          <div className="bg-gray-800 px-3 py-1 rounded-full">
            <span className="text-gray-300 text-xs font-semibold">UGC Approved</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;