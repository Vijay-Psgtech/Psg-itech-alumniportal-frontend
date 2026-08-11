import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

// import { galleries, galleryCategories } from '../content/data/Galleries'
import bannerImage from '../assets/campus.jpg'
import { albumsAPI, API_BASE } from "../services/api";

function SearchIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function LikeIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 10v10H4V10h3Zm3.5 0 3.8-7.5a1.6 1.6 0 0 1 2.9.9L16.5 9H20a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.6 21H10.5a2 2 0 0 1-2-2V11.5a2 2 0 0 1 2-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="18" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="19" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.1 10.8 15.9 6.2M8.1 13.2l7.8 4.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon({ direction = 'right', ...props }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={direction === 'left' ? 'rotate-180' : ''}
      {...props}
    >
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sortOptions = [
  { key: 'newest', label: 'Newest' },
  { key: 'views', label: 'Most viewed' },
  { key: 'likes', label: 'Most liked' },
]

export default function GalleryPage() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [sortKey, setSortKey] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [activeGallery, setActiveGallery] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  /* Fetch galleries */
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await albumsAPI.getAll();
        const data = Array.isArray(res.data)
          ? res.data
          : (res.data?.data ?? res.data?.albums ?? []);
        setGalleries(data)
      } catch (error) {
        console.error('Error fetching galleries:', error)
      }
    }

    fetchGalleries()
  }, [])

  console.log('Galleries data', galleries);

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const filtered = useMemo(
    () =>
      galleries.filter((a) => {
        const q = search.toLowerCase();
        const matchQ =
          !q ||
          a.title?.toLowerCase().includes(q) ||
          a.event?.toLowerCase().includes(q);
        const matchY = !filterYear || String(a.year) === filterYear;
        const matchC =
          activeCategories.length === 0 || activeCategories.includes(a.title);
        return matchQ && matchY && matchC;
      }),
    [galleries, search, filterYear, activeCategories],
  );

  const filteredCategories = useMemo(() => {
    const categories = new Set(galleries.map((g) => g.title)) // Assuming 'title' is used as category; adjust if needed
    return Array.from(categories).sort()
  }, [galleries])

  const openLightbox = (gallery) => {
    setActiveGallery(gallery)
    setActiveIndex(0)
  }
  const closeLightbox = () => setActiveGallery(null)
  const showNext = () => setActiveIndex((i) => (i + 1) % activeGallery.length)
  const showPrev = () => setActiveIndex((i) => (i - 1 + activeGallery.length) % activeGallery.length)

  // Keyboard navigation + body scroll lock while lightbox is open
  useEffect(() => {
    if (!activeGallery) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGallery, activeIndex])

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
            Home <span className="text-white/30">/</span> Gallery
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight"
          >
            Moments from the iTech family
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-4 max-w-xl leading-relaxed"
          >
            Photos from chapter launches, campus meets, and everything in
            between &mdash; browse the full collection below.
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gallery"
                className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Categories</p>
              <div className="flex flex-col gap-3">
                {filteredCategories.map((cat) => (
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

        {/* Gallery grid */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6 relative">
            <h2 className="font-display text-xl font-semibold text-slate-900">Gallery</h2>
            <div className="relative">
              <button
                onClick={() => setSortOpen((s) => !s)}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2 hover:border-orange-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Sort &middot; {sortOptions.find((o) => o.key === sortKey)?.label}
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-lg shadow-black/5 py-1.5 z-10">
                  {sortOptions.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => {
                        setSortKey(o.key)
                        setSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortKey === o.key ? 'text-orange-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center text-slate-400 text-sm">
              No gallery to display under this category!
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
              viewport={viewport}
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  onClick={() => openLightbox(g.images)}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group block text-left bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-black/[0.06] transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={`${API_BASE}/${g.coverImage}`}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <span
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShareIcon />
                    </span>
                    <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                      {g.images.length} Items
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                      {g.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-5 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <EyeIcon />
                        {g.views}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <LikeIcon />
                        {g.likes}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-sm flex flex-col"
            onClick={closeLightbox}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 lg:px-10 py-5 text-white shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="font-display text-lg font-semibold">{}</h3>
                <p className="text-white/50 text-sm mt-0.5">
                  {activeIndex + 1} / {activeGallery.length}
                </p>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Wide image stage */}
            <div
              className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-6 relative min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={showPrev}
                className="hidden sm:grid absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ArrowIcon direction="left" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  src={`${API_BASE}/${activeGallery[activeIndex]}`}
                  alt={`${activeGallery.title} \u2013 photo ${activeIndex + 1}`}
                  className="max-w-full max-h-full w-auto h-auto rounded-lg object-contain shadow-2xl shadow-black/40"
                />
              </AnimatePresence>

              <button
                onClick={showNext}
                className="hidden sm:grid absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Mobile prev/next bar */}
            <div
              className="sm:hidden flex items-center justify-between px-6 py-4 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={showPrev}
                className="flex items-center gap-2 text-white/80 text-sm font-medium"
              >
                <ArrowIcon direction="left" /> Prev
              </button>
              <button
                onClick={showNext}
                className="flex items-center gap-2 text-white/80 text-sm font-medium"
              >
                Next <ArrowIcon direction="right" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}