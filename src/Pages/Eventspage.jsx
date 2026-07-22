import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { eventsAPI } from "../services/api";
import { formatDate } from '../utils/dateFormat'

const categoryIcon = {
  chapter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  meet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14.5 15.2c2.6.3 4.5 2 4.5 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  congress: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 21V10l8-6 8 6v11M4 21h16M9 21v-5h6v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Awards: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v6M12 2l3 3M12 2l-3 3M4.5 9.5h15M4.5 9.5l1.5 11h12l1.5-11M4.5 9.5h15l-1.5-7h-12l-1.5 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

function CalendarIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...props}>
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

function SearchIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const eventStatuses = ['Upcoming events', 'Past events']
const eventModes = ['Offline', 'Online']

const normalizeEventsPayload = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.events)) return payload.events
  if (Array.isArray(payload?.results)) return payload.results

  const nestedData = payload?.data
  if (Array.isArray(nestedData)) return nestedData
  if (nestedData && typeof nestedData === 'object') {
    if (Array.isArray(nestedData.events)) return nestedData.events
    if (Array.isArray(nestedData.data)) return nestedData.data
  }

  return []
}

export default function EventsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState([])
  const [modeFilter, setModeFilter] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortDesc, setSortDesc] = useState(true)
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)

  const toggle = (list, setList, value) => {
    setList((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

   // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const response = await eventsAPI.getAll()
        const normalized = normalizeEventsPayload(response?.data)
        setEventsData(normalized)
      }
      catch (error) {
        console.error('Error fetching events:', error)
        setEventsData([])
      }
      finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filtered = useMemo(() => {
    let list = eventsData.filter((e) => {
      const title = e?.title || ''
      const status = e?.status || ''
      const mode = e?.mode || ''
      const normalizedStatus = status.toLowerCase()
      const normalizedMode = mode.toLowerCase()
      const matchesQuery = title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus =
        statusFilter.length === 0 ||
        (statusFilter.includes('Past events') && normalizedStatus.includes('past')) ||
        (statusFilter.includes('Upcoming events') && normalizedStatus.includes('upcoming'))
      const matchesMode = modeFilter.length === 0 || modeFilter.some((filter) => filter.toLowerCase() === normalizedMode)
      return matchesQuery && matchesStatus && matchesMode
    })
    const getEventSortKey = (event) => Number(event?.id ?? event?._id ?? 0) || 0
    list = [...list].sort((a, b) => {
      const diff = getEventSortKey(a) - getEventSortKey(b)
      return sortDesc ? -diff : diff
    })
    return list
  }, [eventsData, query, statusFilter, modeFilter, sortDesc])

 console.log('Filtered events:', filtered);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page header */}
      <section className="bg-slate-900 pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-orange-400 mb-4"
          >
            Home <span className="text-white/30">/</span> Events
          </motion.p>
          <motion.h1  
            variants={fadeUp} 
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight"
          >
            Where the iTech family gathers
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-4 max-w-xl leading-relaxed"
          >
            Chapter launches, campus meets, and the congress that started it
            all &mdash; browse everything the association has hosted.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-14 grid lg:grid-cols-12 gap-8">
        {/* Filters sidebar */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
                className="w-full bg-white border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-600 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400"
              />
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Event status</p>
              <div className="flex flex-col gap-3">
                {eventStatuses.map((s) => (
                  <label key={s} className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(s)}
                      onChange={() => toggle(statusFilter, setStatusFilter, s)}
                      className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Event mode</p>
              <div className="flex flex-col gap-3">
                {eventModes.map((m) => (
                  <label key={m} className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modeFilter.includes(m)}
                      onChange={() => toggle(modeFilter, setModeFilter, m)}
                      className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Date</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Event list */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-slate-900">Events</h2>
            <button
              onClick={() => setSortDesc((s) => !s)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2 hover:border-orange-400 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Sort {sortDesc ? '\u00b7 Newest' : '\u00b7 Oldest'}
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-400 text-sm">
              Loading events...
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-400 text-sm">
              {eventsData.length === 0 ? 'No events available right now.' : 'No events match your filters.'}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              {filtered.map((event) => (
                <motion.div key={event._id} variants={fadeUp}>
                  <Link
                    // to={`/events/${event.slug || event.title.replace(/\s+/g, '-').toLowerCase()}`}
                    to={`/events/${event._id}`}
                    className="group flex flex-col sm:flex-row gap-5 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 hover:border-orange-300 hover:shadow-md hover:shadow-black/[0.04] transition-all"
                  >
                    <div className="w-full sm:w-56 h-40 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 grid place-items-center text-orange-400/80 relative">
                      {categoryIcon[event.category]}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {event.title}
                          </h3>
                          <span
                            onClick={(e) => e.preventDefault()}
                            className="shrink-0 w-8 h-8 grid place-items-center rounded-full text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                          >
                            <ShareIcon />
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon className="text-orange-500" />
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <PinIcon className="text-orange-500" />
                            {event.venue}, {event.city}
                          </span>
                        </div>
                      </div>
                      <span className="mt-4 sm:mt-0 text-xs font-medium text-slate-400">{event.status}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filtered.length > 0 && (
            <p className="text-center text-slate-400 text-sm mt-10">No more events to display!</p>
          )}
        </div>
      </div>
    </div>
  )
}
