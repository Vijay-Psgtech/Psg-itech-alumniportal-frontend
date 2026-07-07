import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Pages/Home'
import AboutPage from './components/Pages/Aboutpage'
import EventsPage from './components/Pages/Eventspage'
import EventDetailPage from './components/Pages/Eventdetailpage'
import GalleryPage from './components/Pages/Gallerypage'
import FeedPage from './components/Pages/Feedpage'
import FeedDetailPage from './components/Pages/Feeddetailpage'
import { AuthProvider } from './components/context/AuthContext'
import AdminLogin from './components/Pages/admin/AdminLogin'
import AdminDashboard from './components/Pages/admin/AdminDashboard'
import AdminEvents from './components/Pages/admin/AdminEvents'
import AdminNewsLetter from './components/Pages/admin/AdminNewsLetter'
import AdminNotifications from './components/Pages/admin/AdminNotifications'
import AdminReports from './components/Pages/admin/AdminReports'
import AlumniUsersList from './components/Pages/admin/AlumniUsersList'
import AlumniLogin from './components/Pages/alumni/AlumniLogin'
import AlumniRegistration from './components/Pages/alumni/AlumniRegistration'
import ForgotPassword from './components/Pages/alumni/ForgotPassword'
import AlumniDashboard from './components/Pages/alumni/AlumniDashboard'
import AlumniDirectory from './components/Pages/alumni/AlumniDirectory'
import AlumniProfile from './components/Pages/alumni/AlumniProfile'
import AlumniMap from './components/Pages/alumni/AlumniMap'
import AlumniChapters from './components/Pages/alumni/AlumniChapters'
import AlumniDonations from './components/Pages/alumni/AlumniDonations'
import SendNotification from './components/Pages/alumni/SendNotification'
import NotificationInbox from './components/Pages/alumni/NotificationInbox'
import CampaignsPage from './components/Pages/alumni/CampaignsPage'
import CampaignFormPage from './components/Pages/alumni/CampaignFormPage'

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
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:slug" element={<FeedDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/newsletter" element={<AdminNewsLetter />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/alumni" element={<AlumniUsersList />} />
        <Route path="/alumni/login" element={<AlumniLogin />} />
        <Route path="/alumni/register" element={<AlumniRegistration />} />
        <Route path="/alumni/forgot-password" element={<ForgotPassword />} />
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
        <Route path="/alumni/directory" element={<AlumniDirectory />} />
        <Route path="/alumni/profile" element={<AlumniProfile />} />
        <Route path="/alumni/map" element={<AlumniMap />} />
        <Route path="/alumni/chapters" element={<AlumniChapters />} />
        <Route path="/alumni/donations" element={<AlumniDonations />} />
        <Route path="/alumni/notifications/new" element={<SendNotification />} />
        <Route path="/alumni/notifications" element={<NotificationInbox />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignFormPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="text-slate-900 antialiased">
          <ScrollProgressBar />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
