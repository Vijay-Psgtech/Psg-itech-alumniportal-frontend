import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const ways = [
  { num: '01', tag: 'Mentor', title: 'Guide the next generation', desc: 'Guide a student or early-career alum through Flash Mentorship.' },
  { num: '02', tag: 'Hire', title: 'Tap into trusted talent', desc: 'Post roles and reach directly into a vetted graduate talent pool.' },
  { num: '03', tag: 'Give back', title: 'Shape what comes next', desc: 'Fund scholarships and campus initiatives that shape tomorrow.' },
]

export default function Engagement() {
  return (
    <section id="engagement" className="bg-white py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3">Get involved</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight max-w-lg">
              Redefining alumni engagement
            </h2>
          </div>
          <button className="border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors font-medium px-7 py-3 rounded-full text-sm w-fit">
            See all programs
          </button>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {ways.map((w) => (
            <motion.div
              key={w.tag}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden h-80 bg-slate-100"
            >
              <svg
                viewBox="0 0 300 320"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="300" height="320" fill="#e2e8f0" />
                <rect y="220" width="300" height="100" fill="#cbd5e1" />
                <g fill="#94a3b8">
                  <rect x="30" y="130" width="40" height="90" />
                  <rect x="90" y="90" width="40" height="130" />
                  <rect x="150" y="60" width="40" height="160" />
                  <rect x="210" y="100" width="40" height="120" />
                </g>
              </svg>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {w.tag}
              </span>

              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="text-white/50 text-xs font-medium mb-2">{w.num}</span>
                <h3 className="font-display text-xl font-semibold text-white">{w.title}</h3>
                <p className="text-sm mt-2 text-white/70">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}