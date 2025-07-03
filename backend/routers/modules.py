from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter()

class ModuleStats(BaseModel):
    interest: int
    aiAccuracy: str

class Module(BaseModel):
    id: str
    title: str
    description: str
    image: str
    features: List[str]
    aiCapabilities: List[str]
    stats: ModuleStats

class FeatureStats(BaseModel):
    efficiency: str
    adoption: str
    satisfaction: float
    pilotInterest: int

class Feature(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    image: str
    benefits: List[str]
    aiFeatures: List[str]
    stats: FeatureStats
    demoVideo: str = None

@router.get("/preview", response_model=List[Module])
async def get_modules_preview():
    """Get module previews for homepage"""
    return [
        {
            "id": "1",
            "title": "AI-Powered Hospital Management",
            "description": "Comprehensive hospital operations platform with artificial intelligence for patient flow optimization, predictive analytics, and intelligent resource allocation.",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
            "features": [
                "Smart Patient Flow Management",
                "Predictive Resource Allocation", 
                "Intelligent Staff Scheduling",
                "Emergency Response Optimization"
            ],
            "aiCapabilities": [
                "Predictive Analytics for Patient Admission",
                "AI-Driven Bed Management",
                "Smart Resource Optimization",
                "Automated Report Generation"
            ],
            "stats": {
                "interest": 12,
                "aiAccuracy": "95%"
            }
        },
        {
            "id": "2", 
            "title": "Smart Dental Practice Suite",
            "description": "AI-enhanced dental practice management with intelligent appointment scheduling, treatment recommendation system, and patient care optimization.",
            "image": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop",
            "features": [
                "Intelligent Appointment Scheduling",
                "Treatment Planning Assistant",
                "Patient Communication Hub", 
                "Insurance Processing Automation"
            ],
            "aiCapabilities": [
                "AI Treatment Recommendations",
                "Smart Appointment Optimization",
                "Predictive Patient Needs",
                "Automated Documentation"
            ],
            "stats": {
                "interest": 8,
                "aiAccuracy": "92%"
            }
        },
        {
            "id": "3",
            "title": "Aesthetic & Dermatology AI Suite", 
            "description": "Advanced AI-powered dermatology platform with skin analysis, treatment prediction, and personalized care recommendations for aesthetic practices.",
            "image": "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&h=600&fit=crop",
            "features": [
                "AI Skin Analysis & Diagnosis",
                "Treatment Outcome Prediction",
                "Personalized Care Plans",
                "Progress Tracking System"
            ],
            "aiCapabilities": [
                "Computer Vision Skin Analysis",
                "Treatment Outcome Prediction", 
                "Personalized Product Recommendations",
                "Progress Monitoring AI"
            ],
            "stats": {
                "interest": 5,
                "aiAccuracy": "88%"
            }
        }
    ]

@router.get("/v1", response_model=List[Feature])
async def get_v1_features():
    """Get V1 features for product page"""
    return [
        {
            "id": "1",
            "title": "AI-Powered Discovery Engine",
            "description": "Revolutionary healthcare discovery powered by machine learning algorithms that understand patient needs, medical specialties, and real-time availability with 95% accuracy.",
            "icon": "Search",
            "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
            "benefits": [
                "Intelligent patient-hospital matching with AI algorithms",
                "Real-time availability tracking across all departments", 
                "Predictive analytics for optimal resource allocation",
                "Multi-language support with medical terminology",
                "Advanced filtering by specialty, location, and insurance",
                "Integration with existing hospital management systems"
            ],
            "aiFeatures": [
                "Machine Learning Patient Matching",
                "Predictive Demand Forecasting",
                "Natural Language Processing", 
                "Computer Vision for Medical Imaging"
            ],
            "stats": {
                "efficiency": "+65%",
                "adoption": "98%",
                "satisfaction": 4.9,
                "pilotInterest": 20
            },
            "demoVideo": "https://www.youtube.com/watch?v=demo1"
        },
        {
            "id": "2",
            "title": "Smart Appointment System",
            "description": "AI-enhanced appointment management with intelligent scheduling, automated confirmations, and predictive no-show prevention that reduces missed appointments by 40%.",
            "icon": "Calendar",
            "image": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
            "benefits": [
                "One-click booking with AI-powered scheduling",
                "Smart calendar synchronization across platforms",
                "Automated reminder system via SMS, email, and WhatsApp",
                "AI-driven waitlist management with automatic rebooking",
                "Insurance verification and pre-authorization",
                "Telemedicine integration for virtual consultations"
            ],
            "aiFeatures": [
                "Predictive No-Show Analysis",
                "Smart Scheduling Optimization",
                "Automated Communication AI",
                "Resource Utilization Prediction"
            ],
            "stats": {
                "efficiency": "+50%",
                "adoption": "95%", 
                "satisfaction": 4.8,
                "pilotInterest": 18
            },
            "demoVideo": "https://www.youtube.com/watch?v=demo2"
        },
        {
            "id": "3",
            "title": "AI Analytics Dashboard",
            "description": "Advanced business intelligence platform with artificial intelligence providing real-time insights, predictive modeling, and automated decision support for healthcare operations.",
            "icon": "BarChart3",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            "benefits": [
                "Real-time operational dashboards with AI insights",
                "Patient journey analytics with behavioral prediction",
                "Revenue optimization with dynamic AI pricing models",
                "Predictive analytics for demand forecasting",
                "Custom reporting with automated AI-driven insights",
                "Compliance monitoring with anomaly detection"
            ],
            "aiFeatures": [
                "Predictive Revenue Analytics",
                "Patient Behavior Analysis",
                "Automated Anomaly Detection",
                "Smart Resource Forecasting"
            ],
            "stats": {
                "efficiency": "+70%",
                "adoption": "92%",
                "satisfaction": 4.9,
                "pilotInterest": 15
            },
            "demoVideo": "https://www.youtube.com/watch?v=demo3"
        }
    ]