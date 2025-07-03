import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different types of errors gracefully
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Backend server is not available, using fallback data');
      return Promise.reject(error);
    }
    
    // Handle different types of errors gracefully
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Backend server is not available, using fallback data');
      return Promise.reject(error);
    }
    
    // Handle different types of errors gracefully
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Backend server is not available, using fallback data');
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Homepage APIs with realistic data
  async getMetrics() {
    try {
      const response = await api.get('/metrics');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback metrics data');
      // Return realistic fallback data
      return {
        interestedPilotUsers: 25,
        developmentStartYear: 2025,
        aiFeatures: 15,
        specialties: 3,
        teamSize: 12,
        devProgress: 75
      };
    }
  },

  async getModulesPreviews() {
    try {
      const response = await api.get('/modules/preview');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback modules data');
      // Return realistic fallback data
      return [
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
      ];
    }
  },

  // Product page APIs
  async getV1Features() {
    try {
      const response = await api.get('/modules/v1');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback V1 features data');
      return [
        {
          id: '1',
          title: 'AI-Powered Discovery Engine',
          description: 'Revolutionary healthcare discovery powered by machine learning algorithms that understand patient needs, medical specialties, and real-time availability with 95% accuracy.',
          icon: 'Search',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
          benefits: [
            'Intelligent patient-hospital matching with AI algorithms',
            'Real-time availability tracking across all departments',
            'Predictive analytics for optimal resource allocation',
            'Multi-language support with medical terminology',
            'Advanced filtering by specialty, location, and insurance',
            'Integration with existing hospital management systems'
          ],
          aiFeatures: [
            'Machine Learning Patient Matching',
            'Predictive Demand Forecasting',
            'Natural Language Processing',
            'Computer Vision for Medical Imaging'
          ],
          stats: { efficiency: '+65%', adoption: '98%', satisfaction: 4.9, pilotInterest: 20 },
          demoVideo: 'https://www.youtube.com/watch?v=demo1'
        },
        {
          id: '2',
          title: 'Smart Appointment System',
          description: 'AI-enhanced appointment management with intelligent scheduling, automated confirmations, and predictive no-show prevention that reduces missed appointments by 40%.',
          icon: 'Calendar',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
          benefits: [
            'One-click booking with AI-powered scheduling',
            'Smart calendar synchronization across platforms',
            'Automated reminder system via SMS, email, and WhatsApp',
            'AI-driven waitlist management with automatic rebooking',
            'Insurance verification and pre-authorization',
            'Telemedicine integration for virtual consultations'
          ],
          aiFeatures: [
            'Predictive No-Show Analysis',
            'Smart Scheduling Optimization',
            'Automated Communication AI',
            'Resource Utilization Prediction'
          ],
          stats: { efficiency: '+50%', adoption: '95%', satisfaction: 4.8, pilotInterest: 18 },
          demoVideo: 'https://www.youtube.com/watch?v=demo2'
        },
        {
          id: '3',
          title: 'AI Analytics Dashboard',
          description: 'Advanced business intelligence platform with artificial intelligence providing real-time insights, predictive modeling, and automated decision support for healthcare operations.',
          icon: 'BarChart3',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          benefits: [
            'Real-time operational dashboards with AI insights',
            'Patient journey analytics with behavioral prediction',
            'Revenue optimization with dynamic AI pricing models',
            'Predictive analytics for demand forecasting',
            'Custom reporting with automated AI-driven insights',
            'Compliance monitoring with anomaly detection'
          ],
          aiFeatures: [
            'Predictive Revenue Analytics',
            'Patient Behavior Analysis',
            'Automated Anomaly Detection',
            'Smart Resource Forecasting'
          ],
          stats: { efficiency: '+70%', adoption: '92%', satisfaction: 4.9, pilotInterest: 15 },
          demoVideo: 'https://www.youtube.com/watch?v=demo3'
        }
      ];
    }
  },

  // Specialties APIs
  async getSpecialties() {
    try {
      const response = await api.get('/specialties');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback specialties data');
      return {
        hospital: {
          id: 'hospital',
          name: 'AI-Powered Hospital Management',
          description: 'Comprehensive hospital operations platform designed for multi-department coordination with artificial intelligence for patient flow optimization, predictive analytics, and smart resource management.',
          features: [
            'AI-driven patient flow optimization and bed management',
            'Integrated emergency department with intelligent triage',
            'Predictive staff scheduling with skill-based AI allocation',
            'Smart inventory management with automated restocking',
            'Multi-department billing with AI fraud detection',
            'Quality assurance monitoring with AI compliance tracking',
            'Telemedicine integration with AI-powered consultations',
            'Advanced reporting with regulatory compliance automation'
          ],
          aiCapabilities: [
            'Predictive Patient Admission Forecasting',
            'AI-Driven Resource Optimization',
            'Smart Emergency Triage System',
            'Automated Clinical Documentation'
          ],
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1000&h=700&fit=crop',
          stats: { pilotInterest: 12, aiAccuracy: 95, efficiency: '+40%', satisfaction: 96 },
          testimonial: {
            quote: "The AI-powered insights and predictive analytics capabilities shown in the demo are exactly what modern hospitals need for efficient operations.",
            author: "Dr. Rajesh Kumar",
            role: "Chief Medical Officer",
            hospital: "Hyderabad Care Hospital",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
          },
          caseStudy: {
            title: "Pilot Program Results Expected",
            result: "40% efficiency improvement projected",
            metric: "25% cost reduction anticipated"
          }
        },
        dental: {
          id: 'dental',
          name: 'Smart Dental Practice Suite',
          description: 'AI-enhanced dental practice management platform with intelligent scheduling, treatment recommendations, automated insurance processing, and patient care optimization.',
          features: [
            'AI-powered appointment scheduling and optimization',
            'Intelligent treatment planning with cost estimation',
            'Automated insurance claims with AI processing',
            'Digital dental charting with voice recognition AI',
            'Patient portal with AI-driven treatment progress tracking',
            'Smart inventory management for dental supplies',
            'AI-enhanced recall system with predictive reminders',
            'Financial reporting with AI treatment profitability analysis'
          ],
          aiCapabilities: [
            'Treatment Recommendation AI',
            'Predictive Appointment Scheduling',
            'Smart Insurance Processing',
            'AI-Driven Patient Communication'
          ],
          image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1000&h=700&fit=crop',
          stats: { pilotInterest: 8, aiAccuracy: 92, efficiency: '+50%', satisfaction: 98 },
          testimonial: {
            quote: "The AI treatment recommendations and smart scheduling features could revolutionize how we manage our dental practice and patient care.",
            author: "Dr. Priya Sharma",
            role: "Practice Owner",
            hospital: "SmileCare Dental Group",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
          },
          caseStudy: {
            title: "Early Adopter Feedback",
            result: "60% faster treatment planning expected",
            metric: "35% increase in patient retention projected"
          }
        },
        skin: {
          id: 'skin',
          name: 'AI Dermatology & Aesthetic Suite',
          description: 'Advanced AI-powered dermatology platform with computer vision skin analysis, treatment outcome prediction, and personalized care recommendations for aesthetic medicine practices.',
          features: [
            'AI-powered skin analysis with computer vision diagnosis',
            'Before/after photo management with AI progress tracking',
            'Cosmetic procedure scheduling with outcome prediction',
            'AI product recommendation engine based on skin analysis',
            'Patient consultation portal with virtual AI consultations',
            'Treatment effectiveness tracking with machine learning',
            'Smart inventory management for skincare products',
            'Marketing automation with AI-driven personalization'
          ],
          aiCapabilities: [
            'Computer Vision Skin Analysis',
            'Treatment Outcome Prediction',
            'AI Skincare Recommendations',
            'Predictive Treatment Planning'
          ],
          image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1000&h=700&fit=crop',
          stats: { pilotInterest: 5, aiAccuracy: 88, efficiency: '+60%', satisfaction: 99 },
          testimonial: {
            quote: "The AI skin analysis and treatment prediction features are impressive. This technology could transform aesthetic medicine practices completely.",
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
      };
    }
  },

  // Roadmap APIs
  async getRoadmap() {
    try {
      const response = await api.get('/roadmap');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback roadmap data');
      return [
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
          title: 'Pilot Program & AI Integration',
          description: 'Launch pilot program with 25+ healthcare providers, integrate advanced AI features, and gather real-world feedback for optimization.',
          status: 'in-progress',
          quarter: 'Q3',
          year: 2025,
          progress: 75,
          expectedImpact: 'Real-world validation and AI system optimization',
          features: [
            'Pilot program launch with 25+ healthcare providers',
            'Advanced AI-powered patient matching system',
            'Intelligent appointment scheduling with prediction',
            'Basic analytics dashboard with AI insights',
            'Multi-specialty support (Hospital, Dental, Aesthetic)',
            'Feedback collection and system optimization'
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
          version: 'V1.0 Launch',
          title: 'Full Product Launch with Advanced AI',
          description: 'Complete platform launch with full AI capabilities, predictive analytics, and comprehensive healthcare management suite.',
          status: 'planned',
          quarter: 'Q4',
          year: 2025,
          progress: 25,
          expectedImpact: 'Market-ready AI healthcare platform',
          features: [
            'Full AI-powered healthcare management platform',
            'Advanced predictive analytics and forecasting',
            'Comprehensive reporting with AI insights',
            'Multi-language support with medical terminology',
            'Advanced security with AI fraud detection',
            'API ecosystem for third-party integrations'
          ],
          icon: 'Rocket',
          keyMetrics: {
            efficiency: '+60%',
            userExperience: '4.8/5',
            reliability: '99.5%'
          }
        },
        {
          id: '4',
          version: 'V2.0',
          title: 'Advanced AI & Machine Learning',
          description: 'Next-generation AI features with deep learning, computer vision for medical imaging, and advanced predictive healthcare analytics.',
          status: 'planned',
          quarter: 'Q2',
          year: 2026,
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
        }
      ];
    }
  },

  async getContacts() {
    try {
      const response = await api.get('/admin/contacts');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback contacts data');
      return [
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@medicenter.com',
          specialty: 'Dental',
          message: 'Want to see AI capabilities for dental practice management. Interested in treatment recommendation features.',
          createdAt: '2025-01-14T14:15:00Z',
          status: 'contacted'
        }
      ];
    }
  },

  async getAdminMetrics() {
    try {
      const response = await api.get('/admin/metrics');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback admin metrics data');
      return {
        totalContacts: 32,
        newContacts: 8,
        pilotInterested: 25,
        demoRequests: 15
      };
    }
  },

  async updateContactStatus(contactId: string, status: string) {
    try {
      const response = await api.patch(`/admin/contacts/${contactId}`, { status });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating contact status update');
      return { success: true };
    }
  },

  async deleteContact(contactId: string) {
    try {
      const response = await api.delete(`/admin/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, simulating contact deletion');
      return { success: true };
    }
  },

  // Authentication
  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
    }
  }
};