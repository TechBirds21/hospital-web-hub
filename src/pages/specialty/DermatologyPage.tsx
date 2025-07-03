import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle, Star, Users, TrendingUp, Brain, Cpu, Bot, Camera, Zap, BarChart3, Phone, Mail, Award } from 'lucide-react';

export const DermatologyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Camera,
      title: 'AI Skin Analysis & Diagnosis',
      description: 'Advanced computer vision technology for accurate skin condition analysis and diagnosis support.',
      details: 'Our AI analyzes skin images using computer vision algorithms trained on thousands of dermatological cases. Assists in early detection and accurate diagnosis.',
      benefits: ['Improved diagnostic accuracy', 'Early condition detection', 'Consistent analysis', 'Treatment tracking']
    },
    {
      icon: Brain,
      title: 'Treatment Outcome Prediction',
      description: 'Machine learning models that predict treatment success and optimal therapy selection.',
      details: 'Predictive algorithms analyze patient data, skin type, and treatment history to recommend the most effective treatment protocols.',
      benefits: ['Better treatment outcomes', 'Reduced trial periods', 'Personalized care', 'Evidence-based decisions']
    },
    {
      icon: Sparkles,
      title: 'Personalized Product Recommendations',
      description: 'AI-powered skincare product recommendations based on individual skin analysis and goals.',
      details: 'Intelligent recommendation engine suggests optimal skincare products and procedures based on skin analysis, goals, and budget.',
      benefits: ['Personalized recommendations', 'Improved patient satisfaction', 'Better results', 'Enhanced retail opportunities']
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking & Analytics',
      description: 'Comprehensive tracking of treatment progress with AI-powered insights and reporting.',
      details: 'Advanced analytics track treatment progress, measure outcomes, and provide insights for continuous improvement.',
      benefits: ['Visual progress tracking', 'Outcome measurement', 'Patient engagement', 'Practice insights']
    }
  ];

  const stats = [
    { icon: Users, value: '5', label: 'Clinics Interested', color: 'from-purple-500 to-pink-500' },
    { icon: Brain, value: '88%', label: 'AI Accuracy', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '+60%', label: 'Efficiency Gain', color: 'from-green-500 to-emerald-500' },
    { icon: Star, value: '99%', label: 'Expected Satisfaction', color: 'from-yellow-500 to-orange-500' }
  ];

  const testimonial = {
    quote: "The AI skin analysis and treatment prediction features are impressive. This technology could transform aesthetic medicine practices completely with data-driven insights.",
    author: "Dr. Arjun Reddy",
    role: "Dermatologist & Founder",
    hospital: "Glow Aesthetic Clinic",
    image: "https://images.unsplash.com/photo-1594824596730-82c31b21a9c4?w=100&h=100&fit=crop&crop=face"
  };

  const handleJoinPilot = () => {
    navigate('/contact', { state: { fromBookDemo: true, specialty: 'skin' } });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
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
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full text-sm font-semibold mb-6"
            >
              ✨ AI-Powered Dermatology & Aesthetics - Made in Hyderabad
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Dermatology & Aesthetics
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Enhanced Skin Care
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Transform your aesthetic practice with advanced AI-powered skin analysis, treatment outcome prediction, 
              and personalized care recommendations designed for modern dermatology clinics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Aesthetic Pilot</span>
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
            <h2 className="text-4xl font-bold text-slate-800 mb-4">AI-Powered Aesthetic Features</h2>
            <p className="text-xl text-slate-600">Advanced dermatology and aesthetic practice management with AI</p>
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
                    isActive ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200' : 'bg-white hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 rounded-2xl ${isActive ? 'bg-gradient-to-r from-purple-600 to-purple-500' : 'bg-slate-100'}`}>
                      <IconComponent className={`h-8 w-8 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6">{feature.description}</p>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-purple-200 pt-6"
                    >
                      <p className="text-slate-700 mb-4">{feature.details}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-purple-500" />
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
                <div className="text-purple-600 font-semibold">{testimonial.hospital}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Revolutionize Aesthetic Medicine?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Join our pilot program launching July-August 2025. Be among the first aesthetic clinics to experience 
              AI-powered skin analysis and transform patient outcomes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Award, title: "Early Access", desc: "First to use AI features" },
                { icon: Users, title: "Direct Input", desc: "Shape product development" },
                { icon: Sparkles, title: "Better Results", desc: "Enhanced treatment outcomes" }
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
                    <IconComponent className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={handleJoinPilot}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-3"
              >
                <span>Join Aesthetic Pilot</span>
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