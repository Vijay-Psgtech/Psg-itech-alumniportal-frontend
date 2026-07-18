import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer, viewport } from '../utils/motion'
import bannerImage from '../assets/t1725016098_OVsmN6OAPi.jpg'

{/* Team Images */}
import presidentImg from "../assets/images/team/president.jpg";
import vicePresidentImg from "../assets/images/team/vice_president.jpg";
import secretaryImg from "../assets/images/team/secretary.jpg";
import treasurerImg from "../assets/images/team/treasurer.jpg";
import jointSecretary1Img from "../assets/images/team/joint_secretary_1.jpg";
import jointSecretary2Img from "../assets/images/team/joint_secretary_2.jpg";
import jointSecretary3Img from "../assets/images/team/joint_secretary_3.jpg";
import jointSecretary4Img from "../assets/images/team/joint_secretary_4.jpg";

const team = [
  { initials: 'NK', name: 'Navaneetha Krishnan', role: 'President', batch: 'Class of 2018', dept: "B.E - Civil", image: presidentImg },
  { initials: 'HK', name: 'Hariharan K', role: 'Vice-President', batch: 'Class of 2019', dept: "B.E - CSE", image: vicePresidentImg },
  { initials: 'VJ', name: 'Vijay Jayaram', role: 'Secretary', batch: 'Class of 2018', dept: "B.E - Mechanical", image: secretaryImg },
  { initials: 'SS', name: 'Shivanginadia S', role: 'Treasurer', batch: 'Class of 2018', dept: "B.E - CSE", image: treasurerImg },
  { initials: 'KS', name: 'Karthik S', role: 'Joint-Secretary', batch: 'Class of 2018', dept: "B.E - Civil", image: jointSecretary1Img },
  { initials: 'BA', name: 'Bharath Arun P', role: 'Joint-Secretary', batch: 'Class of 2018', dept: "B.E - EEE", image: jointSecretary2Img },
  { initials: 'SP', name: 'Samyuktha Priyadharshini', role: 'Joint-Secretary', batch: 'Class of 2019', dept: "B.E - ECE", image: jointSecretary3Img },
  { initials: 'ST', name: 'Srinidhi Thangam S', role: 'Joint-Secretary', batch: 'Class of 2019', dept: "B.E - CSE", image: jointSecretary4Img },
]

const aboutParagraphs = [
  'PSG Institute of Technology and Applied Research (PSG iTech) has emerged as one of the most preferred institutions for engineering aspirants in our country. PSG iTech is renowned for its commitment towards the teaching-learning process for the effective transfer of knowledge, pursuit of truth, and moulding students to become ideal citizens of the country.',
  'PSG iTech Alumni Association is established with the support of PSG Management to re-connect alumni with their fellow alumni, institutes, and students on campus; to engage through various activities among all stakeholders; and to create impact through social and academic initiatives for collective development. The Association is registered under the Tamil Nadu Societies Act 1975, Coimbatore, India.',
  'The alumni association carries out numerous activities with the support of Management, Principal, and faculty members of PSG iTech. We represent about 2,000+ PSG iTech alumni across chapters spread around the globe, joining hands to make PSG iTech a world-class institution.',
  'The association provides financial support to underprivileged students through scholarships. PSG iTech is proud of its distinguished and talented alumni who have made outstanding contributions to the betterment of the institute and society.',
]

export default function AboutPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-white">
      {/* Page header */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img src={bannerImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 lg:pt-28 lg:pb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-orange-400 mb-4"
          >
            Home <span className="text-white/30">/</span> About
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight max-w-2xl"
          >
            About the PSG iTech Alumni Portal
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-5 max-w-xl leading-relaxed"
          >
            A living record of everyone who has walked through PSG iTech — and
            the network built to keep that walk going long after graduation.
          </motion.p>
        </div>
      </section>

      {/* About content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-orange-500/40" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                <img
                  src={bannerImage}
                  alt="PSG iTech campus aerial view"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8 flex gap-8 border-t border-slate-100 pt-6">
              <div>
                <p className="font-display text-2xl font-semibold text-slate-900">2013</p>
                <p className="text-xs text-slate-400 mt-1">Founding year</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-slate-900">2,000+</p>
                <p className="text-xs text-slate-400 mt-1">Registered alumni</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-slate-900">TN Act</p>
                <p className="text-xs text-slate-400 mt-1">1975 registered</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-slate-500 leading-relaxed pl-6 border-l-2 border-orange-500/30"
              >
                {p}
              </motion.p>
            ))}
            <motion.p variants={fadeUp} className="text-slate-900 font-medium pl-6 border-l-2 border-orange-500">
              We encourage you to communicate with fellow alumni on this forum
              and discover possibilities for giving back to your alma mater.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase mb-3 text-center"
          >
            Office bearers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center leading-tight mb-14"
          >
            Meet our team
          </motion.h2>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.4)]"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  <div className="h-1.5 bg-gradient-to-r from-orange-500 to-orange-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[280px] object-cover top-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-slate-900/0 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 inline-flex w-fit items-center rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                    {member.role}
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-slate-900">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{member.batch}</p>
                  <p className="mt-1 text-sm text-slate-500 tracking-wide">{member.dept}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-slate-900 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-orange-400 text-xs font-medium tracking-[0.2em] uppercase mb-3"
          >
            Get in touch
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight mb-14"
          >
            Contact us
          </motion.h2>

          <div className="grid lg:grid-cols-12 gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <h3 className="font-display text-white font-semibold mb-4">Contact info</h3>
                <div className="text-white/60 text-sm leading-relaxed space-y-0.5">
                  <p>PSG iTech Alumni Association</p>
                  <p>PSG Institute of Technology and Applied Research</p>
                  <p>Avinashi Road, Neelambur</p>
                  <p>Coimbatore &ndash; 641 062, Tamil Nadu</p>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-sm text-white/70">
                  <p>0422 3933 494</p>
                  <p>alumni@psgitech.ac.in</p>
                  <p>psgitech.ac.in</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  {['facebook', 'linkedin', 'instagram'].map((s) => (
                    <span
                      key={s}
                      className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-white/60 hover:text-orange-400 hover:border-orange-400 transition-colors text-[11px] uppercase"
                    >
                      {s[0]}
                    </span>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4"
              >
                <h3 className="font-display text-white font-semibold mb-1">Reach out</h3>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">
                    Your name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">
                    Your email <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Phone no.</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="+91 Phone no."
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">
                    Your message <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Your message"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium text-sm px-6 py-3 rounded-full mt-1"
                >
                  Submit
                </motion.button>
                {sent && (
                  <motion.p
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    className="text-xs text-orange-400"
                  >
                    Thanks — your message has been sent.
                  </motion.p>
                )}
              </form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/10 min-h-[420px]"
            >
              <iframe
                title="PSG iTech campus location"
                src="https://www.google.com/maps?q=PSG+Institute+of+Technology+and+Applied+Research,+Avinashi+Road,+Neelambur,+Coimbatore&output=embed"
                className="w-full h-full min-h-[420px] grayscale-[20%]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}