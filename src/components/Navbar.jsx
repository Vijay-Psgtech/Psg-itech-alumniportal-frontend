import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/1723.png'

const links = [
  { label: 'Flash Mentorship', href: '#mentorship' },
  { label: 'About', to: '/about' },
  {
    label: 'Events',
    to: '/events',
    children: [
      { label: 'All Events', to: '/events' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'NewsCorner', to: '/feed' },
    ],
  },
  { label: 'Find Alumni', href: '#directory' },
  { label: 'Batchmates', href: '#batchmates' },
  { label: 'Careers', href: '#careers' },
  { label: 'Engagement', href: '#engagement' },
  { label: 'Institute', href: 'https://psgitech.ac.in/' },
]

function ChevronIcon({ className }) {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" className={className}>
      <path d="M1 1.2 5 5l4-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const closeTimer = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMobileDropdown(null)
  }, [location.pathname])

  const solid = scrolled || open

  const openDropdown = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDesktopDropdown(label)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDesktopDropdown(null), 150)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-white/90 backdrop-blur shadow-sm shadow-black/[0.03]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-colors duration-300 ${
              solid ? 'bg-white shadow-sm shadow-black/5 ring-1 ring-slate-100' : 'bg-white/90 backdrop-blur'
            }`}
          >
            <img src={logo} alt="PSG logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="leading-tight">
            <p
              className={`font-display font-semibold text-[15px] tracking-tight transition-colors duration-300 ${
                solid ? 'text-slate-900' : 'text-white'
              }`}
            >
              iTech Alumni
            </p>
            <p
              className={`text-[10px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
                solid ? 'text-slate-400' : 'text-white/60'
              }`}
            >
              Since 2013
            </p>
          </div>
        </Link>

        <nav
          className={`hidden lg:flex items-center gap-7 text-[14px] font-medium transition-colors duration-300 ${
            solid ? 'text-slate-500' : 'text-white/80'
          }`}
        >
          {links.map((l) => {
            if (l.children) {
              const isOpen = desktopDropdown === l.label
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(l.label)}
                  onMouseLeave={scheduleClose}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 transition-colors ${
                        solid
                          ? isActive
                            ? 'text-slate-900'
                            : 'hover:text-slate-900'
                          : isActive
                          ? 'text-white'
                          : 'hover:text-white'
                      }`
                    }
                  >
                    {l.label}
                    <ChevronIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </NavLink>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-3"
                      >
                        <div className="bg-white rounded-xl shadow-lg shadow-black/10 border border-slate-100 py-1.5 w-44 overflow-hidden">
                          {l.children.map((child) => (
                            <NavLink
                              key={child.label}
                              to={child.to}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm transition-colors ${
                                  isActive
                                    ? 'text-orange-600 font-medium bg-orange-50'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return l.to ? (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors ${
                    solid
                      ? isActive
                        ? 'text-slate-900'
                        : 'hover:text-slate-900'
                      : isActive
                      ? 'text-white'
                      : 'hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ) : (
              <a
                key={l.label}
                href={l.href}
                target={l.href?.startsWith('http') ? '_blank' : undefined}
                rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`transition-colors ${solid ? 'hover:text-slate-900' : 'hover:text-white'}`}
              >
                {l.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Sign up / Login
          </motion.button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden w-9 h-9 grid place-items-center rounded-full border transition-colors duration-300 ${
              solid ? 'border-slate-200' : 'border-white/40'
            }`}
            aria-label="Toggle menu"
          >
            <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
              <path d="M0 1H18" stroke={solid ? '#0f172a' : '#ffffff'} strokeWidth="2" />
              <path d="M0 7H18" stroke={solid ? '#0f172a' : '#ffffff'} strokeWidth="2" />
              <path d="M0 13H18" stroke={solid ? '#0f172a' : '#ffffff'} strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1 text-sm font-medium text-slate-600">
              {links.map((l) => {
                if (l.children) {
                  const isOpen = mobileDropdown === l.label
                  return (
                    <div key={l.label} className="border-b border-slate-50 last:border-none">
                      <div className="flex items-center justify-between py-3">
                        <Link to={l.to} onClick={() => setOpen(false)}>
                          {l.label}
                        </Link>
                        <button
                          onClick={() => setMobileDropdown(isOpen ? null : l.label)}
                          className="w-7 h-7 grid place-items-center text-slate-400"
                          aria-label={`Toggle ${l.label} submenu`}
                        >
                          <ChevronIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 flex flex-col gap-2 pb-3"
                          >
                            {l.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.to}
                                onClick={() => setOpen(false)}
                                className="text-slate-500 py-1"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return l.to ? (
                  <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="py-3">
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href?.startsWith('http') ? '_blank' : undefined}
                    rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}
                    className="py-3"
                  >
                    {l.label}
                  </a>
                )
              })}
              <button className="mt-2 bg-orange-500 text-white font-medium px-5 py-2.5 rounded-full">
                Sign up / Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}