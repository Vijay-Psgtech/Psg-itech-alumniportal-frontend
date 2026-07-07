import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../motion'

const cards = [
  {
    index: '01',
    title: 'Alumni in your city',
    desc: 'Find alumni living nearby and build your local circle.',
    cta: 'Alumni in my city',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 21V7l8-4 8 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    index: '02',
    title: 'Your batchmates',
    desc: 'See where your exclusive batch is today, all in one place.',
    cta: 'My batchmates',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    index: '03',
    title: 'Alumni directory',
    desc: 'Explore the full directory and connect by interest or domain.',
    cta: 'View directory',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 9h6M8 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: '04',
    title: 'Your alumni profile',
    desc: 'Complete your profile and stay matched with opportunities.',
    cta: 'My profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

// Slow-drifting blob used behind the card grid. Pure transform/opacity so it
// stays cheap to animate.
function Blob({ className, size, duration, delay = 0, path }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={{
        x: path.x,
        y: path.y,
        scale: path.scale ?? [1, 1.15, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  )
}

export default function QuickAccess() {
  return (
    <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-6 lg:px-10">
      {/* ambient background layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2.5rem]">
        <Blob
          className="bg-orange-300/30 -left-24 -top-24"
          size={340}
          duration={14}
          path={{ x: [0, 40, 0], y: [0, 30, 0] }}
        />
        <Blob
          className="bg-amber-200/40 right-[-6rem] top-10"
          size={280}
          duration={18}
          delay={2}
          path={{ x: [0, -30, 0], y: [0, 40, 0] }}
        />
        <Blob
          className="bg-orange-100/50 left-1/3 bottom-[-8rem]"
          size={320}
          duration={20}
          delay={1}
          path={{ x: [0, 25, 0], y: [0, -20, 0] }}
        />

        {/* fine dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
          }}
        />

        {/* grain overlay for texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply">
          <filter id="qa-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#qa-noise)" />
        </svg>
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-7 shadow-lg shadow-black/[0.04] backdrop-blur-sm"
          >
            {/* gradient ring that sweeps in on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,#f97316_0deg,transparent_100deg,transparent_260deg,#f97316_360deg)] opacity-20" />
              <div className="absolute inset-[1px] rounded-2xl bg-white/95" />
            </div>

            {/* oversized watermark index number */}
            <span className="pointer-events-none absolute -top-3 right-3 font-display text-6xl font-bold text-slate-900/[0.04] transition-colors duration-500 group-hover:text-orange-500/[0.08]">
              {c.index}
            </span>

            <div className="relative">
              <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                {c.icon}
              </div>

              <h3 className="font-display text-lg font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>

              <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600">
                {c.cta}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </button>
            </div>

            {/* bottom accent bar that grows in on hover */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-400 to-amber-300 transition-all duration-500 ease-out group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}