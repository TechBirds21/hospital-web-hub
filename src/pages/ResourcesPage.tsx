import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Video, Book, ExternalLink, Search, Star } from 'lucide-react';
import { apiService } from '../services/api';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'guide' | 'whitepaper' | 'case-study';
  downloadUrl: string;
  thumbnail: string;
  category: string;
  downloadCount: number;
  createdAt: string;
  rating: number;
  fileSize?: string;
  duration?: string;
  featured?: boolean;
}

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getResources();
        setResources(Array.isArray(data) ? data : [
          {
            id: '1',
            title: 'Hospverse Platform Overview 2024',
            description: 'Comprehensive guide covering all platform features, implementation strategies, and best practices for healthcare transformation.',
            type: 'pdf',
            downloadUrl: '/resources/platform-overview.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
            category: 'Product Guide',
            downloadCount: 2450,
            createdAt: '2024-01-15',
            rating: 4.9,
            fileSize: '2.3 MB',
            featured: true
          },
          {
            id: '2',
            title: 'Digital Transformation in Healthcare 2024',
            description: 'In-depth industry analysis of digital transformation trends, challenges, and opportunities in modern healthcare delivery.',
            type: 'whitepaper',
            downloadUrl: '/resources/digital-transformation.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
            category: 'Industry Report',
            downloadCount: 1890,
            createdAt: '2024-02-20',
            rating: 4.8,
            fileSize: '4.1 MB',
            featured: true
          },
          {
            id: '3',
            title: 'Implementation Best Practices Guide',
            description: 'Step-by-step implementation guide with proven strategies, common pitfalls to avoid, and success metrics for healthcare platforms.',
            type: 'guide',
            downloadUrl: '/resources/implementation-guide.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            category: 'Implementation',
            downloadCount: 1650,
            createdAt: '2024-03-10',
            rating: 4.7,
            fileSize: '3.8 MB'
          },
          {
            id: '4',
            title: 'Complete Platform Demo & Walkthrough',
            description: 'Comprehensive video demonstration showcasing all platform features, use cases, and real-world implementation examples.',
            type: 'video',
            downloadUrl: 'https://www.youtube.com/watch?v=demo',
            thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
            category: 'Demo',
            downloadCount: 3200,
            createdAt: '2024-03-25',
            rating: 4.9,
            duration: '32 min',
            featured: true
          },
          {
            id: '5',
            title: 'ROI Calculator & Business Analysis',
            description: 'Interactive calculator and detailed analysis framework for measuring return on investment and business impact of healthcare digitization.',
            type: 'pdf',
            downloadUrl: '/resources/roi-calculator.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
            category: 'Business Case',
            downloadCount: 1780,
            createdAt: '2024-04-05',
            rating: 4.6,
            fileSize: '1.9 MB'
          },
          {
            id: '6',
            title: 'Complete API Documentation & SDK',
            description: 'Comprehensive technical documentation including API references, SDK guides, and integration examples for developers.',
            type: 'guide',
            downloadUrl: '/resources/api-documentation.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
            category: 'Technical',
            downloadCount: 2100,
            createdAt: '2024-04-15',
            rating: 4.8,
            fileSize: '5.2 MB'
          },
          {
            id: '7',
            title: 'Apollo Hospitals Success Story',
            description: 'Detailed case study showing how Apollo Hospitals achieved 40% efficiency improvement and 25% cost reduction with Hospverse.',
            type: 'case-study',
            downloadUrl: '/resources/apollo-case-study.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
            category: 'Case Study',
            downloadCount: 1420,
            createdAt: '2024-04-20',
            rating: 4.9,
            fileSize: '2.7 MB',
            featured: true
          },
          {
            id: '8',
            title: 'Security & Compliance Framework',
            description: 'Comprehensive security documentation covering HIPAA compliance, data protection, and cybersecurity best practices.',
            type: 'whitepaper',
            downloadUrl: '/resources/security-compliance.pdf',
            thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
            category: 'Security',
            downloadCount: 980,
            createdAt: '2024-04-25',
            rating: 4.7,
            fileSize: '3.4 MB'
          }
        ]);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'guide':
        return Book;
      case 'whitepaper':
        return FileText;
      case 'case-study':
        return Star;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'case-study':
        return 'Case Study';
      case 'whitepaper':
        return 'White Paper';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleDownload = async (resource: Resource) => {
    try {
      if (resource.type === 'video') {
        window.open(resource.downloadUrl, '_blank');
      } else {
        // In a real implementation, this would track the download
        console.log(`Downloading: ${resource.title}`);
        // Simulate download tracking
        setResources(prev => prev.map(r => 
          r.id === resource.id 
            ? { ...r, downloadCount: r.downloadCount + 1 }
            : r
        ));
      }
    } catch (error) {
      console.error('Error downloading resource:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-teal-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Enhanced Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-2 rounded-full text-sm font-semibold mb-6"
            >
              📚 Knowledge Center
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Resources Hub
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Access our comprehensive library of guides, case studies, whitepapers, and video content 
              designed to accelerate your healthcare digital transformation journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Resources</h2>
            <p className="text-xl text-slate-600">Most popular and impactful content for healthcare transformation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredResources.map((resource, index) => {
              const IconComponent = getIcon(resource.type);
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-100"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                        <IconComponent className="h-4 w-4 text-slate-700" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(resource.rating) ? 'text-yellow-400 fill-current' : 'text-white/50'}`} />
                          ))}
                          <span className="text-white text-xs ml-1">{resource.rating}</span>
                        </div>
                        <span className="text-white text-xs">{resource.fileSize || resource.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                        {getTypeLabel(resource.type)}
                      </span>
                      <span className="text-xs text-slate-500">{resource.downloadCount.toLocaleString()} downloads</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(resource)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                    >
                      {resource.type === 'video' ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          <span>Watch Now</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category === 'all' ? 'All Resources' : category}
                  <span className="ml-2 text-sm opacity-75">
                    ({selectedCategory === category ? filteredResources.length : resources.filter(r => r.category === category).length})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => {
              const IconComponent = getIcon(resource.type);
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-medium rounded-full">
                        {resource.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                        <IconComponent className="h-5 w-5 text-slate-700" />
                      </div>
                    </div>
                    {resource.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold rounded-full">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                        {getTypeLabel(resource.type)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <span>{resource.downloadCount.toLocaleString()} downloads</span>
                      <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                      <span>{resource.fileSize || resource.duration}</span>
                    </div>

                    {/* Download Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(resource)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {resource.type === 'video' ? (
                        <>
                          <ExternalLink className="h-5 w-5" />
                          <span>Watch Now</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Download</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-slate-600 mb-4">No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Stay Ahead of Healthcare Innovation
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Get exclusive access to new resources, industry insights, and expert analysis delivered to your inbox. 
              Join 10,000+ healthcare leaders who trust our content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-slate-400 text-sm">
              ✨ Free resources • 📊 Industry insights • 🔒 Unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};