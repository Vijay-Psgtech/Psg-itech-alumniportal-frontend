import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

const events = [
  { tag: 'Chapter', date: 'Sep 30, 2026', title: 'Chennai chapter reunion', place: 'Taj Club House, Chennai', time: '6:00 PM', rsvp: '180+ RSVPs' },
  { tag: 'Chapter', date: 'Sep 21, 2026', title: 'Bangalore chapter inauguration', place: 'Vivanta, Bengaluru', time: '5:30 PM', rsvp: '240+ RSVPs' },
  { tag: 'Reunion', date: 'Jan 20, 2027', title: 'Fifth alumni meet', place: 'PSG iTech campus, Coimbatore', time: '9:00 AM', rsvp: '400+ RSVPs' },
  { tag: 'Induction', date: 'Aug 12, 2026', title: 'Alumni induction: 2022-26 batch', place: 'PSG iTech auditorium', time: '3:00 PM', rsvp: '320+ RSVPs' },
  { tag: 'Webinar', date: 'Jul 18, 2026', title: 'Careers in cloud & DevOps', place: 'Online · Google Meet', time: '7:00 PM', rsvp: '150+ RSVPs' },
  { tag: 'Reunion', date: 'Dec 27, 2026', title: 'Global alumni homecoming', place: 'PSG iTech campus, Coimbatore', time: '10:00 AM', rsvp: '500+ RSVPs' },
]

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
          {filters.map((f, i) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f}
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
        {events.map((e) => (
          <motion.article
            key={e.title}
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
                {e.tag}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-2">{e.date}</p>
              <h3 className="font-display font-semibold text-lg text-slate-900">{e.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{e.place}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <ClockIcon /> {e.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon /> {e.rsvp}
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
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-8 py-3.5 rounded-full text-sm"
        >
          Explore all events
        </motion.button>
      </div>
    </section>
  )
}