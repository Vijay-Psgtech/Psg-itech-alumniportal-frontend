import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { eventsAPI } from '../services/api'

// import { events } from '../content/data/events'

function CalendarIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function ShareIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="18" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="19" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.1 10.8 15.9 6.2M8.1 13.2l7.8 4.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

const categoryIcon = {
  chapter: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  meet: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14.5 15.2c2.6.3 4.5 2 4.5 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  congress: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 21V10l8-6 8 6v11M4 21h16M9 21v-5h6v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

export default function EventDetailPage() {
  const { id } = useParams()
  // const event = events.find((e) => e.slug === slug)
  const [event, setEvent] = useState(null)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventsAPI.getById(id)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, [id]);

  if (!event) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 text-center">
        <p className="font-display text-2xl font-semibold text-slate-900">Event not found</p>
        <p className="text-slate-500 mt-2">This event may have been removed or the link is incorrect.</p>
        <Link
          to="/events"
          className="inline-flex mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-6 py-3 rounded-full"
        >
          Back to Events
        </Link>
      </div>
    )
  }

  const otherEvents = events.filter((e) => e.slug !== event.slug).slice(0, 3)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 pt-28 pb-16">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-orange-400 mb-5"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/50 normal-case tracking-normal">{event.title}</span>
          </motion.p>

          <div className="flex items-start gap-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.05 }}
              className="hidden sm:grid w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 place-items-center text-orange-400"
            >
              {categoryIcon[event.category]}
            </motion.div>
            <div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.08 }}
                className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight"
              >
                {event.title}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.14 }}
                className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60"
              >
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="text-orange-400" />
                  {event.date}, {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <PinIcon className="text-orange-400" />
                  {event.venue}, {event.city}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">
                  {event.status}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:col-span-8 flex flex-col gap-5"
          >
            <p className="text-slate-900 font-medium text-lg leading-relaxed">{event.summary}</p>
            {(event.longDescription || event.description || "")
              .split("\n\n")
              .map((para, i) => (
                <p key={i} className="text-slate-500 leading-relaxed">
                  {para}
                </p>
              ))}

            <div className="mt-4">
              <button className="inline-flex items-center gap-2 border border-slate-200 hover:border-orange-400 text-slate-600 hover:text-orange-600 transition-colors text-sm font-medium px-5 py-2.5 rounded-full">
                <ShareIcon />
                Share this event
              </button>
            </div>
          </motion.div>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ delay: 0.08 }}
            className="lg:col-span-4"
          >
            <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-500 mb-4">
                Event details
              </p>
              <dl className="flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-slate-400">Date &amp; time</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{event.date}, {event.time}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Venue</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{event.venue}, {event.city}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Mode</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{event.mode}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Status</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{event.status}</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>

        {/* More events */}
        {otherEvents.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="font-display text-xl font-semibold text-slate-900 mb-6">More events</h2>
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="grid sm:grid-cols-3 gap-5"
            >
              {otherEvents.map((e) => (
                <motion.div key={e.slug} variants={fadeUp}>
                  <Link
                    to={`/events/${e.slug}`}
                    className="group block bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-orange-300 hover:shadow-md hover:shadow-black/[0.04] transition-all"
                  >
                    <div className="h-28 bg-gradient-to-br from-slate-900 to-slate-700 grid place-items-center text-orange-400/80">
                      {categoryIcon[e.category]}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {e.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2">{e.date}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  )
}