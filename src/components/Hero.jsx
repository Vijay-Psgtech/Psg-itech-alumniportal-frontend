import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../utils/motion'
import bannerImage from '../assets/campus.jpg'
import { Link } from 'react-router-dom'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <motion.img
          src={bannerImage}
          alt="PSG iTech alumni gathering"
          initial={reduceMotion ? false : { scale: 1.12 }}
          animate={{ scale: 1.04 }}
          transition={{
            duration: reduceMotion ? 0 : 18,
            ease: 'linear',
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: 'reverse',
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/85 via-slate-900/55 to-slate-900/20" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-slate-900/20" />
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={reduceMotion ? { opacity: 0.14 } : { opacity: [0.1, 0.28, 0.1], scale: [1, 1.16, 1] }}
          transition={{ duration: 9, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl sm:right-8 sm:top-20"
        />
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={reduceMotion ? { opacity: 0.12 } : { opacity: [0.08, 0.2, 0.08], x: [0, 22, 0], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-100 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
              </span>
              PSG Institute of Technology &amp; Applied Research
            </motion.span>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-white text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.6rem] font-semibold tracking-tight"
            >
              Every Alumnus,
              <br className="hidden sm:block" /> one legacy
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-slate-200 text-base max-w-md leading-relaxed"
            >
              Reconnect with your PSG iTech family. Find batchmates, discover
              mentors, and unlock a global network built by every graduating
              class since 2013.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex"
              >
                <Link
                  to="/alumni/directory"
                  className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Find alumni
                </Link>
              </motion.div>
              <Link to="/alumni/register" className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="w-9 h-9 rounded-full border border-white/30 grid place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                Join the community
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[["8,500+", "Alumni"], ["45+", "Countries"], ["300+", "Hiring partners"]].map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.56 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-white/20 pl-4 first:border-l-0 first:pl-0"
                >
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="text-xs text-slate-300 mt-1">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 32, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[360px] lg:col-span-5 lg:block"
          >
            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
              className="absolute right-3 top-2 h-64 w-64 rounded-full border border-white/20"
            >
              <span className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-blue-300 shadow-[0_0_24px_rgba(147,197,253,0.9)]" />
            </motion.div>
            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-10 top-14 grid h-48 w-48 place-items-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_80px_rgba(59,130,246,0.22)] backdrop-blur-sm"
            >
              <div className="grid h-36 w-36 place-items-center rounded-full border border-white/15 bg-slate-900/25 text-center">
                <div>
                  <p className="font-display text-5xl font-semibold text-white">13</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                    years together
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -7, 0] }}
              transition={reduceMotion ? { delay: 0.5 } : { opacity: { delay: 0.5 }, y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } }}
              className="absolute bottom-9 right-0 rounded-2xl border border-white/20 bg-white/95 px-5 py-4 shadow-2xl shadow-slate-950/25 backdrop-blur"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue-700">One community</p>
              <p className="mt-1 font-display text-lg font-semibold text-slate-900">A lifetime of connection</p>
            </motion.div>
          </motion.div>

          {/* <div className="lg:col-span-5 relative hidden lg:block h-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute right-0 bottom-0 w-72 bg-white rounded-2xl p-4 shadow-lg shadow-black/20 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center font-display font-semibold text-blue-500 shrink-0">
                AR
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-slate-900">Ananya R.</p>
                <p className="text-xs text-slate-400">Batch of 2019 · Google</p>
              </div>
            </motion.div>

            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              New listing
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}