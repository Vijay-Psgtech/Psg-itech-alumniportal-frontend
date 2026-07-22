import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import ScrolltoTop from './components/ScrolltoTop';

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const Home = lazy(() => import("./Pages/Home"));
const AboutPage = lazy(() => import("./Pages/Aboutpage"));
const EventsPage = lazy(() => import("./Pages/Eventspage"));
const EventDetailPage = lazy(() => import("./Pages/Eventdetailpage"));
const FeedPage = lazy(() => import("./Pages/Feedpage"));
const FeedDetailPage = lazy(() => import("./Pages/Feeddetailpage"));
const GalleryPage = lazy(() => import("./Pages/Gallerypage"));

const AlumniDashboard = lazy(() => import("./Pages/alumni/AlumniDashboard"));
const AlumniRegistration = lazy(() => import("./Pages/alumni/AlumniRegistration"));
const AlumniLogin = lazy(() => import("./Pages/alumni/AlumniLogin"));
const AlumniChapters = lazy(() => import("./Pages/alumni/AlumniChapters"));
const AlumniDirectory = lazy(() => import("./Pages/alumni/AlumniDirectory"));
const AlumniProfile = lazy(() => import("./Pages/alumni/AlumniProfile"));
const AlumniMap = lazy(() => import("./Pages/alumni/AlumniMap"));
const CampaignsPage = lazy(() => import("./Pages/alumni/CampaignsPage"));
const CampaignFormPage = lazy(() => import("./Pages/alumni/CampaignFormPage"));
const AlumniDonations = lazy(() => import("./Pages/alumni/AlumniDonations"));
const SendNotification = lazy(() => import("./Pages/alumni/SendNotification"));
const NotificationInbox = lazy(() => import("./Pages/alumni/NotificationInbox"));
const ForgotPassword = lazy(() => import("./Pages/alumni/ForgotPassword"));

const AdminLogin = lazy(() => import("./Pages/admin/AdminLogin"));
const AdminEvents = lazy(() => import("./Pages/admin/AdminEvents"));
const AdminNewsLetter = lazy(() => import("./Pages/admin/AdminNewsletter"));
const AdminDashboard = lazy(() => import("./Pages/admin/AdminDashboard"));
const AlumniUsersList = lazy(() => import("./Pages/admin/AlumniUsersList"));
const AdminNotifications = lazy(() => import("./Pages/admin/AdminNotifications"));
const AdminReports = lazy(() => import("./Pages/admin/AdminReports"));

// Thin progress bar pinned under the navbar, filled by scroll position.
// useSpring smooths the raw scroll value so it glides instead of jittering.
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"
      style={{ scaleX }}
    />
  )
}

// Cross-fades routes on navigation. mode="wait" lets the outgoing page
// finish its exit animation before the incoming one starts, so they never
// overlap awkwardly.
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:slug" element={<FeedDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Alumni Routes */}
        <Route path="/alumni/dashboard" element={<ProtectedRoute><AlumniDashboard /></ProtectedRoute>} />
        <Route path="/alumni/register" element={<AlumniRegistration />} />
        <Route path="/alumni/login" element={<AlumniLogin />} />
        <Route path="/alumni/chapters" element={<AlumniChapters />} />
        <Route path="/alumni/directory" element={<ProtectedRoute><AlumniDirectory /></ProtectedRoute>} />
        <Route path="/alumni/profile/" element={<ProtectedRoute><AlumniProfile /></ProtectedRoute>} />
        <Route path="/alumni/map" element={<ProtectedRoute><AlumniMap /></ProtectedRoute>} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignFormPage />} />
        <Route path="/alumni/donations" element={<ProtectedRoute><AlumniDonations /></ProtectedRoute>} />
        <Route path="/alumni/notifications/new" element={<SendNotification />} />
        <Route path="/alumni/notifications" element={<ProtectedRoute><NotificationInbox /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/events" element={<ProtectedAdminRoute><AdminEvents /></ProtectedAdminRoute>} />
        <Route path="/admin/newsletter" element={<AdminNewsLetter />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/alumni" element={<ProtectedAdminRoute><AlumniUsersList /></ProtectedAdminRoute>} />
        <Route path="/admin/notifications" element={<ProtectedAdminRoute><AdminNotifications /></ProtectedAdminRoute>} />
        <Route path="/admin/reports" element={<ProtectedAdminRoute><AdminReports /></ProtectedAdminRoute>} />

      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-slate-900/70 z-[60]"><div className="w-12 h-12 rounded-full border-4 border-t-orange-400 border-r-orange-400 border-b-transparent border-l-transparent animate-spin" /></div>}>
        <div className="text-slate-900 antialiased">
          <ScrollProgressBar />
          <Navbar />
          <ScrolltoTop />
          <AnimatedRoutes />
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter>
  )
}