# Hospverse Demo Setup Guide

## 💡 Quick Start: Local Authentication (Recommended)

The easiest way to demo the application is using our built-in local authentication:

1. Start the application with `npm run dev`
2. Go to http://localhost:5173/login
3. Use the quick login buttons to sign in as:
   - Admin
   - Doctor
   - Receptionist
   - Patient

**No database configuration required!** The demo users are pre-configured with appropriate permissions and roles.

## 🔄 Accessing Different Dashboards

After logging in, you'll be directed to the role-specific dashboard:

- **Admin**: Complete hospital management view
- **Doctor**: Patient queue and appointment management
- **Receptionist**: Front desk operations
- **Patient**: Personal health records and appointments

## 🌐 Exploring the Public Website

The public-facing website showcases:

- **Home**: Introduction to Hospverse platform
- **Product**: Detailed feature showcase
- **Specialties**: Hospital, dental and aesthetic solutions
- **Contact**: Demo request form

## 💼 Key Features to Explore

1. **Role-Based Dashboards**: Each user type sees a tailored interface
2. **Multi-Specialty Support**: Hospital, dental, and aesthetic practice solutions
3. **Interactive UI**: Beautiful, responsive design with animations
4. **Consistent Branding**: "From Reception to Recovery, We've Got You"

## 🛠️ Technical Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router

## 📝 Notes

- This is a demo application with simulated data
- Backend API calls are mocked in development
- In a production setup, you would connect to your Supabase backend

Enjoy exploring Hospverse!