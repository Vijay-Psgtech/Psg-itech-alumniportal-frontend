import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../motion'
import { API_BASE, alumniAPI, bannerAPI } from '../services/api'
import defaultBannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

const defaultHero = {
  title: 'Every Alumnus, one legacy',
  subtitle: 'PSG Institute of Technology & Applied Research',
  description:
    'Reconnect with your PSG iTech family. Find batchmates, discover mentors, and unlock a global network built by every graduating class since 2013.',
  backgroundImage: defaultBannerImage,
  features: [
    { text: '12K+ Alumni' },
    { text: '35+ Countries' },
    { text: '200+ Events' },
  ],
  primaryButtonText: 'Find alumni',
  secondaryButtonText: 'Watch story',
}

const formatCount = (value) => {
  const num = Number(value || 0)
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num)
}

// Resolves a backend-provided image path (absolute URL, root-relative "/uploads/x.jpg",
// or bare-relative "uploads/x.jpg") into a URL the browser can actually load.
const resolveAssetUrl = (value) => {
  if (!value || typeof value !== 'string') return defaultBannerImage
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith('data:')) return value
  const path = value.startsWith('/') ? value : `/${value}`
  return `${API_BASE}${path}`
}

export default function Hero() {
  const [banner, setBanner] = useState(defaultHero)
  const [stats, setStats] = useState({ totalAlumni: 8500, countryStats: 45, departmentStats: 300 })

  useEffect(() => {
    let isMounted = true

    // allSettled instead of all: a failing/missing banner (e.g. no active banner set yet)
    // must not also wipe out a perfectly good stats response, and vice versa.
    Promise.allSettled([bannerAPI.getActive(), alumniAPI.getStats()]).then((results) => {
      if (!isMounted) return
      const [bannerResult, statsResult] = results

      if (bannerResult.status === 'fulfilled') {
        const bannerResponse = bannerResult.value
        const bannerPayload = bannerResponse?.data?.data || bannerResponse?.data || bannerResponse
        const bannerData = bannerPayload?.success ? bannerPayload.data : bannerPayload
        if (bannerData) {
          setBanner({
            ...defaultHero,
            ...bannerData,
            backgroundImage: resolveAssetUrl(bannerData.backgroundImage),
            features: bannerData.features?.length ? bannerData.features : defaultHero.features,
            title: bannerData.title || defaultHero.title,
            subtitle: bannerData.subtitle || defaultHero.subtitle,
            description: bannerData.description || defaultHero.description,
            primaryButtonText: bannerData.primaryButtonText || defaultHero.primaryButtonText,
            secondaryButtonText: bannerData.secondaryButtonText || defaultHero.secondaryButtonText,
          })
        }
      } else {
        console.warn('Hero: failed to load active banner', bannerResult.reason)
      }

      if (statsResult.status === 'fulfilled') {
        const statsResponse = statsResult.value
        const statsPayload = statsResponse?.data?.data || statsResponse?.data || statsResponse
        const statsData = statsPayload?.success ? statsPayload.data : statsPayload
        if (statsData) {
          setStats((prev) => ({
            totalAlumni: statsData.totalAlumni ?? prev.totalAlumni,
            countryStats: statsData.countryStats ?? prev.countryStats,
            departmentStats: statsData.departmentStats ?? prev.departmentStats,
          }))
        }
      } else {
        console.warn('Hero: failed to load alumni stats', statsResult.reason)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const featureStats = [
    { label: 'Alumni', value: `${formatCount(stats.totalAlumni)}+` },
    { label: 'Countries', value: `${formatCount(stats.countryStats)}+` },
    { label: 'Departments', value: `${formatCount(stats.departmentStats)}+` },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={resolveAssetUrl(banner.backgroundImage)}
          alt={banner.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            if (e.currentTarget.src !== defaultBannerImage) {
              e.currentTarget.src = defaultBannerImage
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div className="lg:col-span-7" initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-orange-300 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              {banner.subtitle}
            </span>
            <h1 className="font-display text-white text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.6rem] font-semibold tracking-tight">
              {banner.title}
            </h1>
            <p className="mt-6 text-slate-200 text-base max-w-md leading-relaxed">{banner.description}</p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <motion.a
                href="#directory"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-7 py-3.5 rounded-full"
              >
                {banner.primaryButtonText}
              </motion.a>
              <a href="#events" className="flex items-center justify-center gap-2 text-sm font-medium text-white">
                <span className="w-9 h-9 rounded-full border border-white/30 grid place-items-center">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M1 1L11 7L1 13V1Z" fill="#ffffff" />
                  </svg>
                </span>
                {banner.secondaryButtonText}
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-full sm:max-w-md">
              {featureStats.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="text-xs text-slate-300 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative hidden lg:block min-h-[320px] sm:h-[420px]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute right-0 bottom-0 w-72 bg-white rounded-2xl p-4 shadow-lg shadow-black/20 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center font-display font-semibold text-orange-500 shrink-0">
                {banner.features[0]?.text?.slice(0, 2).toUpperCase() || 'AR'}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-slate-900">Live community</p>
                <p className="text-xs text-slate-400">{banner.features[0]?.text || 'Connected alumni network'}</p>
              </div>
            </motion.div>   

            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Live
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}