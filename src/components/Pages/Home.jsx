import { motion } from 'framer-motion'
import Hero from '../Hero'
import QuickAccess from '../QuickAccess'
import TrustBar from '../Trustbar'
import Events from '../Events'
import About from '../About'
import Spotlight from '../Spotlight'
import Engagement from '../Engagement'
import WhyJoin from '../WhyJoin'
import Process from '../Process'
import Testimonials from '../Testimonials'
import AppCTA from '../AppCTA'
import News from '../News'

// Page-level transition — used by AnimatePresence in App.jsx when routing
// in and out of "/". Kept subtle: a short fade + rise, no bounce, so it
// doesn't fight the section-level scroll animations underneath it.
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

// Sections stagger in on the very first paint, one beat apart, so the
// homepage doesn't just "appear" — it settles into place.
const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

const sections = [Events, About, Spotlight, Engagement, WhyJoin, Process, Testimonials, AppCTA, News]

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <QuickAccess />
      <TrustBar />

      {sections.map((Section, i) => (
        <motion.div
          key={Section.name ?? i}
          custom={i}
          variants={sectionReveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Section />
        </motion.div>
      ))}
    </motion.div>
  )
}