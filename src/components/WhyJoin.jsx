import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const reasons = [
  { title: 'Verified directory', desc: 'Every profile confirmed by the alumni office.' },
  { title: 'Global network', desc: 'Chapters live across 45+ countries.' },
  { title: 'Career opportunities', desc: 'Referrals and roles shared alumni-first.' },
  { title: 'Always-on community', desc: 'Chat, events, and support around the clock.' },
]

export default function WhyJoin() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="rounded-3xl h-96 bg-slate-100 border border-slate-100 relative overflow-hidden order-2 lg:order-1"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="180" r="120" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="200" cy="180" r="80" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <motion.circle
            cx="200" cy="180" r="7" fill="#f97316"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="270" cy="130" r="6" fill="#0f172a" />
          <circle cx="130" cy="230" r="6" fill="#f97316" />
          <circle cx="290" cy="240" r="6" fill="#0f172a" />
          <circle cx="120" cy="120" r="6" fill="#f97316" />
          <line x1="200" y1="180" x2="270" y2="130" stroke="#94a3b8" strokeWidth="1" />
          <line x1="200" y1="180" x2="130" y2="230" stroke="#94a3b8" strokeWidth="1" />
          <line x1="200" y1="180" x2="290" y2="240" stroke="#94a3b8" strokeWidth="1" />
          <line x1="200" y1="180" x2="120" y2="120" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      </motion.div>

      <div className="order-1 lg:order-2">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3">Why join</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            Focused on your next chapter
          </h2>
          <p className="text-slate-500 mt-5 leading-relaxed max-w-md">
            We're building the most trustworthy alumni network in the region
            — verified profiles, transparent opportunities, and a community
            that shows up for each other.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-5 mt-9"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {reasons.map((r) => (
            <motion.div key={r.title} variants={fadeUp} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 grid place-items-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{r.title}</p>
                <p className="text-xs text-slate-400 mt-1">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-9 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-8 py-3.5 rounded-full text-sm"
        >
          Join the network
        </motion.button>
      </div>
    </section>
  )
}