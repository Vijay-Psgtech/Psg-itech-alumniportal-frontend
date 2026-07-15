import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../motion'
import { newsLetterAPI } from '../services/api'

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    let isMounted = true
    newsLetterAPI.getAll()
      .then((response) => {
        if (!isMounted) return
        const payload = Array.isArray(response?.data) ? response.data : response?.data?.data || []
        setNews(payload.slice(0, 3))
      })
      .catch(() => setNews([]))

    return () => {
      isMounted = false
    }
  }, [])
  return (
    <section id="careers" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
      >
        <div>
          <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3">Latest</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight max-w-lg">
            News and stories from the network
          </h2>
        </div>
        <button className="border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors font-medium px-7 py-3 rounded-full text-sm w-fit">
          View all
        </button>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-3 gap-6"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {news.map((n) => (
          <motion.article
            key={n._id || n.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm shadow-black/[0.03]"
          >
            <div className="h-48 relative bg-slate-100">
              <svg viewBox="0 0 300 190" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <rect width="300" height="190" fill="#e2e8f0" />
                <rect y="130" width="300" height="60" fill="#cbd5e1" />
                <g fill="#94a3b8">
                  <rect x="30" y="75" width="36" height="55" />
                  <rect x="80" y="50" width="36" height="80" />
                  <rect x="130" y="30" width="36" height="100" />
                  <rect x="180" y="60" width="36" height="70" />
                  <rect x="230" y="85" width="36" height="45" />
                </g>
              </svg>
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
                {n.category || 'Story'}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-2">{n.date || 'Latest update'}</p>
              <h3 className="font-display font-semibold text-lg text-slate-900 leading-snug">{n.title}</h3>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{n.description?.slice(0, 140) || 'Fresh updates from the alumni network.'}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}