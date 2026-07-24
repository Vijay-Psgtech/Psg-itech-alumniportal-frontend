import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'

import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'
import { newsLetterAPI, API_BASE } from '../services/api'

function EyeIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
  description: item.description || item.excerpt || 'No summary available yet.',
  category: item.category || 'Newsletters',
  date: formatDate(item.date || item.createdAt || item.updatedAt),
  author: item.author || 'PSG iTech Alumni',
  imageUrl: getAssetUrl(item.imageUrl || item.coverImage || item.image),
  content: Array.isArray(item.content) && item.content.length > 0 ? item.content : [item.description || item.description || 'No content available yet.'],
  views: item.views || 0,
  postedBy: item.postedBy || item.author || 'PSG iTech Alumni',
  tags: Array.isArray(item.tags) ? item.tags : String(item.tags || '').split(',').filter(Boolean),
})

const shareChannels = [
  {
    label: 'Facebook',
    color: 'bg-[#1877F2]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.6v3.1h2.7v8h3.2Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    color: 'bg-[#25D366]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 16.3a7.3 7.3 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.3 7.3 0 1 1 12 19.3Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    color: 'bg-[#0A66C2]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 21h4V9H3v12ZM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.7c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8H9V9Z" />
      </svg>
    ),
  },
]

export default function FeedDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await newsLetterAPI.getAll()
        const payload = response?.data?.data ?? response?.data?.newsletters ?? response?.data ?? []
        const normalized = Array.isArray(payload) ? payload.map(normalizePost) : []

        if (isMounted) {
          setNewsData(normalized)
          setPost(normalized.find((item) => item.slug === slug) || null)
        }
      } catch (err) {
        console.error('Error fetching feed post:', err)
        if (isMounted) {
          setError('We could not load this story right now. Please try again shortly.')
          setPost(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPost()

    return () => {
      isMounted = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 text-center">
        <p className="font-display text-2xl font-semibold text-slate-900">Loading story...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 text-center">
        <p className="font-display text-2xl font-semibold text-slate-900">Post not found</p>
        <p className="text-slate-500 mt-2">This post may have been removed or the link is incorrect.</p>
        <Link
          to="/feed"
          className="inline-flex mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-6 py-3 rounded-full"
        >
          Back to NewsCorner
        </Link>
      </div>
    )
  }

  const morePosts = newsData.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Link
            to="/feed"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
          >
            <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
              <path d="M1 6h14M1 6l5-5M1 6l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go Back
          </Link>

          <p className="text-xs font-medium tracking-[0.18em] uppercase text-orange-500 mt-6 mb-2">
            {post.category}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.08 }}
          className="mt-8 rounded-2xl overflow-hidden bg-slate-100"
        >
          <img src={post.imageUrl || bannerImage} alt={post.title} className="w-full max-h-[560px] object-cover" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.12 }}
          className="flex items-center gap-3 mt-6 pb-6 border-b border-slate-200"
        >
          <div className="w-10 h-10 rounded-full bg-orange-50 grid place-items-center font-display font-semibold text-orange-500 text-sm shrink-0">
            {post.author
              .split(' ')
              .map((word) => word[0])
              .slice(0, 2)
              .join('')}
          </div>
          <p className="font-medium text-slate-900 text-sm">{post.author}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 py-8"
        >
          {post.description.split("\n")
            .filter(Boolean).map((paragraph, index) => (
              <motion.p key={index} variants={fadeUp} className="text-slate-600 leading-relaxed">
                {paragraph}
              </motion.p>
            ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          viewport={viewport}
          className="relative rounded-2xl overflow-hidden bg-slate-900 py-10 px-6 text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />
          <p className="font-display text-white font-semibold text-lg">
            To view all the Posts of PSG iTech Alumni Portal Community
          </p>
          <Link
            to="/"
            className="inline-flex mt-5 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-7 py-3 rounded-full"
          >
            Login now
          </Link>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200 text-sm text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <CalendarIcon />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <EyeIcon />
              {post.views}
            </span>
          </div>
          <p>
            Posted by <span className="text-slate-600 font-medium">{post.postedBy}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Tagged</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-1 pr-3 py-1">
              <span className="w-5 h-5 rounded-full bg-orange-100 grid place-items-center text-[10px] font-semibold text-orange-600">
                {post.author[0]}
              </span>
              <span className="text-slate-600">{post.author}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {shareChannels.map((share) => (
              <span
                key={share.label}
                className={`w-8 h-8 rounded-full grid place-items-center ${share.color} cursor-pointer`}
                title={`Share on ${share.label}`}
              >
                {share.icon}
              </span>
            ))}
          </div>
        </div>

        {morePosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200">
            <h2 className="font-display text-lg font-semibold text-slate-900 mb-5">More from NewsCorner</h2>
            <div className="flex flex-col gap-4">
              {morePosts.map((item) => (
                <Link
                  key={item.slug}
                  to={`/feed/${item.slug}`}
                  className="group flex items-center gap-4 bg-white border border-slate-100 rounded-xl p-3 hover:border-orange-300 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img src={item.imageUrl || bannerImage} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-orange-500 font-medium">{item.category}</p>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-orange-600 transition-colors leading-snug truncate">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}