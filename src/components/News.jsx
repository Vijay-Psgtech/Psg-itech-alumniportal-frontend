import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '../utils/motion'
import { newsLetterAPI, API_BASE } from "../services/api";
import { formatDate } from '../utils/dateFormat'
import { useNavigate } from 'react-router-dom'

// const news = [
//   {
//     badge: 'Spotlight',
//     date: 'Jul 2, 2026',
//     title: 'Alumni spotlight: Shrihari S, Digital Trust Consultant at KPMG',
//   },
//   {
//     badge: 'Testimonial',
//     date: 'Jul 2, 2026',
//     title: 'Testimonial: Shyam Sudan Thanikachalam',
//   },
//   {
//     badge: 'Testimonial',
//     date: 'Jun 30, 2026',
//     title: 'Testimonial: Abhi C',
//   },
// ]

export default function News() {
  const [news,setNews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsLetterAPI.getRecent();
        setNews(response.data?.data || []);
      }
      catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchNews();
  }, []);

  return (
    <section id="careers" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
      >
        <div>
          <p className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3">Latest</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight max-w-lg">
            News and stories from the network
          </h2>
        </div>
        <button className="border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors font-medium px-7 py-3 rounded-full text-sm w-fit"
        onClick={() => navigate('/feed')}
        >
          View all
        </button>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-3 gap-6"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {news.map((n) => (
          <motion.article
            key={n.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm shadow-black/[0.03]"
          >
            <div className="h-48 relative bg-slate-100 flex items-center justify-center">
              <img
                src={n.imageUrl ? `${API_BASE}/${n.imageUrl}` : '/images/news-placeholder.png'}
                alt={n.title}
                className="max-w-full max-h-full object-contain m-auto"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-2">{formatDate(n.date)}</p>
              <h3 className="font-display font-semibold text-lg text-slate-900 leading-snug">{n.title}</h3>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}