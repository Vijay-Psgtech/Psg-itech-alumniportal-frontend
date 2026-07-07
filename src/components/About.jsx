import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

const stats = [
  { value: '12+', label: 'Years of legacy' },
  { value: '8.5K+', label: 'Alumni worldwide' },
  { value: '45+', label: 'Countries reached' },
  { value: '98%', label: 'Would recommend' },
]

export default function About() {
  return (
    <section id="about" className="bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28 grid lg:grid-cols-2 gap-14 items-center relative">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-4">Who we are</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            We keep the iTech family within reach
          </h2>
          <p className="text-slate-500 mt-6 leading-relaxed max-w-lg">
            From the pioneering batch of 2013 to the newest graduates, the PSG
            iTech Alumni Association exists to keep every relationship alive
            — through mentorship, chapters, hiring drives, and the everyday
            moments that make an alma mater matter.
          </p>
          <motion.a
            href="#directory"
            whileHover={{ x: 2 }}
            className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-6 py-3 rounded-full"
          >
            Explore the directory <span>→</span>
          </motion.a>

          {/* Image wrapper */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-10 relative rounded-3xl overflow-hidden h-[280px] sm:h-[340px]"
          >
            <img
              src={bannerImage}
              alt="PSG iTech alumni community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-sm font-medium">Alumni Meet 2024</p>
              <p className="text-xs text-white/70 mt-0.5">Coimbatore campus reunion</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-5"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm shadow-black/[0.03]"
            >
              <p className="font-display text-4xl font-semibold text-slate-900">{s.value}</p>
              <p className="text-slate-400 text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}