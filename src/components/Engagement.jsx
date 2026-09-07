import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const ways = [
  {
    num: '01',
    tag: 'Mentor',
    title: 'Guide the next generation',
    desc: 'Guide a student or early-career alum through Flash Mentorship.',
    icon: 'compass',
  },
  {
    num: '02',
    tag: 'Hire',
    title: 'Tap into trusted talent',
    desc: 'Post roles and reach directly into a vetted graduate talent pool.',
    icon: 'target',
  },
  {
    num: '03',
    tag: 'Give back',
    title: 'Shape what comes next',
    desc: 'Fund scholarships and campus initiatives that shape tomorrow.',
    icon: 'seedling',
  },
]

// Each icon is drawn on the same 300x320 stage so the three cards stay
// visually aligned, but the mark itself is unique to what the card means.
function CardArt({ icon, uid }) {
  const gradId = `art-grad-${uid}`

  return (
    <svg
      viewBox="0 0 300 320"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>

      <rect width="300" height="320" fill={`url(#${gradId})`} />

      {/* faint dot grid for texture, consistent across all three cards */}
      <g fill="#94a3b8" opacity="0.25">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 36} cy={20 + row * 36} r="1.4" />
          ))
        )}
      </g>

      {icon === 'compass' && (
        <g transform="translate(150 140)" fill="none">
          <circle r="52" stroke="#94a3b8" strokeWidth="2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-52"
              x2="0"
              y2={i % 3 === 0 ? '-42' : '-47'}
              stroke="#94a3b8"
              strokeWidth="2"
              transform={`rotate(${i * 30})`}
            />
          ))}
          <polygon points="0,-30 8,4 0,-6 -8,4" fill="#f97316" />
          <polygon points="0,30 8,-4 0,6 -8,-4" fill="#e2e8f0" />
          <circle r="5" fill="#1e293b" />
        </g>
      )}

      {icon === 'target' && (
        <g transform="translate(150 140)" fill="none">
          <circle r="52" stroke="#94a3b8" strokeWidth="2" />
          <circle r="34" stroke="#94a3b8" strokeWidth="2" />
          <circle r="16" stroke="#94a3b8" strokeWidth="2" />
          <circle r="5" fill="#f97316" />
          <path
            d="M -85 85 L -22 22"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M -85 85 L -63 85 L -85 63 Z"
            fill="#1e293b"
          />
        </g>
      )}

      {icon === 'seedling' && (
        <g transform="translate(150 150)" fill="none">
          {[26, 42, 58].map((r) => (
            <path
              key={r}
              d={`M ${-r} -6 A ${r} ${r} 0 0 1 ${r} -6`}
              stroke="#94a3b8"
              strokeWidth="2"
              opacity={r === 26 ? 0.9 : r === 42 ? 0.6 : 0.35}
            />
          ))}
          <line x1="0" y1="-10" x2="0" y2="55" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M 0 10 C -26 4 -34 -18 -22 -34 C -8 -22 -4 4 0 10 Z"
            fill="#f97316"
          />
          <path
            d="M 0 26 C 24 20 32 -2 20 -18 C 6 -6 2 20 0 26 Z"
            fill="#fb923c"
          />
          <line x1="-30" y1="55" x2="30" y2="55" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

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
              <CardArt icon={w.icon} uid={w.tag} />

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