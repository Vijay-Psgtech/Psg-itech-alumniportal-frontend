import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../motion'

const testimonials = [
  {
    stars: 5,
    quote: 'Reconnecting with my batch after eight years took five minutes on this platform. The chapter meets are the highlight of my year.',
    name: 'Shyam Sudan T.',
    role: 'Batch of 2018',
  },
  {
    stars: 4,
    quote: "Flash Mentorship connected me with a senior in my exact field within days. Genuinely the fastest career advice I've ever gotten.",
    name: 'Abhi C.',
    role: 'Batch of 2021',
  },
  {
    stars: 5,
    quote: "The directory made hiring from my own college effortless. We've onboarded three iTech grads through the platform this year.",
    name: 'Meera K.',
    role: 'Batch of 2016 · Hiring manager',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-orange-500 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#f97316' : '#e2e8f0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3 text-center"
        >
          Testimonials
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center leading-tight mb-16"
        >
          Customers love our findings
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm shadow-black/[0.03]"
            >
              <Stars count={t.stars} />
              <p className="text-slate-600 text-sm leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-orange-50 grid place-items-center font-medium text-orange-500 text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}