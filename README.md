# Hospverse - AI-Powered Healthcare Management Platform

## 🏥 Overview
From Reception to Recovery, We've Got You

Hospverse is a comprehensive healthcare management platform built with AI-first architecture. It provides specialized solutions for hospitals, dental clinics, and aesthetic practices with intelligent automation, predictive analytics, and role-based access control.

## 🚀 Features

### Multi-Specialty Support
- **Hospital Management**: Complete hospital operations with AI-powered patient flow optimization
- **Dental Practice**: Smart dental clinic management with treatment recommendations
- **Aesthetic Medicine**: Advanced skin analysis and treatment outcome prediction

### AI-Powered Capabilities
- Predictive patient admission forecasting
- Intelligent appointment scheduling
- Smart resource optimization
- Automated clinical documentation
- Computer vision for medical imaging
- Treatment outcome prediction

### Role-Based Dashboards
- **Doctor Dashboard**: Patient queue, SOAP notes, lab results
- **Reception Dashboard**: Appointment management, patient check-in
- **Pharmacy Dashboard**: Inventory management, prescription processing
- **Lab Dashboard**: Sample tracking, results management
- **HR Dashboard**: Staff management, shift scheduling
- **Accounts Dashboard**: Financial management, billing

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Vite** for development

### Backend
- **FastAPI** (Python)
- **Supabase** (PostgreSQL + Auth)
- **JWT** authentication
- **Row Level Security** (RLS)

## 🚀 Quick Start

### Demo Login
Visit the login page and use one of the following demo accounts:

- **Admin**: admin@demo.com / demo123
- **Doctor**: doctor@demo.com / demo123
- **Reception**: reception@demo.com / demo123
- **Patient**: patient@demo.com / demo123

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## 📊 Database Schema

### Core Tables
- `users` - User authentication and profiles
- `clinics` - Healthcare facilities
- `doctors` - Medical practitioners
- `patients` - Patient information
- `appointments` - Appointment scheduling
- `pharmacy_items` - Medication inventory
- `lab_tests` - Laboratory tests
- `hr_staff` - Staff management
- `accounts_tx` - Financial transactions

### Security
- Row Level Security (RLS) enabled
- Role-based access policies
- Clinic-based data isolation

## 🔗 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Current user profile

### Appointments
- `GET /appointments` - List appointments
- `POST /appointments` - Create appointment
- `PATCH /appointments/{id}` - Update appointment

## 📱 Mobile Support

- Progressive Web App (PWA)
- Mobile-first responsive design
- Touch-optimized interactions

---

**Made with ❤️ in Hyderabad, India**