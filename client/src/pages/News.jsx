import React, { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [animate, setAnimate] = useState(false);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    setAnimate(true);
    
    // Fetch news from backend API
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/news`);
        const data = await response.json();
        setNews(data);
        setFilteredNews(data);
        setFeaturedNews(data.filter(item => item.featured).slice(0, 2));
        if (data.length > 0) {
          setSelectedNews(data[0]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to sample data if API fails
        setNews(sampleNews);
        setFilteredNews(sampleNews);
        setFeaturedNews(sampleNews.filter(item => item.featured).slice(0, 2));
        setSelectedNews(sampleNews[0]);
      }
    };

    // Fetch categories from sample data
    const fetchCategories = () => {
      // Use categories from sample data since backend doesn't have a categories endpoint
      setCategories([
        { id: 0, name: 'All', count: news.length },
        { id: 1, name: 'Achievement', count: 2 },
        { id: 2, name: 'Research', count: 2 },
        { id: 3, name: 'Campus', count: 2 },
        { id: 4, name: 'Alumni', count: 1 },
        { id: 5, name: 'Placements', count: 1 },
        { id: 6, name: 'Partnership', count: 1 },
        { id: 7, name: 'International', count: 1 }
      ]);
    };

    fetchNews();
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.category === activeCategory));
    }
  }, [activeCategory, news]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Fallback sample data
  const sampleNews = [
    {
      id: 1,
      title: "Knowledge Nexus University Ranks Among Top 10 in National Rankings",
      description: "University secures 8th position in NIRF 2024, climbing three positions from last year with excellence in teaching and research.",
      content: "Knowledge Nexus University has achieved a remarkable milestone by securing the 8th position in the prestigious National Institutional Ranking Framework (NIRF) 2024. This represents a significant climb of three positions from last year's ranking.\n\nThe university's exceptional performance can be attributed to several factors including teaching excellence, research productivity, industry collaboration, and state-of-the-art campus infrastructure.\n\nVice-Chancellor Dr. Rajesh Kumar stated, 'This achievement reflects our commitment to academic excellence and innovation. We will continue to focus on research-led teaching and industry partnerships to maintain our position among the top institutions.'",
      date: "2024-03-10",
      category: "Achievement",
      image: "ranking-achievement.jpg",
      author: "University Communications",
      featured: true,
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Research Center for Artificial Intelligence Inaugurated",
      description: "State-of-the-art AI research center established with ₹50 crore funding, focusing on machine learning and data science innovations.",
      content: "Knowledge Nexus University has inaugurated a state-of-the-art Artificial Intelligence Research Center with an investment of ₹50 crore. The center will focus on cutting-edge research in machine learning, natural language processing, computer vision, and data science.\n\nThe facility houses advanced computing resources including high-performance GPU clusters, dedicated research labs, and collaboration spaces for industry partnerships.\n\nDr. Priya Sharma, Director of the new center, said, 'This center will serve as a hub for AI innovation and will collaborate with leading tech companies to solve real-world problems through artificial intelligence.'",
      date: "2024-03-05",
      category: "Research",
      image: "ai-research-center.jpg",
      author: "Research Department",
      featured: true,
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "University Signs MoU with Global Tech Giants",
      description: "Partnership agreements signed with Microsoft, Google, and IBM for collaborative research and student internship programs.",
      content: "Knowledge Nexus University has signed Memorandum of Understanding (MoU) agreements with three global technology giants: Microsoft, Google, and IBM. These partnerships aim to enhance collaborative research, faculty development, and student internship opportunities.\n\nThe agreements will provide students with hands-on experience in emerging technologies and access to industry experts through guest lectures and workshops.\n\nIndustry collaborations will focus on areas such as cloud computing, AI ethics, quantum computing, and sustainable technology solutions.",
      date: "2024-02-28",
      category: "Partnership",
      image: "industry-mou.jpg",
      author: "Industry Relations",
      featured: false,
      readTime: "2 min read"
    },
    {
      id: 4,
      title: "Students Win International Robotics Competition",
      description: "Team 'InnovateX' wins first prize at International Robotics Championship in Singapore with autonomous navigation system.",
      content: "Team 'InnovateX' from Knowledge Nexus University has won the first prize at the International Robotics Championship held in Singapore. The team developed an innovative autonomous robot that can navigate complex environments using advanced AI algorithms.\n\nThe competition featured 120 teams from 40 countries, with the university team standing out for their innovative approach to autonomous navigation and obstacle avoidance.\n\nTeam leader Rohan Mehta said, 'Our success is a testament to the excellent research facilities and mentorship available at our university. We're proud to bring this honor to our institution.'",
      date: "2024-02-20",
      category: "Achievement",
      image: "robotics-win.jpg",
      author: "Student Affairs",
      featured: false,
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "New Sustainable Campus Initiative Launched",
      description: "University launches 'Green Campus 2030' initiative aiming for carbon neutrality with solar power and waste management systems.",
      content: "Knowledge Nexus University has launched the 'Green Campus 2030' initiative with the goal of achieving carbon neutrality by 2030. The comprehensive sustainability program includes installation of solar panels, rainwater harvesting systems, and advanced waste management infrastructure.\n\nThe initiative will reduce the campus carbon footprint by 60% in the first phase and achieve complete carbon neutrality by 2030 through various sustainable practices.\n\nEnvironmental sustainability is now integrated into the curriculum, with new courses and research programs focused on green technologies.",
      date: "2024-02-15",
      category: "Campus",
      image: "green-campus.jpg",
      author: "Administration",
      featured: false,
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Alumni Donates ₹10 Crore for Scholarship Program",
      description: "Successful alumnus Mr. Rajesh Mehta contributes ₹10 crore to establish merit-cum-means scholarship for underprivileged students.",
      content: "Mr. Rajesh Mehta, a distinguished alumnus from the Class of 1995, has donated ₹10 crore to establish the 'Mehta Merit-cum-Means Scholarship' program. The scholarship will support 100 students annually from economically disadvantaged backgrounds.\n\nMr. Mehta, who is now the CEO of a leading technology company, said, 'Knowledge Nexus University gave me the foundation for my career. I want to ensure that talented students from all backgrounds have access to the same quality education.'\n\nThe scholarship will cover tuition fees, accommodation, and living expenses for deserving students.",
      date: "2024-02-10",
      category: "Alumni",
      image: "alumni-donation.jpg",
      author: "Alumni Relations",
      featured: true,
      readTime: "2 min read"
    },
    {
      id: 7,
      title: "International Student Exchange Program Expanded",
      description: "University partners with 15 new international universities for student and faculty exchange programs across 10 countries.",
      content: "Knowledge Nexus University has expanded its International Student Exchange Program by partnering with 15 new universities across 10 countries. The expansion includes institutions in the USA, UK, Germany, Japan, Australia, and Singapore.\n\nThe enhanced program will allow 200 additional students annually to participate in semester-long exchange programs, providing them with global exposure and cross-cultural learning experiences.\n\nFaculty exchange programs will also be strengthened, enabling collaborative research and knowledge sharing with international counterparts.",
      date: "2024-02-05",
      category: "International",
      image: "student-exchange.jpg",
      author: "International Office",
      featured: false,
      readTime: "2 min read"
    },
    {
      id: 8,
      title: "Campus Placement Record: 95% Students Placed",
      description: "University achieves 95% placement rate with highest package of ₹50 LPA and average package of ₹15 LPA.",
      content: "Knowledge Nexus University has achieved a remarkable 95% placement rate for the 2023-24 academic year, with the highest package reaching ₹50 LPA and average package of ₹15 LPA.\n\nOver 200 companies participated in the placement drive, offering diverse roles in technology, consulting, finance, research, and management sectors.\n\nThe Placement Cell organized 50+ training sessions, mock interviews, and career counseling workshops to prepare students for the recruitment process.\n\nTop recruiters included Google, Microsoft, Amazon, Goldman Sachs, McKinsey, and several leading Indian startups.",
      date: "2024-01-25",
      category: "Placements",
      image: "placement-record.jpg",
      author: "Placement Cell",
      featured: true,
      readTime: "4 min read"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-serif">Loading News...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section - RED Theme */}
      <div className="relative overflow-hidden bg-linear-to-r from-red-600 to-red-800 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-serif animate-slide-down">
            University News
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0 animate-slide-up">
            Stay Updated with Latest Achievements, Research, and Campus Developments
          </p>
          <div className={`w-24 sm:w-32 h-1 bg-white mx-auto mb-8 sm:mb-12 transition-all duration-1000 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}></div>
        
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20">
        {/* Categories Filter - RED Theme */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center font-serif px-2">
            News Categories
          </h3>
          
          {/* Scrollable categories for mobile */}
          <div className="overflow-x-auto pb-2 sm:pb-0 -mx-3 sm:mx-0">
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 px-3 sm:px-0 min-w-max sm:min-w-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    activeCategory === category.name
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 sm:ml-2 text-xs opacity-80">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured News Banner - RED Theme */}
        {featuredNews.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif px-2 sm:px-0">
              Featured News
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {featuredNews.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-red-600 to-red-700 opacity-90"></div>
                  
                  <div className="relative z-10 p-4 sm:p-6 md:p-8 text-white">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm font-semibold">
                        Featured
                      </span>
                      <span className="text-base sm:text-lg">📰</span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 font-serif">
                      {newsItem.title}
                    </h3>
                    
                    <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                      {newsItem.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">📅</span>
                        <span className="text-sm sm:text-base">{formatDate(newsItem.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">👤</span>
                        <span className="text-sm sm:text-base">{newsItem.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4 sm:mb-6">
                      <span className="mr-2 text-sm">🏷️</span>
                      <span className="font-medium text-sm sm:text-base">{newsItem.category}</span>
                    </div>
                    
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
                      Read Full Story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Grid - RED Theme */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center font-serif px-2 sm:px-0">
            Latest News
            <span className="ml-2 text-red-600">({filteredNews.length})</span>
          </h3>
          
          {filteredNews.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-red-500">📰</div>
              <h4 className="text-lg sm:text-2xl font-bold text-gray-700 mb-2">
                No news found in this category
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Check back soon for new updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredNews.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  {/* News Image with RED gradient */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-red-500 to-red-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl opacity-20">
                      {newsItem.category === 'Achievement' ? '🏆' : 
                       newsItem.category === 'Research' ? '🔬' :
                       newsItem.category === 'Campus' ? '🏛️' :
                       newsItem.category === 'Alumni' ? '👨‍🎓' :
                       newsItem.category === 'Placements' ? '💼' :
                       newsItem.category === 'Partnership' ? '🤝' :
                       newsItem.category === 'International' ? '🌍' : '📰'}
                    </div>
                    
                    {/* Featured Badge */}
                    {newsItem.featured && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-red-800">
                        {newsItem.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* News Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 font-serif line-clamp-2">
                        {newsItem.title}
                      </h4>
                    </div>
                    
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                      {newsItem.description}
                    </p>
                    
                    {/* News Details */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center text-gray-700">
                        <span className="mr-2 sm:mr-3 text-red-600 text-sm sm:text-base">📅</span>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{formatDate(newsItem.date)}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{newsItem.readTime || '2 min read'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <span className="mr-2 sm:mr-3 text-red-600 text-sm sm:text-base">👤</span>
                        <div>
                          <div className="font-medium text-sm sm:text-base">Author</div>
                          <div className="text-xs sm:text-sm text-gray-500">{newsItem.author}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected News Detail View - RED Theme */}
        {selectedNews && (
          <div className="mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-red-100 text-red-800 rounded-full text-sm sm:text-base font-semibold mb-2">
                      {selectedNews.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-serif">
                      {selectedNews.title}
                    </h3>
                  </div>
                  {selectedNews.featured && (
                    <span className="text-yellow-500 text-2xl sm:text-3xl mt-2 sm:mt-0">⭐</span>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-8 text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2 text-red-600">📅</span>
                    <span className="text-sm sm:text-base">{formatDate(selectedNews.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-red-600">👤</span>
                    <span className="text-sm sm:text-base">{selectedNews.author}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-red-600">⏱️</span>
                    <span className="text-sm sm:text-base">{selectedNews.readTime || '3 min read'}</span>
                  </div>
                </div>
                
                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {selectedNews.description}
                  </p>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
                    Full Story
                  </h4>
                  <div className="text-gray-700 whitespace-pre-line text-sm sm:text-base">
                    {selectedNews.content}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base">
                    Share This Story
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Press & Media Section - RED Theme */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center font-serif px-2 sm:px-0">
            Press & Media Coverage
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { outlet: "The Times of India", date: "March 5, 2024", headline: "University's AI Research Breakthrough", icon: "📰" },
              { outlet: "BBC News", date: "February 28, 2024", headline: "Sustainable Campus Initiative", icon: "🌍" },
              { outlet: "Economic Times", date: "February 20, 2024", headline: "Record Placement Season", icon: "💼" },
              { outlet: "Forbes", date: "February 15, 2024", headline: "Alumni Success Stories", icon: "🏆" }
            ].map((media, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-red-600">
                  {media.icon}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {media.outlet}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  {media.headline}
                </p>
                <div className="text-xs sm:text-sm text-gray-500">
                  Published: {media.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - RED Theme */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-linear-to-r from-red-600 to-red-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-serif text-center">
              Media & Press Inquiries
            </h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-8 max-w-2xl mx-auto opacity-90 text-center px-2">
              For media inquiries, press releases, or interview requests, contact our communications team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-white text-red-600 hover:bg-gray-100 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Contact Press Office
              </button>
              <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base">
                Download Media Kit
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup - RED Theme */}
        <div className="bg-linear-to-r from-red-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base px-2">
            Get the latest news and updates from Knowledge Nexus University directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;