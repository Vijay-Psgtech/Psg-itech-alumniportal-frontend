import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../utils/motion'

export default function AppCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative rounded-[2rem] overflow-hidden bg-slate-900 px-8 py-14 sm:px-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8"
      >
        <motion.div
          className="absolute -top-16 -left-16 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
            Ready to reconnect with iTech?
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-sm">
            Join thousands of alumni already back in touch with their batch, mentors, and campus.
          </p>
        </div>
        <div className="relative flex items-center gap-4 shrink-0">
          <motion.a
            href="tel:+918000060096"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-6 py-3.5 rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.6 2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            +91 8000 060 096
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}