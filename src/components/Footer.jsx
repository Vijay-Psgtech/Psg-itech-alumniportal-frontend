import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../utils/motion'

const columns = [
  {
    title: 'Explore',
    links: ['About', 'Events', 'Find alumni', 'Batchmates', 'Careers'],
  },
  {
    title: 'Programs',
    links: ['Flash mentorship', 'Chapters', 'Hiring partners', 'Scholarships'],
  },
  {
    title: 'Institute',
    links: ['PSG iTech', 'Departments', 'Campus', 'Contact'],
  },
]

const social = [
  {
    name: 'facebook', link: "https://www.facebook.com/alumnipsgitech/"
  },
  { 
    name: 'linkedin', link: "https://www.linkedin.com/in/psg-itech-alumni-association-714678224/"
  },
  {
    name: 'instagram', link: "https://www.instagram.com/psgitechalumni/"
  }
]

function SocialIcon({ name }) {
  const paths = {
    facebook:
      'M18.896 0H5.104C2.286 0 0 2.286 0 5.104v13.792C0 21.714 2.286 24 5.104 24h7.416v-9.294H9.691V11.06h2.829V8.413c0-2.803 1.713-4.327 4.213-4.327 1.197 0 2.225.089 2.525.129v2.927l-1.733.001c-1.358 0-1.621.646-1.621 1.593v2.088h3.242l-.422 3.646h-2.82V24h5.529C21.714 24 24 21.714 24 18.896V5.104C24 2.286 21.714 0 18.896 0z',
    linkedin:
      'M6.9 8.4H3.3V21H6.9V8.4zM5.1 3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zM21 21v-6.9c0-3.7-2-5.4-4.6-5.4a4 4 0 0 0-3.6 2h-.1v-1.7H9.3V21H13v-6.4c0-1.7 1-3.4 3.2-3.4s2.2 1.7 2.2 3.5V21H21z',
    instagram:
      'M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.3.4a4.6 4.6 0 0 1 1.7 1.1 4.6 4.6 0 0 1 1.1 1.7c.2.5.4 1.2.4 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.4 2.3a4.9 4.9 0 0 1-2.8 2.8c-.5.2-1.2.4-2.3.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4a4.6 4.6 0 0 1-1.7-1.1 4.6 4.6 0 0 1-1.1-1.7c-.2-.5-.4-1.2-.4-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.4-2.3a4.6 4.6 0 0 1 1.1-1.7 4.6 4.6 0 0 1 1.7-1.1c.5-.2 1.2-.4 2.3-.4C8.7 2.1 9 2 11.7 2H12zm0 1.8c-2.7 0-3 0-4 .1-1 0-1.5.2-1.9.3-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3.9-.3 1.9-.1 1-.1 1.3-.1 4s0 3 .1 4c0 1 .2 1.5.3 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1.9.3 1.9.3 1 .1 1.3.1 4 .1s3 0 4-.1c1 0 1.5-.2 1.9-.3.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-.9.3-1.9.1-1 .1-1.3.1-4s0-3-.1-4c0-1-.2-1.5-.3-1.9a3 3 0 0 0-.8-1.2 3 3 0 0 0-1.2-.8c-.4-.1-.9-.3-1.9-.3-1-.1-1.3-.1-4-.1zm0 4.5a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4zm0 1.8a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zm4.7-2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z',
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d={paths[name]} />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/10"
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="font-display font-semibold text-slate-900 text-[11px] tracking-wide">PSG</span>
              </div>
              <p className="font-display font-semibold text-white text-[15px]">iTech Alumni</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Keeping every PSG iTech graduate connected - through mentorship, chapters, and a network that shows up
              for each other.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors grid place-items-center"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-3 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-white text-sm font-semibold mb-4">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="text-white text-sm font-semibold mb-4">Stay in the loop</p>
            <p className="text-white/50 text-sm mb-4">Get chapter and event news in your inbox.</p>
            <form className="flex items-center bg-white/5 border border-white/15 rounded-full p-1">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-transparent outline-none text-white placeholder:text-white/30 text-sm px-4 py-2"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full shrink-0"
              >
                Join
              </motion.button>
            </form>
          </div>
        </motion.div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>Copyright © 2026 PSG iTech Alumni Association. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms of use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
