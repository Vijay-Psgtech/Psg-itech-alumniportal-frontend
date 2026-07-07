import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

import { feedPosts } from '../content/data/feed'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

function SearchIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function MoreIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  )
}

const categories = ['Alumni Spotlight', 'Chapter News']

export default function FeedPage() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortDesc, setSortDesc] = useState(true)

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const filtered = useMemo(() => {
    let list = feedPosts.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(p.category)
      return matchesQuery && matchesCategory
    })
    list = [...list].sort((a, b) => (sortDesc ? b.id - a.id : a.id - b.id))
    return list
  }, [query, activeCategories, sortDesc])

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
            Home <span className="text-white/30">/</span> NewsCorner
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight"
          >
            Stories from the iTech family
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-4 max-w-xl leading-relaxed"
          >
            Alumni spotlights, testimonials, and chapter updates &mdash;
            everything the association is sharing this season.
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
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

            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Categories</p>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Feed list */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-slate-900">NewsCorner</h2>
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

          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-400 text-sm">
              No posts match your filters.
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              {filtered.map((post) => (
                <motion.div key={post.id} variants={fadeUp}>
                  <Link
                    to={`/feed/${post.slug}`}
                    className="group flex flex-col sm:flex-row gap-5 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 hover:border-orange-300 hover:shadow-md hover:shadow-black/[0.04] transition-all"
                  >
                    <div className="w-full sm:w-44 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={bannerImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon />
                            {post.date}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-orange-500 font-medium">{post.category}</span>
                        </div>
                        <span
                          onClick={(e) => e.preventDefault()}
                          className="shrink-0 w-8 h-8 grid place-items-center rounded-full text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <MoreIcon />
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-slate-900 mt-2 group-hover:text-orange-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}