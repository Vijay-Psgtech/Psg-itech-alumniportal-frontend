import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { eventsAPI, API_BASE } from "../services/api";
import { formatDate } from '../utils/dateFormat'

const CATEGORY_LABELS = {
  chapter: 'Chapters',
  meet: 'Reunions',
  congress: 'Congress',
}

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
  const [selectedCategory, setSelectedCategory] = useState('All')
  const navigate = useNavigate()

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(events.map((event) => event.category).filter(Boolean))
    )
    return ['All', ...unique]
  }, [events])

  const filteredEvents = useMemo(
    () =>
      selectedCategory === 'All'
        ? events
        : events.filter((event) => event.category === selectedCategory),
    [events, selectedCategory]
  )

  const getCategoryLabel = (category) =>
    CATEGORY_LABELS[category] ||
    (category ? category.charAt(0).toUpperCase() + category.slice(1) : category)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsAPI.getRecentEvents();
        setEvents(response.data?.data || [])
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
  }, [])

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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {category === 'All' ? 'All' : getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {filteredEvents.map((e) => (
          <motion.article
            key={e.title}
            initial ={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm shadow-black/[0.03]"
          >
            <div className="h-44 relative bg-slate-100">
              <img
                src={`${API_BASE}/${e.imageUrl}`}
                alt={e.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-2">{formatDate(e.date)}</p>
              <h3 className="font-display font-semibold text-lg text-slate-900">{e.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{e.place}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <ClockIcon /> {e.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon /> {e.attendees} RSVPs
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-8 py-3.5 rounded-full text-sm cursor-pointer"
          onClick={() => navigate('/events')}
        >
          Explore all events
        </motion.button>
      </div>
    </section>
  )
}