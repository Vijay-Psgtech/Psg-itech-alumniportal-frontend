import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="PSG iTech alumni gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 text-orange-300 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              PSG Institute of Technology &amp; Applied Research
            </span>
            <h1 className="font-display text-white text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.6rem] font-semibold tracking-tight">
              Every Alumnus,
              <br className="hidden sm:block" /> one legacy
            </h1>
            <p className="mt-6 text-slate-200 text-base max-w-md leading-relaxed">
              Reconnect with your PSG iTech family. Find batchmates, discover
              mentors, and unlock a global network built by every graduating
              class since 2013.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-7 py-3.5 rounded-full"
              >
                Find alumni
              </motion.button>
              <button className="flex items-center gap-2 text-sm font-medium text-white">
                <span className="w-9 h-9 rounded-full border border-white/30 grid place-items-center">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M1 1L11 7L1 13V1Z" fill="#ffffff" />
                  </svg>
                </span>
                Watch story
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-semibold text-white">8,500+</p>
                <p className="text-xs text-slate-300 mt-1">Alumni</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">45+</p>
                <p className="text-xs text-slate-300 mt-1">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">300+</p>
                <p className="text-xs text-slate-300 mt-1">Hiring partners</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative hidden lg:block h-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute right-0 bottom-0 w-72 bg-white rounded-2xl p-4 shadow-lg shadow-black/20 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center font-display font-semibold text-orange-500 shrink-0">
                AR
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-slate-900">Ananya R.</p>
                <p className="text-xs text-slate-400">Batch of 2019 · Google</p>
              </div>
            </motion.div>

            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              New listing
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}