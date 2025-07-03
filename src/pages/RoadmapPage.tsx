import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, ArrowRight, Zap, Users, Shield, Globe, Sparkles, Brain, Rocket } from 'lucide-react';
import { apiService } from '../services/api';

interface RoadmapItem {
  id: string;
  version: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter: string;
  year: number;
  features: string[];
  icon: string;
  progress: number;
  expectedImpact: string;
  keyMetrics: {
    efficiency: string;
    userExperience: string;
    reliability: string;
  };
}

export const RoadmapPage: React.FC = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleJoinPilot = () => {
    navigate('/contact', { state: { fromBookDemo: true } });
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getRoadmap();
        setRoadmapItems(Array.isArray(data) ? data : [
          {
            id: '1',
            version: 'Phase 1',
            title: 'Foundation Development',
            description: 'Core platform development and initial AI algorithm implementation. Setting up the foundation for our healthcare management system with basic features.',
            status: 'completed',
            quarter: 'Q1-Q2',
            year: 2025,
            progress: 100,
            expectedImpact: 'Established solid foundation for AI-powered healthcare platform',
            features: [
              'Core platform architecture development',
              'Basic AI algorithms for healthcare applications',
              'Initial database design and setup',
              'Security framework implementation',
              'Basic user interface development',
              'Development team setup in Hyderabad'
            ],
            icon: 'CheckCircle',
            keyMetrics: {
              efficiency: 'Foundation',
              userExperience: 'Basic',
              reliability: 'Stable'
            }
          },
          {
            id: '2',
            version: 'Pilot Launch',
            title: 'Pilot Program Launch',
            description: 'Launch our pilot program with 25+ interested healthcare providers. Real-world testing and feedback collection to refine our AI-powered features.',
            status: 'in-progress',
            quarter: 'July-August',
            year: 2025,
            progress: 75,
            expectedImpact: 'Real-world validation and system optimization based on actual healthcare provider feedback',
            features: [
              'Pilot program launch with 25+ healthcare providers',
              'AI-powered patient management system',
              'Intelligent appointment scheduling',
              'Basic analytics and reporting',
              'Multi-specialty support (Hospital, Dental, Dermatology)',
              'Feedback collection and iterative improvements'
            ],
            icon: 'Brain',
            keyMetrics: {
              efficiency: '+30%',
              userExperience: '4.5/5',
              reliability: '99%'
            }
          },
          {
            id: '3',
            version: 'V1.0',
            title: 'Full Platform Launch',
            description: 'Complete platform launch with enhanced AI capabilities based on pilot feedback. Ready for broader healthcare market adoption.',
            status: 'planned',
            quarter: 'Q4',
            year: 2025,
            progress: 25,
            expectedImpact: 'Market-ready AI healthcare platform with proven results from pilot program',
            features: [
              'Full AI-powered healthcare management platform',
              'Advanced predictive analytics',
              'Comprehensive reporting dashboard',
              'Enhanced security and compliance features',
              'Mobile applications for iOS and Android',
              'API ecosystem for integrations'
            ],
            icon: 'Rocket',
            keyMetrics: {
              efficiency: '+50%',
              userExperience: '4.8/5',
              reliability: '99.5%'
            }
          },
          {
            id: '4',
            version: 'V2.0',
            title: 'Advanced AI Features',
            description: 'Next-generation AI capabilities including computer vision for medical imaging, advanced machine learning models, and predictive healthcare analytics.',
            status: 'planned',
            quarter: 'Q2',
            year: 2026,
            progress: 10,
            expectedImpact: 'Revolutionary AI-driven healthcare insights and automation',
            features: [
              'Computer vision for medical imaging analysis',
              'Advanced machine learning for diagnosis support',
              'Predictive healthcare analytics',
              'Voice-enabled AI assistant',
              'Automated clinical documentation',
              'AI-powered treatment recommendations'
            ],
            icon: 'Brain',
            keyMetrics: {
              efficiency: '+80%',
              userExperience: '5.0/5',
              reliability: '99.9%'
            }
          },
          {
            id: '5',
            version: 'Scale',
            title: 'National Expansion',
            description: 'Expand across India with regional healthcare networks, government partnerships, and large-scale deployment of AI healthcare technology.',
            status: 'planned',
            quarter: 'Q1',
            year: 2027,
            progress: 5,
            expectedImpact: 'Transform healthcare delivery across India with AI technology',
            features: [
              'Multi-state healthcare network integration',
              'Government healthcare system partnerships',
              'Regional language support and localization',
              'Large-scale AI deployment infrastructure',
              'Healthcare data analytics at population level',
              'Integration with national health programs'
            ],
            icon: 'Globe',
            keyMetrics: {
              efficiency: '+100%',
              userExperience: '5.0/5',
              reliability: '99.99%'
            }
          }
        ]);
      } catch (error) {
        console.error('Error fetching roadmap:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      CheckCircle,
      Clock,
      Zap,
      Users,
      Shield,
      Globe,
      Brain,
      Sparkles,
      Rocket
    };
    return icons[iconName as keyof typeof icons] || Clock;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-600 to-emerald-500';
      case 'in-progress':
        return 'from-blue-600 to-blue-500';
      case 'planned':
        return 'from-slate-600 to-slate-500';
      default:
        return 'from-slate-600 to-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Planned';
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
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
          />
        </div>

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
              🚀 Development Roadmap - Made in Hyderabad
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Our Development Journey
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                From Concept to AI Healthcare Leader
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Follow our journey from initial development in 2025 to becoming India's leading AI-powered 
              healthcare platform. See how we're building the future of healthcare technology in Hyderabad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500 via-blue-500 to-slate-300 rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {roadmapItems.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Enhanced Timeline Dot */}
                    <motion.div 
                      className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-white border-4 border-teal-500 rounded-full z-10 shadow-lg"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="absolute inset-1 bg-teal-500 rounded-full"></div>
                    </motion.div>

                    {/* Enhanced Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                      <motion.div 
                        className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 border border-slate-100"
                        whileHover={{ scale: 1.02, y: -5 }}
                        onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className={`p-4 bg-gradient-to-r ${getStatusColor(item.status)} rounded-2xl shadow-lg`}
                              whileHover={{ rotate: 5 }}
                            >
                              <IconComponent className="h-8 w-8 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-3xl font-bold text-slate-800">{item.version}</h3>
                              <p className="text-slate-500 font-medium">{item.quarter} {item.year}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(item.status)} text-white text-sm font-bold rounded-full shadow-lg`}>
                              {getStatusText(item.status)}
                            </span>
                            {item.status === 'in-progress' && (
                              <div className="mt-2">
                                <div className="w-24 bg-slate-200 rounded-full h-2">
                                  <motion.div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                  ></motion.div>
                                </div>
                                <div className="text-xs text-slate-600 mt-1">{item.progress}% Complete</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h4>
                        <p className="text-slate-600 mb-6 leading-relaxed text-lg">{item.description}</p>

                        {/* Impact Statement */}
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl mb-6">
                          <h5 className="font-semibold text-slate-800 mb-2">Expected Impact</h5>
                          <p className="text-slate-700">{item.expectedImpact}</p>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <div className="text-lg font-bold text-teal-600">{item.keyMetrics.efficiency}</div>
                            <div className="text-xs text-slate-600">Efficiency</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <div className="text-lg font-bold text-blue-600">{item.keyMetrics.userExperience}</div>
                            <div className="text-xs text-slate-600">User Experience</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <div className="text-lg font-bold text-green-600">{item.keyMetrics.reliability}</div>
                            <div className="text-xs text-slate-600">Reliability</div>
                          </div>
                        </div>

                        {/* Features */}
                        <motion.div
                          initial={{ height: selectedItem === item.id ? 'auto' : 0 }}
                          animate={{ height: selectedItem === item.id ? 'auto' : 0 }}
                          className="overflow-hidden"
                        >
                          <h5 className="text-xl font-bold text-slate-800 mb-4">Key Features & Milestones</h5>
                          <div className="space-y-3">
                            {item.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: selectedItem === item.id ? 1 : 0, x: selectedItem === item.id ? 0 : -20 }}
                                transition={{ delay: featureIndex * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                {item.status === 'completed' ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2.5 flex-shrink-0"></div>
                                )}
                                <span className="text-slate-700 leading-relaxed">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center space-x-2"
                          >
                            <span>{selectedItem === item.id ? 'Hide Details' : 'View Details'}</span>
                            <ArrowRight className={`h-4 w-4 transition-transform ${selectedItem === item.id ? 'rotate-90' : ''}`} />
                          </motion.button>
                          
                          {item.status === 'in-progress' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              Follow Progress
                            </motion.button>
                          )}
                          
                          {item.status === 'planned' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 bg-slate-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              Get Notified
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Be Part of Our Journey
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Join our pilot program launching July-August 2025 and help shape the future of AI-powered 
              healthcare technology. Limited spots available for early adopters.
            </p>
            
            {/* Timeline Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { title: "Now - June 2025", desc: "Foundation Development", icon: Brain },
                { title: "July-August 2025", desc: "Pilot Program Launch", icon: Rocket },
                { title: "Q4 2025", desc: "Full Platform Launch", icon: Globe }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
                  >
                    <IconComponent className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Pilot Program</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Update notifications coming soon!");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-slate-800 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-200"
              >
                Stay Updated
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};