import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { newsLetterAPI, API_BASE } from '../services/api'

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

const createSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'post'

const formatDate = (value) => {
  if (!value) return 'Recently published'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getAssetUrl = (value) => {
  if (!value) return null
  if (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:')) {
    return value
  }
  return `${API_BASE}/${value}`
}

const normalizePost = (item, index) => ({
  id: item._id || item.id || `${item.title || 'post'}-${index}`,
  slug: item.slug || createSlug(item.title || `post-${index}`),
  title: item.title || 'Untitled post',
  excerpt: item.description || item.excerpt || 'No summary available yet.',
  category: item.category || 'Newsletters',
  date: formatDate(item.date || item.createdAt || item.updatedAt),
  sortDate: item.date || item.createdAt || item.updatedAt || '',
  author: item.author || 'PSG iTech Alumni',
  imageUrl: getAssetUrl(item.imageUrl || item.coverImage || item.image),
  content: Array.isArray(item.content) && item.content.length > 0 ? item.content : [item.description || item.excerpt || 'No content available yet.'],
  views: item.views || 0,
  postedBy: item.postedBy || item.author || 'PSG iTech Alumni',
  tags: Array.isArray(item.tags) ? item.tags : String(item.tags || '').split(',').filter(Boolean),
})

export default function FeedPage() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortDesc, setSortDesc] = useState(true)
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchNews = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await newsLetterAPI.getAll()
        const payload = response?.data?.data ?? response?.data?.newsletters ?? response?.data ?? []
        const normalized = Array.isArray(payload) ? payload.map(normalizePost) : []

        if (isMounted) {
          setNewsData(normalized)
        }
      } catch (err) {
        console.error('Error fetching news data:', err)
        if (isMounted) {
          setError('We could not load the latest updates right now. Please try again shortly.')
          setNewsData([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      isMounted = false
    }
  }, [])

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const categoryOptions = useMemo(() => Array.from(new Set(newsData.map((post) => post.category).filter(Boolean))).sort(), [newsData])

  const filtered = useMemo(() => {
    let list = newsData.filter((p) => {
      const queryText = `${p.title} ${p.excerpt}`.toLowerCase()
      const matchesQuery = queryText.includes(query.toLowerCase())
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(p.category)

      const postDate = new Date(p.sortDate)
      const fromDate = dateFrom ? new Date(dateFrom) : null
      const toDate = dateTo ? new Date(dateTo) : null

      const matchesDate =
        (!fromDate || postDate >= fromDate) &&
        (!toDate || postDate <= toDate)

      return matchesQuery && matchesCategory && matchesDate
    })

    list = [...list].sort((a, b) => {
      const aTime = new Date(a.sortDate).getTime()
      const bTime = new Date(b.sortDate).getTime()
      if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
        return 0
      }
      return sortDesc ? bTime - aTime : aTime - bTime
    })

    return list
  }, [newsData, query, activeCategories, dateFrom, dateTo, sortDesc])

  return (
    <div className="bg-slate-50 min-h-screen">
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
                {categoryOptions.map((cat) => (
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
              Sort {sortDesc ? '� Newest' : '� Oldest'}
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-500 text-sm">
              Loading the latest stories...
            </div>
          ) : error ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-500 text-sm">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-400 text-sm">
              No posts match your filters.
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="show"
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
                        src={post.imageUrl}
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