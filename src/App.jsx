import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import ScrolltoTop from './components/ScrolltoTop';

const Home = lazy(() => import("./Pages/Home"));
const AboutPage = lazy(() => import("./Pages/Aboutpage"));
const EventsPage = lazy(() => import("./Pages/Eventspage"));
const EventDetailPage = lazy(() => import("./Pages/Eventdetailpage"));
const FeedPage = lazy(() => import("./Pages/Feedpage"));
const FeedDetailPage = lazy(() => import("./Pages/Feeddetailpage"));
const GalleryPage = lazy(() => import("./Pages/Gallerypage"));

const AlumniRegistration = lazy(() => import("./Pages/alumni/AlumniRegistration"));
const AlumniLogin = lazy(() => import("./Pages/alumni/AlumniLogin"));
const AlumniChapters = lazy(() => import("./Pages/alumni/AlumniChapters"));
const AlumniDirectory = lazy(() => import("./Pages/alumni/AlumniDirectory"));
const AlumniProfile = lazy(() => import("./Pages/alumni/AlumniProfile"));
const AlumniMap = lazy(() => import("./Pages/alumni/AlumniMap"));
const CampaignsPage = lazy(() => import("./Pages/alumni/CampaignsPage"));
const CampaignFormPage = lazy(() => import("./Pages/alumni/CampaignFormPage"));

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
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:slug" element={<FeedDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Alumni Routes */}
        <Route path="/alumni/register" element={<AlumniRegistration />} />
        <Route path="/alumni/login" element={<AlumniLogin />} />
        <Route path="/alumni/chapters" element={<AlumniChapters />} />
        <Route path="/alumni/directory" element={<AlumniDirectory />} />
        <Route path="/alumni/profile/" element={<AlumniProfile />} />
        <Route path="/alumni/map" element={<AlumniMap />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignFormPage />} />

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