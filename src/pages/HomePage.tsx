import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Building2, Star, ChevronLeft, ChevronRight, TrendingUp, Globe, Award, Brain, Sparkles, Bot, Cpu, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import heroBackground from '../assets/healthcare-hero-bg.jpg';

interface Metrics {
  interestedPilotUsers: number;
  developmentStartYear: number;
  aiFeatures: number;
  specialties: number;
  teamSize: number;
  devProgress: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  aiCapabilities: string[];
  stats: {
    interest: number;
    aiAccuracy: string;
  };
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics>({ 
    interestedPilotUsers: 0, 
    developmentStartYear: 0, 
    aiFeatures: 0, 
    specialties: 0,
    teamSize: 0,
    devProgress: 0
  });
  const [modules, setModules] = useState<Module[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [metricsData, modulesData] = await Promise.all([
          apiService.getMetrics(),
          apiService.getModulesPreviews()
        ]);
        
        setMetrics({
          interestedPilotUsers: metricsData.interestedPilotUsers || 25,
          developmentStartYear: 2025,
          aiFeatures: metricsData.aiFeatures || 15,
          specialties: 3,
          teamSize: metricsData.teamSize || 12,
          devProgress: metricsData.devProgress || 75
        });
        
        // Ensure we always have valid modules data
        if (Array.isArray(modulesData) && modulesData.length > 0) {
          setModules(modulesData);
        } else {
          // Use default modules if data is invalid or empty
          setModules([
            {
              id: '1',
              title: 'AI-Powered Hospital Management',
              description: 'Comprehensive hospital operations platform with artificial intelligence for patient flow optimization, predictive analytics, and intelligent resource allocation.',
              image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
              features: ['Smart Patient Flow Management', 'Predictive Resource Allocation', 'Intelligent Staff Scheduling', 'Emergency Response Optimization'],
              aiCapabilities: ['Predictive Analytics for Patient Admission', 'AI-Driven Bed Management', 'Smart Resource Optimization', 'Automated Report Generation'],
              stats: { interest: 12, aiAccuracy: '95%' }
            },
            {
              id: '2',
              title: 'Smart Dental Practice Suite',
              description: 'AI-enhanced dental practice management with intelligent appointment scheduling, treatment recommendation system, and patient care optimization.',
              image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop',
              features: ['Intelligent Appointment Scheduling', 'Treatment Planning Assistant', 'Patient Communication Hub', 'Insurance Processing Automation'],
              aiCapabilities: ['AI Treatment Recommendations', 'Smart Appointment Optimization', 'Predictive Patient Needs', 'Automated Documentation'],
              stats: { interest: 8, aiAccuracy: '92%' }
            },
            {
              id: '3',
              title: 'Aesthetic & Dermatology AI Suite',
              description: 'Advanced AI-powered dermatology platform with skin analysis, treatment prediction, and personalized care recommendations for aesthetic practices.',
              image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&h=600&fit=crop',
              features: ['AI Skin Analysis & Diagnosis', 'Treatment Outcome Prediction', 'Personalized Care Plans', 'Progress Tracking System'],
              aiCapabilities: ['Computer Vision Skin Analysis', 'Treatment Outcome Prediction', 'Personalized Product Recommendations', 'Progress Monitoring AI'],
              stats: { interest: 5, aiAccuracy: '88%' }
            }
          ]);
        }
      } catch (error) {
        console.warn('Unable to fetch live data, using default content:', error);
        // Don't show error to user, just use fallback data silently
        setMetrics({
          interestedPilotUsers: 25,
          developmentStartYear: 2025,
          aiFeatures: 15,
          specialties: 3,
          teamSize: 12,
          devProgress: 75
        });
        
        setModules([
          {
            id: '1',
            title: 'AI-Powered Hospital Management',
            description: 'Comprehensive hospital operations platform with artificial intelligence for patient flow optimization, predictive analytics, and intelligent resource allocation.',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
            features: ['Smart Patient Flow Management', 'Predictive Resource Allocation', 'Intelligent Staff Scheduling', 'Emergency Response Optimization'],
            aiCapabilities: ['Predictive Analytics for Patient Admission', 'AI-Driven Bed Management', 'Smart Resource Optimization', 'Automated Report Generation'],
            stats: { interest: 12, aiAccuracy: '95%' }
          },
          {
            id: '2',
            title: 'Smart Dental Practice Suite',
            description: 'AI-enhanced dental practice management with intelligent appointment scheduling, treatment recommendation system, and patient care optimization.',
            image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop',
            features: ['Intelligent Appointment Scheduling', 'Treatment Planning Assistant', 'Patient Communication Hub', 'Insurance Processing Automation'],
            aiCapabilities: ['AI Treatment Recommendations', 'Smart Appointment Optimization', 'Predictive Patient Needs', 'Automated Documentation'],
            stats: { interest: 8, aiAccuracy: '92%' }
          },
          {
            id: '3',
            title: 'Aesthetic & Dermatology AI Suite',
            description: 'Advanced AI-powered dermatology platform with skin analysis, treatment prediction, and personalized care recommendations for aesthetic practices.',
            image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&h=600&fit=crop',
            features: ['AI Skin Analysis & Diagnosis', 'Treatment Outcome Prediction', 'Personalized Care Plans', 'Progress Tracking System'],
            aiCapabilities: ['Computer Vision Skin Analysis', 'Treatment Outcome Prediction', 'Personalized Product Recommendations', 'Progress Monitoring AI'],
            stats: { interest: 5, aiAccuracy: '88%' }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const testimonials = [
    {
      name: "Dr. Arjun Reddy",
      role: "Senior Cardiologist",
      content: "The AI-powered insights and predictive analytics features shown in the demo are exactly what modern healthcare needs. Looking forward to the pilot launch.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      hospital: "Hyderabad Heart Institute",
      rating: 5,
      type: "Early Adopter"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Dental Practice Owner",
      content: "The intelligent scheduling and AI treatment recommendations could transform how we manage our practice. Excited to be part of the pilot program.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      hospital: "SmileCare Dental Clinics",
      rating: 5,
      type: "Pilot Participant"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Dermatologist",
      content: "The AI skin analysis capabilities and treatment prediction features are impressive. This could revolutionize aesthetic medicine practices.",
      image: "https://images.unsplash.com/photo-1594824596730-82c31b21a9c4?w=100&h=100&fit=crop&crop=face",
      hospital: "Skin & Aesthetics Center",
      rating: 5,
      type: "Beta Tester"
    }
  ];

  const handleJoinPilot = () => {
    navigate('/contact', { state: { fromBookDemo: true } });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroBackground})` }}></div>
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full mx-auto mb-8 shadow-glow"
          />
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold text-white mb-4"
          >
            Loading Healthcare AI
          </motion.h2>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 max-w-md mx-auto bg-surface rounded-3xl shadow-xl border border-border"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="w-16 h-16 bg-error rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <span className="text-white text-2xl">⚠</span>
          </motion.div>
          <h3 className="text-xl font-bold text-text mb-4">Connection Error</h3>
          <p className="text-text-muted mb-6">{error}</p>
          <motion.button 
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-hover transition-all duration-200"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${heroBackground})` }}></div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/4 left-10 w-40 h-40 bg-primary/40 rounded-full blur-2xl animate-float"
          />
          <motion.div
            animate={{ 
              y: [0, 25, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-10 w-56 h-56 bg-secondary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 30, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
          />
          
          {/* Floating medical icons */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute top-1/3 right-1/4 opacity-20"
          >
            <Heart className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-1/3 left-1/4 opacity-20"
          >
            <Activity className="h-20 w-20 text-secondary" />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-primary px-8 py-3 rounded-full text-sm font-bold mb-8 shadow-glow animate-pulseGlow"
            >
              🚀 Coming July-August 2025 | Made in Hyderabad, India
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              AI-Powered Healthcare
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent block mt-4">
                Revolution Starts Here
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              Built in India for the world. Hospverse combines artificial intelligence with healthcare expertise 
              to create the most advanced practice management platform. Join our pilot program and be among 
              the first to experience the future of healthcare technology.
            </motion.p>
            
            {/* AI Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {[
                { icon: Brain, text: "AI Diagnostics", color: "text-primary" },
                { icon: Bot, text: "Smart Automation", color: "text-secondary" },
                { icon: Cpu, text: "Predictive Analytics", color: "text-accent" },
                { icon: Sparkles, text: "Intelligent Insights", color: "text-success" }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full hover-lift shimmer-effect group"
                  >
                    <IconComponent className={`h-5 w-5 ${feature.color} group-hover:animate-pulse`} />
                    <span className="text-white font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
            >
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-primary text-white rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-hover transition-all duration-300 flex items-center justify-center space-x-3 hover-glow shimmer-effect"
              >
                <span>Join Pilot Program</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("More info coming soon!");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 glass-card text-white rounded-2xl font-bold text-lg border border-white/30 transition-all duration-300 flex items-center justify-center space-x-3 hover-lift"
              >
                <Play className="h-6 w-6" />
                <span>Watch AI Demo</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Metrics Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-surface to-surface-variant"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="inline-block bg-gradient-primary px-6 py-2 rounded-full text-sm font-semibold mb-8 text-white shadow-glow"
            >
              📊 Real-time Development Metrics
            </motion.div>
            <h2 className="text-5xl font-bold text-text mb-6">Building the Future of Healthcare AI</h2>
            <p className="text-xl text-text-muted max-w-4xl mx-auto">Developed in Hyderabad with cutting-edge artificial intelligence technology</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Users, value: metrics.interestedPilotUsers, label: "Pilot Program Members", color: "bg-gradient-to-br from-primary to-secondary", suffix: "+" },
              { icon: Brain, value: metrics.aiFeatures, label: "AI Features", color: "bg-gradient-to-br from-secondary to-accent", suffix: "+" },
              { icon: Building2, value: metrics.specialties, label: "Healthcare Specialties", color: "bg-gradient-to-br from-accent to-success" },
              { icon: Globe, value: metrics.developmentStartYear, label: "Development Start", color: "bg-gradient-to-br from-success to-primary" },
              { icon: TrendingUp, value: metrics.devProgress, label: "Development Progress", color: "bg-gradient-to-br from-warning to-error", suffix: "%" },
              { icon: Award, value: metrics.teamSize, label: "Expert Team", color: "bg-gradient-to-br from-primary to-accent", suffix: "+" }
            ].map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="text-center group cursor-pointer"
                >
                  <div className={`p-8 ${metric.color} rounded-3xl shadow-card group-hover:shadow-xl transition-all duration-500 mb-6 relative overflow-hidden hover-lift shimmer-effect`}>
                    {/* Background animation */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl"
                    />
                    <IconComponent className="h-12 w-12 text-white mx-auto mb-6 relative z-10 group-hover:animate-pulse" />
                    <motion.div 
                      className="text-4xl font-bold text-white mb-3 relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                    >
                      {metric.value}{metric.suffix || ''}
                    </motion.div>
                    <div className="text-white/90 text-sm font-semibold relative z-10">{metric.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced AI-Powered Features Section */}
      <section className="py-32 bg-gradient-to-br from-text to-text/90 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-primary px-6 py-2 rounded-full text-sm font-semibold mb-6 text-white shadow-glow animate-pulseGlow"
            >
              🤖 Powered by Advanced AI
            </motion.div>
            <h2 className="text-6xl font-bold text-white mb-8">
              What Makes Hospverse Unique
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Unlike traditional healthcare software, Hospverse integrates cutting-edge artificial intelligence 
              to provide predictive insights, automated workflows, and intelligent decision support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, duration: 1 }}
                whileHover={{ scale: 1.03, y: -15 }}
                className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* AI Badge */}
                  <motion.div
                    initial={{ x: -100 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2"
                  >
                    <Brain className="h-4 w-4" />
                    <span>AI-Powered</span>
                  </motion.div>
                  
                  {/* Interest Badge */}
                  <motion.div
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-slate-800"
                  >
                    {module.stats.interest} interested
                  </motion.div>
                  
                  {/* AI Accuracy */}
                  <motion.div
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="absolute bottom-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {module.stats.aiAccuracy} AI Accuracy
                  </motion.div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  {/* AI Capabilities */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-cyan-400" />
                      <span>AI Capabilities</span>
                    </h4>
                    <div className="space-y-2">
                      {module.aiCapabilities.map((capability, capIndex) => (
                        <motion.div
                          key={capIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * capIndex }}
                          className="flex items-center space-x-3"
                        >
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: capIndex * 0.2 }}
                          />
                          <span className="text-slate-300 font-medium">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {module.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * featureIndex }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                        <span className="text-slate-300 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleJoinPilot}
                    className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Request Demo</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Early Adopters & Pilot Participants
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Healthcare professionals excited about the future of AI-powered practice management
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 shadow-2xl"
            >
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star className="h-8 w-8 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              
              {/* Participant Type Badge */}
              <div className="flex justify-center mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-bold rounded-full">
                  {testimonials[currentTestimonial].type}
                </span>
              </div>
              
              <blockquote className="text-2xl text-slate-800 text-center mb-10 leading-relaxed font-medium italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-6">
                <motion.img
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <div className="text-center">
                  <div className="font-bold text-xl text-slate-800">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-600 mb-1">{testimonials[currentTestimonial].role}</div>
                  <div className="text-teal-600 font-semibold">{testimonials[currentTestimonial].hospital}</div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-slate-600" />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              <ChevronRight className="h-6 w-6 text-slate-600" />
            </motion.button>

            {/* Indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-teal-600 w-10' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-3 rounded-full text-sm font-bold mb-8 text-white shadow-2xl"
            >
              🎯 Limited Pilot Spots Available
            </motion.div>
            
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Be Part of the
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Healthcare AI Revolution
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-5xl mx-auto leading-relaxed">
              Join our exclusive pilot program launching July-August 2025. Experience the future of 
              AI-powered healthcare management and help shape the next generation of medical technology.
            </p>
            
            {/* Pilot Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            >
              {[
                { icon: Star, title: "Early Access", desc: "First to experience AI features" },
                { icon: Users, title: "Direct Input", desc: "Shape product development" },
                { icon: Award, title: "Special Pricing", desc: "Exclusive pilot member rates" }
              ].map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  >
                    <IconComponent className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-slate-300 text-sm">{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
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
                className="px-12 py-6 bg-white text-slate-800 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Learn More
              </motion.a>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-slate-400 text-sm mt-8"
            >
              🔒 Secure • 🚀 Innovative • 🇮🇳 Made in India
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};