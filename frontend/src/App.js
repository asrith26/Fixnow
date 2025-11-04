import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { PaymentHistoryProvider } from './context/PaymentHistoryContext';
import { ProfessionalProvider } from './context/ProfessionalContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FindPro from './pages/FindPro';
import BecomePro from './pages/BecomePro';
import ProfessionalApplication from './pages/ProfessionalApplication';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import FindProfessionalsNearMe from './pages/FindProfessionalsNearMe';
import BookingHistory from './pages/BookingHistory';
import BookDate from './pages/BookDate';
import BookTime from './pages/BookTime';
import BookConfirmation from './pages/BookConfirmation';
import Payment from './pages/Payment';
import PaymentComplete from './pages/PaymentComplete';
import PaymentHistory from './pages/PaymentHistory';
import ApplicationStatus from './pages/ApplicationStatus';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import Profile from './pages/Profile';

// Components
import Header from './components/Header';

function AppContent() {
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const hideHeaderRoutes = ['/professional-dashboard'];

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not logged in, only show welcome, signup, and login pages
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    );
  }

  // If user is logged in, show all pages with header
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/find-pro" element={<FindPro />} />
        <Route path="/become-pro" element={<BecomePro />} />
        <Route path="/professional-application" element={<ProfessionalApplication />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-professionals-near-me" element={<FindProfessionalsNearMe />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/book-date" element={<BookDate />} />
        <Route path="/book-time" element={<BookTime />} />
        <Route path="/book-confirmation" element={<BookConfirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <PaymentHistoryProvider>
            <ProfessionalProvider>
              <Router>
                <AppContent />
              </Router>
            </ProfessionalProvider>
          </PaymentHistoryProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
