import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { eventsAPI, API_BASE } from '../services/api'
import { formatDate } from '../utils/dateFormat'

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
  const [event, setEvent] = useState(null)
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    eventsAPI.getById(id)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, [id]);

  useEffect(() => {
    eventsAPI.getAll()
      .then((response) => {
        setEventsData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      } );
  } , []);

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

  const otherEvents = eventsData.filter((e) => e._id !== event._id).slice(0, 3)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/12 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-orange-400 mb-5"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70 normal-case tracking-normal">{event.title}</span>
          </motion.p>

          <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.05 }}
              className="hidden sm:grid w-20 h-20 shrink-0 rounded-[28px] bg-white/6 border border-white/10 place-items-center text-orange-400"
            >
              {categoryIcon[event.category]}
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.08 }}
                className="font-display text-3xl sm:text-5xl font-semibold text-white leading-tight"
              >
                {event.title}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.14 }}
                className="grid gap-3 sm:grid-cols-3 text-sm text-white/70"
              >
                <div className="flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-3">
                  <CalendarIcon className="text-orange-300" />
                  <span>{formatDate(event.date)}, {event.time}</span>
                </div>
                <div className="flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-3">
                  <PinIcon className="text-orange-300" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                <div className="inline-flex items-center justify-center rounded-3xl bg-orange-500/15 px-4 py-3 text-orange-100 font-medium text-sm">
                  {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      {event.imageUrl && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.18 }}
          className="max-w-6xl mx-auto px-6 lg:px-10 mt-10"
        >
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={`${API_BASE}/${event.imageUrl}`}
              alt={event.title}
              className="w-full h-full object-cover aspect-[16/9]"
            />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_0.95fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            viewport={viewport}
            className="space-y-8"
          >
            <div className="rounded-[32px] bg-white p-8 shadow-sm">
              <p className="text-slate-900 font-semibold text-lg sm:text-xl leading-relaxed">
                {event.summary}
              </p>
              <div className="mt-6 space-y-5 text-slate-600 text-base leading-8">
                {(event.longDescription || event.description || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
              <div className="mt-8">
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-600">
                  <ShareIcon />
                  Share this event
                </button>
              </div>
            </div>
          </motion.div>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="show"
            viewport={viewport}
            transition={{ delay: 0.08 }}
            className=""
          >
            <div className="rounded-[32px] bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-500 mb-5">
                Event details
              </p>
              <dl className="space-y-4 text-sm text-slate-600">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Date & time</dt>
                  <dd className="mt-2 text-slate-900 font-medium">{formatDate(event.date)}, {event.time}</dd>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Venue</dt>
                  <dd className="mt-2 text-slate-900 font-medium">{event.venue}, {event.city}</dd>
                </div>
                
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</dt>
                  <dd className="mt-2 text-slate-900 font-medium">{event.status === "upcoming" ? "Upcoming Event" : "Past Event"}</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>

        {/* More events */}
        {otherEvents.length > 0 && (
          <div className="mt-16 pt-14 border-t border-slate-200">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">More events</h2>
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
              viewport={viewport}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {otherEvents.map((e) => (
                <motion.div key={e._id} variants={fadeUp}>
                  <Link
                    to={`/events/${e._id}`}
                    className="group block overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="overflow-hidden bg-slate-100">
                      <img
                        src={`${API_BASE}/${e.imageUrl}`}
                        alt={e.title}
                        className="w-full h-52 object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-base text-slate-900 transition-colors group-hover:text-orange-600">
                        {e.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-500">{formatDate(e.date)}</p>
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