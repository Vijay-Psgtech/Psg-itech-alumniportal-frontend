import { motion } from 'framer-motion'
import { fadeUp, scaleIn, viewport } from '../utils/motion'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

export default function Spotlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3 text-center"
      >
        Alumni spotlight
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center leading-tight mb-14"
      >
        Showcasing the best of iTech
      </motion.h2>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative rounded-[2rem] overflow-hidden bg-slate-900 min-h-[280px] flex items-end"
      >
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Alumni spotlight background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/60" />
        </div>

        <motion.div
          className="absolute -top-10 -right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative p-8 sm:p-12 w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/15 grid place-items-center font-display font-semibold text-2xl text-orange-400">
              SS
            </div>
            <div>
              <h3 className="font-display text-2xl text-white font-semibold">Shrihari S.</h3>
              <p className="text-white/60 text-sm mt-1">Digital Trust Consultant at KPMG</p>
              <p className="text-white/35 text-xs mt-2">Batch of 2020 · Coimbatore → London</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-full">
              Featured story
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-slate-900 font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Read story
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}