import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, Clock, Users, Award, Globe, Brain, Calendar } from 'lucide-react';
import { apiService } from '../services/api';
import { useLocation } from 'react-router-dom';

interface ContactForm {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
  subject: string;
}

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ContactForm>();

  useEffect(() => {
    // Check if navigated from Book Demo button
    if (location.state && (location.state as any).fromBookDemo) {
      // Pre-select the pilot program option
      setValue('subject', 'pilot-program');
      
      // Scroll to the form section
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [location, setValue]);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log('Contact form submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      content: 'contact@hospverse.com',
      subtitle: 'Response within 4 hours',
      action: 'mailto:contact@hospverse.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      content: '+91 98765 43210',
      subtitle: 'Business Hours Support',
      action: 'tel:+919876543210',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Development Center',
      content: 'Hyderabad, Telangana',
      subtitle: 'India - Tech Hub',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      content: 'Quick Support',
      subtitle: 'Available during business hours',
      action: 'https://wa.me/919876543210',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: 'AI Healthcare Expertise',
      description: 'Built by healthcare professionals and AI experts with deep industry knowledge',
      stats: '25+ Pilot Program Members'
    },
    {
      icon: Users,
      title: 'Proven Development',
      description: 'Successfully developing cutting-edge AI solutions for healthcare providers',
      stats: '75% Development Complete'
    },
    {
      icon: Clock,
      title: 'Reliable Support',
      description: 'Dedicated support team and customer success assistance during business hours',
      stats: 'July 2025 Launch'
    },
    {
      icon: Globe,
      title: 'Made in India',
      description: 'Developing world-class healthcare technology from Hyderabad for global use',
      stats: 'India Innovation Hub'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center p-12 bg-white rounded-3xl shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Message Sent Successfully!</h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Thank you for your interest in Hospverse! Our team will review your inquiry 
            and respond within 4 hours during business hours.
          </p>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">What happens next?</h3>
            <ul className="text-slate-600 space-y-2">
              <li>• Our team will review your specific requirements</li>
              <li>• We'll schedule a personalized AI demo if requested</li>
              <li>• You'll receive information about our pilot program</li>
              <li>• We'll discuss how our AI platform can benefit your practice</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Send Another Message
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-white text-slate-800 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Enhanced Hero Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
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
              💬 Join Our AI Healthcare Revolution
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Get in Touch
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Shape the Future Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Ready to be part of the AI healthcare revolution? Connect with our team to join our pilot program 
              launching July-August 2025. Help us build the future of healthcare technology from Hyderabad.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { icon: Calendar, text: "July 2025 Launch" },
                { icon: Users, text: "25+ Pilot Members" },
                { icon: Brain, text: "AI-Powered Platform" },
                { icon: MapPin, text: "Made in Hyderabad" }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                  >
                    <IconComponent className="h-5 w-5 text-cyan-400" />
                    <span className="text-white font-medium">{stat.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Multiple Ways to Connect</h2>
            <p className="text-xl text-slate-600">Choose your preferred method to join our AI healthcare journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.action}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group block"
                >
                  <div className="text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`w-20 h-20 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{info.title}</h3>
                    <p className="text-slate-700 mb-2 font-medium">{info.content}</p>
                    <p className="text-sm text-slate-500">{info.subtitle}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Info */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="contact-form"
              className="bg-white rounded-3xl shadow-2xl p-10 scroll-mt-24"
            >
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Join Our Pilot Program</h2>
                <p className="text-lg text-slate-600">
                  Be among the first 25+ healthcare providers to experience AI-powered practice management. 
                  Tell us about your requirements and we'll show you how our platform can transform your operations.
                </p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Dr. John Smith"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@hospital.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Organization/Hospital *
                    </label>
                    <input
                      {...register('organization', { required: 'Organization is required' })}
                      type="text"
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="City General Hospital"
                    />
                    {errors.organization && (
                      <p className="mt-2 text-sm text-red-600">{errors.organization.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    How can we help? *
                  </label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: 'Please select a subject' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select your inquiry type</option>
                        <option value="pilot-program">Join Pilot Program (July 2025)</option>
                        <option value="ai-demo">Request AI Platform Demo</option>
                        <option value="pricing">Pricing & Investment Information</option>
                        <option value="technical">Technical AI Capabilities</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="custom-ai">Custom AI Solution Requirements</option>
                        <option value="investment">Investment Opportunities</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    )}
                  />
                  {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all duration-200"
                    placeholder="Tell us about your healthcare facility, current challenges, and how you'd like to participate in our AI healthcare revolution. We're particularly interested in hearing about your specific needs for our pilot program..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Enhanced Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Why Choose Hospverse */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Why Choose Hospverse?</h3>
                <div className="space-y-6">
                  {whyChooseUs.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                          <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                          <p className="text-teal-600 font-semibold text-sm">{item.stats}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-500 rounded-3xl shadow-2xl p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Healthcare?</h3>
                <p className="mb-8 opacity-90 text-lg leading-relaxed">
                  Join our exclusive pilot program launching July-August 2025. Be among the first to experience 
                  AI-powered healthcare management and help shape the future of medical technology.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span>Early access to AI features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span>Direct input in product development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span>Comprehensive training and support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span>Special pilot member pricing</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-white text-teal-600 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Schedule AI Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};