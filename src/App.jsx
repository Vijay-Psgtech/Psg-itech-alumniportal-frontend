import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from './components/Footer'

// Thin progress bar pinned under the navbar, filled by scroll position.
// useSpring smooths the raw scroll value so it glides instead of jittering.
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-tot-r from-orange-400 via-amber-400 to-orange-500"
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

      </Routes>

    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="text-slate-900 antialiased">
        <ScrollProgressBar />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}