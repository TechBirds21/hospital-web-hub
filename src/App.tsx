import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { HospitalManagementPage } from './pages/specialty/HospitalManagementPage';
import { DentalPracticePage } from './pages/specialty/DentalPracticePage';
import { DermatologyPage } from './pages/specialty/DermatologyPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Dashboard Pages
import { HospitalDashboard } from './pages/dashboards/HospitalDashboard';
import { DentalDashboard } from './pages/dashboards/DentalDashboard';
import { AestheticDashboard } from './pages/dashboards/AestheticDashboard';
import { PatientPortal } from './pages/portals/PatientPortal';
import { StaffPortal } from './pages/portals/StaffPortal';
import { LoginPage } from './pages/auth/LoginPage';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <HomePage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/product" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <ProductPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/specialties" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <SpecialtiesPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/specialties/hospital" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <HospitalManagementPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/specialties/dental" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <DentalPracticePage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/specialties/dermatology" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <DermatologyPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/roadmap" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <RoadmapPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            <Route path="/contact" element={
              <AnimatePresence mode="wait" initial={false}>
                <Navbar />
                <ContactPage />
                <Footer />
                <FloatingWhatsApp />
              </AnimatePresence>
            } />
            
            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/hospital/*" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager']}>
                <HospitalDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dental/*" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'receptionist', 'assistant']}>
                <DentalDashboard />
              </ProtectedRoute>
            } />
            <Route path="/aesthetic/*" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'practitioner', 'receptionist']}>
                <AestheticDashboard />
              </ProtectedRoute>
            } />
            
            {/* Patient Portal */}
            <Route path="/patient/*" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientPortal />
              </ProtectedRoute>
            } />
            
            {/* Staff Portal */}
            <Route path="/staff/*" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'hr_manager']}>
                <StaffPortal />
              </ProtectedRoute>
            } />
            
            {/* Legacy Admin (will be moved to hospital dashboard) */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;