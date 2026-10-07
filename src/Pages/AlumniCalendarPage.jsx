import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, RotateCw } from "lucide-react";
import { eventsAPI } from "../services/api";
import { formatDate } from "../utils/dateFormat";
import { fadeUp } from "../utils/motion";
import usePageTitle from '../hooks/usePageTitle'


function getEvents(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.events)) return payload.events;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data?.events)) return payload.data.events;
  return [];
}

export default function AlumniCalendarPage() {
  usePageTitle('Alumni Calendar');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await eventsAPI.getAll();
        if (active) setEvents(getEvents(response?.data));
      } catch (loadError) {
        console.error("Unable to load the alumni calendar:", loadError);
        if (active) setError("The calendar could not be loaded. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadEvents();
    return () => {
      active = false;
    };
  }, []);

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => {
        const dateA = new Date(a?.date || 0).getTime();
        const dateB = new Date(b?.date || 0).getTime();
        return dateA - dateB;
      }),
    [events],
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 px-6 pb-16 pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-400"
          >
            <CalendarDays size={14} /> Events
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Alumni Calendar
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-2xl leading-relaxed text-white/65"
          >
            Keep up with upcoming events and moments across the PSG iTech alumni community.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 lg:py-18">
        {loading && (
          <p role="status" className="py-12 text-center text-slate-500">
            Loading calendar events…
          </p>
        )}

        {error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800"
            >
              <RotateCw size={15} /> Reload page
            </button>
          </div>
        )}

        {!loading && !error && sortedEvents.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <CalendarDays size={30} className="mx-auto text-blue-500" />
            <h2 className="mt-4 font-display text-xl font-semibold text-slate-900">
              No events to show yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Check back later or browse the events page for updates.
            </p>
            <Link
              to="/events"
              className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse all events
            </Link>
          </div>
        )}

        {!loading && !error && sortedEvents.length > 0 && (
          <div className="space-y-4">
            {sortedEvents.map((event, index) => (
              <motion.article
                key={event.id ?? event._id ?? `${event.title}-${event.date}-${index}`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: Math.min(index * 0.04, 0.3) }}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-blue-700">
                    <CalendarDays size={16} />
                    {event.date ? formatDate(event.date) : "Date to be announced"}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-slate-900">
                    {event.title || "Alumni event"}
                  </h2>
                  {event.location && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={15} /> {event.location}
                    </p>
                  )}
                </div>
                {event.id || event._id ? (
                  <Link
                    to={`/events/${event.id ?? event._id}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                  >
                    Event details
                  </Link>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
