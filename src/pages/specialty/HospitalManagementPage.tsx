import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Brain, Shield, Calendar, BarChart3, Heart, Award, Phone } from 'lucide-react';

export const HospitalManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'AI Patient Flow Management',
      description: 'Intelligent patient routing and bed management system powered by machine learning algorithms.',
      details: 'Our AI analyzes historical data, current capacity, and patient acuity to optimize patient flow through your hospital. Reduce waiting times by up to 40% and improve patient satisfaction.',
      benefits: ['Reduced wait times', 'Optimal bed utilization', 'Improved patient satisfaction', 'Real-time capacity monitoring']
    },
    {
      icon: Calendar,
      title: 'Predictive Staff Scheduling',
      description: 'AI-driven staff allocation based on predicted patient volumes and skill requirements.',
      details: 'Machine learning models predict staffing needs based on historical patterns, weather data, and local events. Ensure optimal staffing levels while reducing overtime costs.',
      benefits: ['Reduced overtime costs', 'Better staff satisfaction', 'Improved patient care ratios', 'Predictive analytics']
    },
    {
      icon: Shield,
      title: 'Smart Emergency Triage',
      description: 'Intelligent triage system that prioritizes patients based on AI-analyzed symptoms and urgency.',
      details: 'Computer vision and natural language processing analyze patient presentations to assist in accurate and rapid triage decisions.',
      benefits: ['Faster patient assessment', 'Reduced medical errors', 'Improved outcomes', 'Enhanced decision support']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive business intelligence with AI-powered insights and predictive modeling.',
      details: 'Real-time dashboards provide actionable insights into hospital operations, financial performance, and patient outcomes with predictive analytics.',
      benefits: ['Data-driven decisions', 'Cost optimization', 'Performance tracking', 'Predictive insights']
    }
  ];

  const stats = [
    { icon: Users, value: '12', label: 'Hospitals Interested', color: 'from-teal-500 to-cyan-500' },
    { icon: Brain, value: '95%', label: 'AI Accuracy', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '+40%', label: 'Efficiency Gain', color: 'from-green-500 to-emerald-500' },
    { icon: Star, value: '96%', label: 'Expected Satisfaction', color: 'from-yellow-500 to-orange-500' }
  ];

  const testimonial = {
    quote: "The AI-powered insights and predictive analytics capabilities shown in the demo are exactly what modern hospitals need for efficient operations and better patient care.",
    author: "Dr. Rajesh Kumar",
    role: "Chief Medical Officer",
    hospital: "Hyderabad Care Hospital",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
  };

  const handleJoinPilot = () => {
    navigate('/contact', { state: { fromBookDemo: true, specialty: 'hospital' } });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
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
              🏥 AI-Powered Hospital Management - Made in Hyderabad
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Hospital Management
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Complete AI-Powered Solution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Transform your hospital operations with our comprehensive AI-powered management platform. 
              Built specifically for multi-department coordination with intelligent automation and predictive analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Hospital Pilot</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo coming soon!");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg border border-white/30 transition-all duration-300"
              >
                Watch Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <div className={`p-8 bg-gradient-to-br ${stat.color} rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 mb-6`}>
                    <IconComponent className="h-12 w-12 text-white mx-auto mb-4" />
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/90 text-sm font-semibold">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">AI-Powered Features</h2>
            <p className="text-xl text-slate-600">Comprehensive hospital management with artificial intelligence</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveFeature(index)}
                  className={`p-8 rounded-3xl shadow-xl cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200' : 'bg-white hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 rounded-2xl ${isActive ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 'bg-slate-100'}`}>
                      <IconComponent className={`h-8 w-8 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6">{feature.description}</p>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-teal-200 pt-6"
                    >
                      <p className="text-slate-700 mb-4">{feature.details}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-teal-500" />
                            <span className="text-sm text-slate-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl text-slate-700 mb-8 leading-relaxed italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
              <div className="text-center">
                <div className="font-bold text-lg text-slate-800">{testimonial.author}</div>
                <div className="text-slate-600">{testimonial.role}</div>
                <div className="text-teal-600 font-semibold">{testimonial.hospital}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Hospital?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Join our pilot program launching July-August 2025. Be among the first hospitals to experience 
              AI-powered management and help shape the future of healthcare technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Award, title: "Early Access", desc: "First to use AI features" },
                { icon: Users, title: "Direct Input", desc: "Shape product development" },
                { icon: Heart, title: "Better Care", desc: "Improved patient outcomes" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  >
                    <IconComponent className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Hospital Pilot</span>
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
                className="px-12 py-6 bg-white text-slate-800 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};