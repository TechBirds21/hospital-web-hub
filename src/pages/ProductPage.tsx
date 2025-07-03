import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, BarChart3, Users, Shield, Zap, ArrowRight, CheckCircle, Star, Play, Brain, Bot, Sparkles, Building2, Smile, Award, TrendingUp, Globe, Settings, Cloud } from 'lucide-react';
import { apiService } from '../services/api';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  benefits: string[];
  aiFeatures: string[];
  stats: {
    efficiency: string;
    adoption: string;
    satisfaction: number;
    pilotInterest: number;
  };
  demoVideo?: string;
}

interface ProductModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  customizations: string[];
  aiCapabilities: string[];
}

export const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const handleJoinPilot = () => {
    navigate('/contact', { state: { fromBookDemo: true } });
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getV1Features();
        setFeatures(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const productModules: ProductModule[] = [
    {
      id: 'hospital',
      name: 'Hospital Management Suite',
      description: 'Comprehensive AI-powered hospital operations platform for multi-department coordination',
      icon: 'Building2',
      customizations: [
        'Multi-specialty department integration',
        'Bed management for different ward types',
        'Emergency department optimization',
        'ICU and critical care monitoring',
        'Outpatient clinic management',
        'Surgical suite scheduling'
      ],
      aiCapabilities: [
        'Predictive patient admission forecasting',
        'AI-driven resource optimization',
        'Smart emergency triage system',
        'Automated clinical documentation'
      ]
    },
    {
      id: 'dental',
      name: 'Dental Practice Suite',
      description: 'Smart dental clinic management with AI-enhanced treatment planning and patient care',
      icon: 'Smile',
      customizations: [
        'General dentistry workflow optimization',
        'Orthodontic treatment tracking',
        'Oral surgery scheduling',
        'Pediatric dentistry features',
        'Cosmetic dentistry planning',
        'Dental insurance processing'
      ],
      aiCapabilities: [
        'AI treatment recommendations',
        'Predictive appointment scheduling',
        'Smart insurance processing',
        'Dental image analysis'
      ]
    },
    {
      id: 'aesthetics',
      name: 'Dermatology & Aesthetics Suite',
      description: 'Advanced AI-powered skin analysis and aesthetic medicine platform',
      icon: 'Sparkles',
      customizations: [
        'Dermatology consultation workflows',
        'Cosmetic procedure planning',
        'Aesthetic treatment tracking',
        'Product recommendation engine',
        'Before/after photo management',
        'Skincare routine optimization'
      ],
      aiCapabilities: [
        'Computer vision skin analysis',
        'Treatment outcome prediction',
        'Personalized product recommendations',
        'Progress monitoring AI'
      ]
    }
  ];

  const differentiators = [
    {
      icon: Brain,
      title: 'AI-First Architecture',
      description: 'Built from the ground up with artificial intelligence at the core, not as an add-on feature.',
      details: [
        'Machine learning models trained on healthcare data',
        'Predictive analytics for all major workflows',
        'Natural language processing for documentation',
        'Computer vision for medical imaging support'
      ]
    },
    {
      icon: Settings,
      title: 'Complete Customization',
      description: 'Fully adaptable platform that molds to your specific healthcare practice needs.',
      details: [
        'Specialty-specific workflow configuration',
        'Custom fields and forms for unique requirements',
        'Personalized dashboards and reporting',
        'Flexible integration with existing systems'
      ]
    },
    {
      icon: Globe,
      title: 'Made in India Innovation',
      description: 'Developed in Hyderabad with deep understanding of Indian healthcare ecosystem.',
      details: [
        'Local compliance and regulatory requirements',
        'Multi-language support including regional languages',
        'Integration with Indian insurance systems',
        'Cost-effective solutions for Indian market'
      ]
    },
    {
      icon: Cloud,
      title: 'Modern Technology Stack',
      description: 'Built using cutting-edge technologies for scalability, security, and performance.',
      details: [
        'Cloud-native architecture for reliability',
        'Real-time data processing and analytics',
        'Mobile-first responsive design',
        'API-first approach for integrations'
      ]
    }
  ];

  const whyAiFirst = [
    {
      title: 'Predictive Healthcare',
      description: 'AI predicts patient needs, resource requirements, and treatment outcomes before they happen.',
      icon: TrendingUp,
      examples: ['Predicting patient admissions', 'Forecasting resource needs', 'Treatment outcome prediction']
    },
    {
      title: 'Intelligent Automation',
      description: 'AI automates routine tasks, documentation, and decision-making processes.',
      icon: Bot,
      examples: ['Automated clinical documentation', 'Smart appointment scheduling', 'Intelligent billing']
    },
    {
      title: 'Continuous Learning',
      description: 'AI learns from your practice patterns and continuously improves recommendations.',
      icon: Brain,
      examples: ['Learning from patient patterns', 'Improving diagnosis accuracy', 'Optimizing workflows']
    },
    {
      title: 'Data-Driven Insights',
      description: 'AI transforms your healthcare data into actionable insights and recommendations.',
      icon: BarChart3,
      examples: ['Performance analytics', 'Patient outcome insights', 'Operational optimization']
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Search: Search,
      Calendar: Calendar,
      BarChart3: BarChart3,
      Users: Users,
      Shield: Shield,
      Zap: Zap,
      Brain: Brain,
      Bot: Bot,
      Building2: Building2,
      Smile: Smile,
      Sparkles: Sparkles,
      TrendingUp: TrendingUp,
      Settings: Settings,
      Globe: Globe,
      Cloud: Cloud
    };
    return icons[iconName as keyof typeof icons] || Search;
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              rotate: 360, 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360, 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-3 rounded-full text-sm font-bold mb-8 shadow-2xl"
            >
              🚀 Hospverse AI Platform - Revolutionizing Healthcare in India
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              The Future of Healthcare
              <span className="block text-4xl md:text-6xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                is AI-Powered
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-5xl mx-auto">
              Hospverse is India's first truly AI-native healthcare management platform. Built in Hyderabad, 
              we're transforming how hospitals, dental clinics, and aesthetic practices operate with intelligent 
              automation, predictive analytics, and customized solutions for every healthcare specialty.
            </p>
            
            {/* Key Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {[
                { icon: Brain, text: "AI-First Platform" },
                { icon: Settings, text: "Fully Customizable" },
                { icon: Globe, text: "Made in India" },
                { icon: Shield, text: "Secure & Compliant" }
              ].map((prop, index) => {
                const IconComponent = prop.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index + 0.8 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20"
                  >
                    <IconComponent className="h-5 w-5 text-cyan-400" />
                    <span className="text-white font-medium">{prop.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Pilot Program</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo video coming soon!");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg border border-white/30 transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <Play className="h-6 w-6" />
                <span>Watch AI Demo</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Hospverse Unique */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-8">What Makes Hospverse Different</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Unlike traditional healthcare software that adds AI as an afterthought, Hospverse is built 
              AI-first from the ground up. Every feature, workflow, and decision is powered by intelligent algorithms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {differentiators.map((diff, index) => {
              const IconComponent = diff.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{diff.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">{diff.description}</p>
                  <div className="space-y-3">
                    {diff.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                        <span className="text-slate-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why AI-First Platform */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            >
              🤖 AI-First Technology
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-800 mb-8">Why Hospverse is AI-First</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Traditional healthcare software treats AI as an add-on feature. We believe AI should be the foundation 
              that powers every aspect of healthcare management, making intelligent decisions in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyAiFirst.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{reason.title}</h3>
                    <p className="text-slate-600 mb-6">{reason.description}</p>
                  </div>
                  <div className="space-y-2">
                    {reason.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">{example}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customization for Different Healthcare Settings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-8">Customized for Every Healthcare Practice</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Hospverse adapts to your specific healthcare specialty with deep customizations, 
              specialized workflows, and AI models trained for your practice type.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {productModules.map((module, index) => {
              const IconComponent = getIcon(module.icon);
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.03, y: -15 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-xl overflow-hidden border border-slate-200 group"
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{module.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-8 leading-relaxed">{module.description}</p>
                    
                    {/* AI Capabilities */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <span>AI Capabilities</span>
                      </h4>
                      <div className="space-y-3">
                        {module.aiCapabilities.map((capability, capIndex) => (
                          <div key={capIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-slate-700 font-medium">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Customizations */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                        <Settings className="h-5 w-5 text-teal-600" />
                        <span>Specialty Customizations</span>
                      </h4>
                      <div className="space-y-3">
                        {module.customizations.slice(0, 4).map((customization, custIndex) => (
                          <div key={custIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                            <span className="text-slate-700">{customization}</span>
                          </div>
                        ))}
                        {module.customizations.length > 4 && (
                          <div className="text-sm text-slate-500 ml-7">
                            +{module.customizations.length - 4} more customizations
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Learn More About {module.name}</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      {features.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-8">Core AI-Powered Features</h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Every feature in Hospverse is enhanced with artificial intelligence to provide smarter, 
                faster, and more accurate healthcare management.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    whileHover={{ scale: 1.03, y: -15 }}
                    className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 group"
                  >
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                      </div>
                      
                      <p className="text-slate-300 mb-8 leading-relaxed">{feature.description}</p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="text-center p-4 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold text-teal-400">{feature.stats.efficiency}</div>
                          <div className="text-xs text-slate-400">Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold text-blue-400">{feature.stats.satisfaction}/5</div>
                          <div className="text-xs text-slate-400">Rating</div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>Request Demo</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            >
              🎯 Join the AI Healthcare Revolution
            </motion.div>
            <h2 className="text-6xl font-bold text-slate-800 mb-8">
              Ready to Experience AI-Powered Healthcare?
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Be among the first 25+ healthcare providers to experience the future of practice management. 
              Our pilot program launches July-August 2025 with exclusive access to cutting-edge AI features.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Star, title: "Early Access", desc: "First to use revolutionary AI features", color: "from-yellow-500 to-orange-500" },
                { icon: Users, title: "Direct Input", desc: "Shape the future of healthcare AI", color: "from-blue-500 to-indigo-500" },
                { icon: Award, title: "Special Pricing", desc: "Exclusive pilot member rates", color: "from-green-500 to-emerald-500" }
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
                    className="p-8 bg-white rounded-2xl shadow-lg border border-slate-200"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 text-xl">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
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
                className="px-12 py-6 bg-white text-slate-800 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-200"
              >
                Schedule AI Demo
              </motion.a>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-slate-500 text-lg mt-8"
            >
              🔒 Secure • 🚀 Innovative • 🇮🇳 Proudly Made in Hyderabad, India
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};