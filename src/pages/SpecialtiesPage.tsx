import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Smile, Sparkles, ArrowRight, Users, TrendingUp, Star, Brain, Cpu } from 'lucide-react';
import { apiService } from '../services/api';

interface Specialty {
  id: string;
  name: string;
  description: string;
  features: string[];
  aiCapabilities: string[];
  image: string;
  stats: {
    pilotInterest: number;
    aiAccuracy: number;
    efficiency: string;
    satisfaction: number;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    hospital: string;
    image: string;
  };
  caseStudy: {
    title: string;
    result: string;
    metric: string;
  };
}

export const SpecialtiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hospital');
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<Record<string, Specialty>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getSpecialties();
        setSpecialties(Object.keys(data).length > 0 ? data : {
          hospital: {
            id: 'hospital',
            name: 'AI-Powered Hospital Management',
            description: 'Comprehensive hospital operations platform designed for multi-department coordination with artificial intelligence for patient flow optimization, predictive analytics, and smart resource management.',
            features: [
              'AI-driven patient flow optimization and bed management',
              'Integrated emergency department with intelligent triage',
              'Predictive staff scheduling with skill-based AI allocation',
              'Smart inventory management with automated restocking alerts',
              'Multi-department billing with AI fraud detection',
              'Quality assurance monitoring with AI compliance tracking',
              'Telemedicine integration with AI-powered consultations',
              'Advanced reporting with regulatory compliance automation'
            ],
            aiCapabilities: [
              'Predictive Patient Admission Forecasting',
              'AI-Driven Resource Optimization',
              'Smart Emergency Triage System',
              'Automated Clinical Documentation',
              'Machine Learning for Treatment Recommendations',
              'Computer Vision for Medical Imaging Support'
            ],
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1000&h=700&fit=crop',
            stats: { pilotInterest: 12, aiAccuracy: 95, efficiency: '+40%', satisfaction: 96 },
            testimonial: {
              quote: "The AI-powered insights and predictive analytics capabilities shown in the demo are exactly what modern hospitals need for efficient operations and better patient care.",
              author: "Dr. Rajesh Kumar",
              role: "Chief Medical Officer",
              hospital: "Hyderabad Care Hospital",
              image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
            },
            caseStudy: {
              title: "Pilot Program Expected Results",
              result: "40% efficiency improvement projected",
              metric: "25% cost reduction anticipated"
            }
          },
          dental: {
            id: 'dental',
            name: 'Smart Dental Practice Suite',
            description: 'AI-enhanced dental practice management platform with intelligent scheduling, treatment recommendations, automated insurance processing, and patient care optimization specifically designed for dental clinics.',
            features: [
              'AI-powered appointment scheduling and optimization',
              'Intelligent treatment planning with cost estimation',
              'Automated insurance claims with AI processing',
              'Digital dental charting with voice recognition AI',
              'Patient portal with AI-driven treatment progress tracking',
              'Smart inventory management for dental supplies and equipment',
              'AI-enhanced recall system with predictive patient reminders',
              'Financial reporting with AI treatment profitability analysis'
            ],
            aiCapabilities: [
              'Treatment Recommendation AI Engine',
              'Predictive Appointment Scheduling',
              'Smart Insurance Processing Automation',
              'AI-Driven Patient Communication',
              'Dental Image Analysis with Computer Vision',
              'Automated Treatment Documentation'
            ],
            image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1000&h=700&fit=crop',
            stats: { pilotInterest: 8, aiAccuracy: 92, efficiency: '+50%', satisfaction: 98 },
            testimonial: {
              quote: "The AI treatment recommendations and smart scheduling features could revolutionize how we manage our dental practice and provide better patient care with predictive insights.",
              author: "Dr. Priya Sharma",
              role: "Practice Owner",
              hospital: "SmileCare Dental Group",
              image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
            },
            caseStudy: {
              title: "Early Adopter Expectations",
              result: "60% faster treatment planning expected",
              metric: "35% increase in patient retention projected"
            }
          },
          skin: {
            id: 'skin',
            name: 'AI Dermatology & Aesthetic Suite',
            description: 'Advanced AI-powered dermatology platform with computer vision skin analysis, treatment outcome prediction, and personalized care recommendations specifically designed for aesthetic medicine practices.',
            features: [
              'AI-powered skin analysis with computer vision diagnosis',
              'Before/after photo management with AI progress tracking',
              'Cosmetic procedure scheduling with outcome prediction',
              'AI product recommendation engine based on skin analysis',
              'Patient consultation portal with virtual AI consultations',
              'Treatment effectiveness tracking with machine learning analytics',
              'Smart inventory management for skincare products and equipment',
              'Marketing automation with AI-driven patient personalization'
            ],
            aiCapabilities: [
              'Computer Vision Skin Analysis and Diagnosis',
              'Treatment Outcome Prediction Models',
              'AI Skincare Product Recommendations',
              'Predictive Treatment Planning',
              'Automated Skin Condition Monitoring',
              'Machine Learning for Treatment Optimization'
            ],
            image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1000&h=700&fit=crop',
            stats: { pilotInterest: 5, aiAccuracy: 88, efficiency: '+60%', satisfaction: 99 },
            testimonial: {
              quote: "The AI skin analysis and treatment prediction features are impressive. This technology could transform aesthetic medicine practices completely with data-driven insights.",
              author: "Dr. Arjun Reddy",
              role: "Dermatologist & Founder",
              hospital: "Glow Aesthetic Clinic",
              image: "https://images.unsplash.com/photo-1594824596730-82c31b21a9c4?w=100&h=100&fit=crop&crop=face"
            },
            caseStudy: {
              title: "AI Technology Demo Results",
              result: "80% improvement in diagnosis accuracy expected",
              metric: "50% better treatment outcomes projected"
            }
          }
        });
      } catch (error) {
        console.error('Error fetching specialties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const tabs = [
    { id: 'hospital', name: 'Hospital Management', icon: Building2, color: 'from-teal-500 to-cyan-500', path: '/specialties/hospital' },
    { id: 'dental', name: 'Dental Practice', icon: Smile, color: 'from-blue-500 to-indigo-500', path: '/specialties/dental' },
    { id: 'skin', name: 'Dermatology & Aesthetics', icon: Sparkles, color: 'from-purple-500 to-pink-500', path: '/specialties/dermatology' }
  ];

  const currentSpecialty = specialties[activeTab];
  
  const handleJoinPilot = (specialty: string = activeTab) => {
    navigate('/contact', { 
      state: { 
        fromBookDemo: true,
        specialty 
      } 
    });
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
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
              🏥 AI-Powered Healthcare Solutions - Made in Hyderabad
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Healthcare Specialties
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Tailored AI Solutions for Every Practice
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Industry-specific AI modules designed with deep healthcare expertise, delivering intelligent 
              automation, predictive insights, and measurable improvements across diverse medical specialties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Tab Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                >
                  <motion.div
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-lg ${
                      isActive
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-xl`
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-lg">{tab.name}</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Tab Content */}
      {currentSpecialty && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20"
            >
              {/* Content */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-5xl font-bold text-slate-800 mb-6">
                    {currentSpecialty.name}
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed mb-6">
                    {currentSpecialty.description}
                  </p>
                  
                  {/* AI Badge */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold flex items-center space-x-2">
                      <Brain className="h-4 w-4" />
                      <span>AI-Powered Technology</span>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {currentSpecialty.stats.aiAccuracy}% AI Accuracy
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, value: currentSpecialty.stats.pilotInterest, label: "Pilot Interest", color: "from-teal-500 to-cyan-500" },
                    { icon: Brain, value: currentSpecialty.stats.aiAccuracy, label: "AI Accuracy", color: "from-purple-500 to-pink-500", suffix: "%" },
                    { icon: TrendingUp, value: currentSpecialty.stats.efficiency, label: "Efficiency Gain", color: "from-green-500 to-emerald-500", isString: true },
                    { icon: Star, value: currentSpecialty.stats.satisfaction, label: "Satisfaction", color: "from-yellow-500 to-orange-500", suffix: "%" }
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800 mb-2">
                          {stat.isString ? stat.value : stat.value}{stat.suffix || ''}
                        </div>
                        <div className="text-slate-600 font-medium">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* AI Capabilities Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="mb-8">
                    <Link 
                      to={tabs.find(tab => tab.id === activeTab)?.path || '/specialties'}
                      className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      <span>View Detailed Information</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                    <Cpu className="h-6 w-6 text-purple-600" />
                    <span>AI Capabilities</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSpecialty.aiCapabilities.map((capability, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div 
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span className="text-slate-700 font-medium">{capability}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Case Study Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{currentSpecialty.caseStudy.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-teal-600">{currentSpecialty.caseStudy.result}</div>
                      <div className="text-sm text-slate-600">Primary Outcome</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">{currentSpecialty.caseStudy.metric}</div>
                      <div className="text-sm text-slate-600">Additional Benefit</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced Image */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-300"></div>
                  <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                    <img
                      src={currentSpecialty.image}
                      alt={currentSpecialty.name}
                      className="w-full h-96 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    
                    {/* AI Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2"
                    >
                      <Brain className="h-4 w-4" />
                      <span className="font-bold">AI-Powered</span>
                    </motion.div>
                    
                    {/* Pilot Interest */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                    >
                      <div className="text-sm font-semibold text-slate-800">Pilot Interest</div>
                      <div className="text-lg font-bold text-teal-600">{currentSpecialty.stats.pilotInterest} providers</div>
                    </motion.div>
                    
                    {/* Satisfaction badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-slate-800">{currentSpecialty.stats.satisfaction}%</span>
                      </div>
                      <div className="text-sm text-slate-600">Expected Satisfaction</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-slate-800 mb-10 text-center">Comprehensive Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSpecialty.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 mb-20"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Early Adopter Feedback</h3>
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl text-slate-700 text-center mb-8 leading-relaxed italic">
                "{currentSpecialty.testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={currentSpecialty.testimonial.image}
                  alt={currentSpecialty.testimonial.author}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div className="text-center">
                  <div className="font-bold text-lg text-slate-800">{currentSpecialty.testimonial.author}</div>
                  <div className="text-slate-600">{currentSpecialty.testimonial.role}</div>
                  <div className="text-teal-600 font-semibold">{currentSpecialty.testimonial.hospital}</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Ready to Experience AI-Powered {currentSpecialty.name}?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Join our pilot program launching July-August 2025 and be among the first to experience 
                the future of AI-powered healthcare management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => handleJoinPilot(currentSpecialty.id)}
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
                    alert("Demo scheduling coming soon!");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-slate-800 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-200"
                >
                  Request AI Demo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Custom Solutions CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Need a Custom AI Solution?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              We specialize in creating tailored AI-powered healthcare solutions for unique specialties and requirements. 
              Our expert team in Hyderabad can customize our platform to meet your specific needs.
            </p>
            <motion.button
              onClick={() => handleJoinPilot()}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
            >
              <span>Discuss Custom AI Solution</span>
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};