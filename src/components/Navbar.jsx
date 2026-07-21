import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx';
import logo from '/logo.png'

const links = [
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
  {
    label: 'Alumni',
    to: '/alumni/dashboard',
    children: [
      { label: 'Login', to: '/alumni/login' },
      { label: 'Register', to: '/alumni/register' },
      { label: 'Dashboard', to: '/alumni/dashboard' },
      { label: 'Directory', to: '/alumni/directory' },
      { label: 'Profile', to: '/alumni/profile' },
      { label: 'Map', to: '/alumni/map' },
      { label: 'Chapters', to: '/alumni/chapters' },
      { label: 'Donations', to: '/alumni/donations' },
      { label: 'Notifications', to: '/alumni/notifications' },
      { label: 'Send Notification', to: '/alumni/notifications/new' },
      { label: 'Campaigns', to: '/campaigns' },
    ],
  },
  {
    label: 'Admin',
    to: '/admin/dashboard',
    children: [
      { label: 'Login', to: '/admin/login' },
      { label: 'Dashboard', to: '/admin/dashboard' },
      { label: 'Events', to: '/admin/events' },
      { label: 'Alumni Users', to: '/admin/alumni' },
      { label: 'Newsletter', to: '/admin/newsletter' },
      { label: 'Notifications', to: '/admin/notifications' },
      { label: 'Reports', to: '/admin/reports' },
    ],
  },
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
  const [authDropdown, setAuthDropdown] = useState(false)
  const closeTimer = useRef(null)
  const authCloseTimer = useRef(null)
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobileMenu = () => {
    setOpen(false)
    setMobileDropdown(null)
    setAuthDropdown(false)
  }

  const solid = scrolled || open || authDropdown

  const openDropdown = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDesktopDropdown(label)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDesktopDropdown(null), 150)
  }
  const openAuthDropdown = () => {
    if (authCloseTimer.current) clearTimeout(authCloseTimer.current)
    setAuthDropdown(true)
  }
  const scheduleAuthClose = () => {
    authCloseTimer.current = setTimeout(() => setAuthDropdown(false), 150)
  }
  const handleAuthAction = (path) => {
    setAuthDropdown(false)
    closeMobileMenu()
    if (path === 'logout') {
      logout()
      navigate('/')
      return
    }
    navigate(path)
  }

  const accountLinks = isAuthenticated
    ? [
      { label: 'Alumni Dashboard', to: '/alumni/dashboard' },
      { label: 'Admin Dashboard', to: '/admin/dashboard' },
      { label: 'My Profile', to: '/alumni/profile' },
      { label: 'Logout', action: 'logout' },
    ]
    : [
      { label: 'Alumni Login', to: '/alumni/login' },
      { label: 'Create Alumni Account', to: '/alumni/register' },
      { label: 'Admin Login', to: '/admin/login' },
    ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm shadow-black/[0.03] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-colors duration-300 ${solid ? 'bg-white shadow-sm shadow-black/5 ring-1 ring-slate-100' : 'bg-white/90 backdrop-blur'
              }`}
          >
            <img src={logo} alt="PSG logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="leading-tight">
            <p className="font-display font-semibold text-[15px] tracking-tight text-slate-900">
              PSG iTech Alumni
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-slate-500">
              Since 2013
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-slate-700 transition-colors duration-300">
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
                      `flex items-center gap-1.5 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
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
                        <div className="bg-white rounded-xl shadow-lg shadow-black/10 border border-slate-100 py-1.5 w-56 overflow-hidden">
                          {l.children.map((child) => (
                            <NavLink
                              key={child.label}
                              to={child.to}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm transition-colors ${isActive
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
                  `transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'}`
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
                className="transition-colors text-slate-700 hover:text-slate-900"
              >
                {l.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="relative hidden sm:block"
            onMouseEnter={openAuthDropdown}
            onMouseLeave={scheduleAuthClose}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAuthDropdown((current) => !current)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              aria-expanded={authDropdown}
              aria-haspopup="menu"
            >
              {isAuthenticated ? user?.name || 'Account' : 'Sign up / Login'}
              <ChevronIcon className={`transition-transform ${authDropdown ? 'rotate-180' : ''}`} />
            </motion.button>
            <AnimatePresence>
              {authDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full pt-3"
                >
                  <div className="w-56 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg shadow-black/10">
                    {accountLinks.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleAuthAction(item.action || item.to)}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${item.action === 'logout'
                            ? 'text-red-500 hover:bg-red-50'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-slate-200 bg-white text-slate-900 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
              <path d="M0 1H18" stroke="#0f172a" strokeWidth="2" />
              <path d="M0 7H18" stroke="#0f172a" strokeWidth="2" />
              <path d="M0 13H18" stroke="#0f172a" strokeWidth="2" />
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
                        <Link to={l.to} onClick={closeMobileMenu}>
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
                                onClick={closeMobileMenu}
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
                  <Link key={l.label} to={l.to} onClick={closeMobileMenu} className="py-3">
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href?.startsWith('http') ? '_blank' : undefined}
                    rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={closeMobileMenu}
                    className="py-3"
                  >
                    {l.label}
                  </a>
                )
              })}
              <div className="pt-3">
                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Account
                </p>
                <div className="grid gap-2">
                  {accountLinks.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleAuthAction(item.action || item.to)}
                      className={`rounded-xl px-4 py-3 text-left text-sm font-semibold ${item.action === 'logout'
                          ? 'bg-red-50 text-red-500'
                          : 'bg-orange-500 text-white'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
