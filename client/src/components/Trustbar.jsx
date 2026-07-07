import { motion } from 'framer-motion'
import { fadeIn, viewport } from '../motion'

const partners = ['KPMG', 'Google', 'Microsoft', 'Amazon', 'TCS', 'Zoho']

export default function TrustBar() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-2">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 border-b border-slate-100 pb-8"
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 shrink-0">
          Our alumni build at
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {partners.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="font-display text-lg font-semibold text-slate-300 hover:text-slate-600 transition-colors cursor-default"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}