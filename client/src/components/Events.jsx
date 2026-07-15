import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../motion'
import { eventsAPI } from '../services/api'

const filters = ['All', 'Chapters', 'Reunions']

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#94a3b8" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="#94a3b8" strokeWidth="1.8" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 6.5c1.4.4 2.5 1.7 2.5 3.3s-1.1 2.9-2.5 3.3" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 20c0-2.6-1.7-4.8-4-5.6" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    eventsAPI.getAll({ status: 'upcoming' })
      .then((response) => {
        if (!isMounted) return
        const payload = Array.isArray(response?.data) ? response.data : response?.data?.data || []
        setEvents(payload)
      })
      .catch(() => setEvents([]))
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Category match is tolerant of how the backend labels things
  // (e.g. "chapter meet" or "reunion 2024" should still match "Chapters"/"Reunions").
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return events.slice(0, 6)
    const needle = activeFilter.toLowerCase().replace(/s$/, '') // "Chapters" -> "chapter"
    return events
      .filter((e) => (e.category || '').toLowerCase().includes(needle))
      .slice(0, 6)
  }, [events, activeFilter])

  return (
    <section id="events" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
      >
        <div>
          <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3">Gather round</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight max-w-lg">
            Reunions, chapters and meets across the map
          </h2>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-full p-1 w-fit">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-100 h-96 animate-pulse">
              <div className="h-44 bg-slate-100" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-slate-100 rounded" />
                <div className="h-5 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-1/2 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-sm">
            {activeFilter === 'All' ? 'No upcoming events right now — check back soon.' : `No ${activeFilter.toLowerCase()} scheduled right now.`}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {filteredEvents.map((e) => (
            <motion.article
              key={e._id || e.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm shadow-black/[0.03]"
            >
              <div className="h-44 relative bg-slate-100">
                <svg viewBox="0 0 300 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="300" height="180" fill="#e2e8f0" />
                  <rect y="120" width="300" height="60" fill="#cbd5e1" />
                  <g fill="#94a3b8">
                    <rect x="30" y="70" width="36" height="50" />
                    <rect x="80" y="45" width="36" height="75" />
                    <rect x="130" y="25" width="36" height="95" />
                    <rect x="180" y="55" width="36" height="65" />
                    <rect x="230" y="80" width="36" height="40" />
                  </g>
                </svg>
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
                  {e.category || 'Event'}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-2">{e.date || 'Upcoming'}</p>
                <h3 className="font-display font-semibold text-lg text-slate-900">{e.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{e.venue || e.place || 'To be announced'}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1.5">
                    <ClockIcon /> {e.time || 'TBA'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UsersIcon /> {e.attendees ? `${e.attendees}+ RSVPs` : 'Live updates'}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-8 py-3.5 rounded-full text-sm"
        >
          Explore all events
        </motion.button>
      </div>
    </section>
  )
}