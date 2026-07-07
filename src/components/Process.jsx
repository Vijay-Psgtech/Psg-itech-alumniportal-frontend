import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const steps = [
  {
    step: '01',
    title: 'Create your profile',
    desc: 'Register with your batch, department, and current role.',
  },
  {
    step: '02',
    title: 'Get verified',
    desc: 'Our team confirms your graduation details within 24 hours.',
  },
  {
    step: '03',
    title: 'Start connecting',
    desc: 'Browse the directory, join chapters, and message batchmates.',
  },
]

export default function Process() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3 text-center"
        >
          How it works
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center leading-tight mb-16"
        >
          Three steps to reconnect
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {steps.map((s) => (
            <motion.div key={s.step} variants={fadeUp}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden bg-slate-100 h-56 relative mb-5"
              >
                <svg viewBox="0 0 300 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="300" height="220" fill="#e2e8f0" />
                  <rect y="150" width="300" height="70" fill="#cbd5e1" />
                  <g fill="#94a3b8">
                    <rect x="30" y="85" width="36" height="65" />
                    <rect x="80" y="55" width="36" height="95" />
                    <rect x="130" y="30" width="36" height="120" />
                    <rect x="180" y="65" width="36" height="85" />
                    <rect x="230" y="95" width="36" height="55" />
                  </g>
                </svg>
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-medium w-8 h-8 rounded-full grid place-items-center">
                  {s.step}
                </span>
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-9 py-3.5 rounded-full text-sm"
          >
            Get started
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}