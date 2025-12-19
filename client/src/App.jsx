import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Academics from './pages/Academics'
import Research from './pages/Research'
import CampusLife from './pages/CampusLife'
import Alumni from './pages/Alumni'
import Admissions from './pages/Admissions'
import Events from './pages/Events'
import News from './pages/News'
import Profile from './pages/Profile'
import VirtualTour from './pages/VirtualTour'
import AdminDashboard from './components/admin/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/research" element={<Research />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/virtual-tour" element={<VirtualTour />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}


export default App