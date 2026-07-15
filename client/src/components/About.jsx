import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../motion'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'
import { alumniAPI } from '../services/api'

const formatCount = (value) => {
  const num = Number(value || 0)
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num)
}

export default function About() {
  const [stats, setStats] = useState({ totalAlumni: 8500, batchStats: 12, countryStats: 45, departmentStats: 300 })

  useEffect(() => {
    let isMounted = true
    alumniAPI.getStats()
      .then((response) => {
        if (!isMounted) return
        const payload = response?.data?.data || response?.data || response
        const statsData = payload?.success ? payload.data : payload
        if (statsData) {
          setStats({
            totalAlumni: statsData.totalAlumni || stats.totalAlumni,
            batchStats: statsData.batchStats || stats.batchStats,
            countryStats: statsData.countryStats || stats.countryStats,
            departmentStats: statsData.departmentStats || stats.departmentStats,
          })
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const statCards = [
    { value: `${formatCount(stats.totalAlumni)}+`, label: 'Alumni worldwide' },
    { value: `${formatCount(stats.batchStats)}+`, label: 'Batches represented' },
    { value: `${formatCount(stats.countryStats)}+`, label: 'Countries reached' },
    { value: `${formatCount(stats.departmentStats)}+`, label: 'Departments connected' },
  ]

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
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {statCards.map((s) => (
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