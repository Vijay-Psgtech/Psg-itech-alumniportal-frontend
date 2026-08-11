import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const steps = [
  {
    step: '01',
    title: 'Create your profile',
    desc: 'Register with your batch, department, and current role.',
    icon: 'profile',
  },
  {
    step: '02',
    title: 'Get verified',
    desc: 'Our team confirms your graduation details within 24 hours.',
    icon: 'verified',
  },
  {
    step: '03',
    title: 'Start connecting',
    desc: 'Browse the directory, join chapters, and message batchmates.',
    icon: 'network',
  },
]

// Same visual language as the Engagement cards (gradient wash + dot grid),
// scaled to this section's shorter 300x220 stage, with a mark unique to
// each step instead of a repeated bar-chart placeholder.
function StepArt({ icon, uid }) {
  const gradId = `step-grad-${uid}`

  return (
    <svg viewBox="0 0 300 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={gradId} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>

      <rect width="300" height="220" fill={`url(#${gradId})`} />

      <g fill="#94a3b8" opacity="0.25">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 52} cy={15 + row * 28} r="1.4" />
          ))
        )}
      </g>

      {icon === 'profile' && (
        <g transform="translate(150 108)" fill="none">
          <rect x="-56" y="-42" width="112" height="84" rx="10" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="-24" cy="-10" r="14" fill="#f97316" />
          <path d="M -46 24 C -46 6 -6 6 -6 24" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="10" y1="-18" x2="42" y2="-18" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="-4" x2="42" y2="-4" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="10" x2="30" y2="10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {icon === 'verified' && (
        <g transform="translate(150 108)" fill="none">
          <path
            d="M 0 -46 L 44 -30 L 44 8 C 44 34 24 48 0 56 C -24 48 -44 34 -44 8 L -44 -30 Z"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="#f1f5f9"
          />
          <circle r="26" fill="#f97316" />
          <path d="M -11 0 L -3 9 L 13 -10" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {icon === 'network' && (
        <g transform="translate(150 108)" fill="none">
          <line x1="0" y1="0" x2="-52" y2="-30" stroke="#94a3b8" strokeWidth="2" />
          <line x1="0" y1="0" x2="52" y2="-30" stroke="#94a3b8" strokeWidth="2" />
          <line x1="0" y1="0" x2="-52" y2="34" stroke="#94a3b8" strokeWidth="2" />
          <line x1="0" y1="0" x2="52" y2="34" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="-52" cy="-30" r="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="52" cy="-30" r="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="-52" cy="34" r="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="52" cy="34" r="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <circle r="18" fill="#f97316" />
        </g>
      )}
    </svg>
  )
}

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
                <StepArt icon={s.icon} uid={s.step} />
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