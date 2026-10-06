import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { leadershipTeam } from "../content/data/leadership";
import { fadeUp, staggerContainer, viewport } from "../utils/motion";

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-400"
          >
            PSG iTech Alumni Association
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Meet our leadership team
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-2xl leading-relaxed text-white/65"
          >
            Alumni leaders bringing the PSG iTech community together through
            connection, mentorship, and opportunities to give back.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-4"
        >
          {leadershipTeam.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_35px_-18px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.4)]"
            >
              <div className="h-1.5 origin-left scale-x-0 bg-linear-to-r from-blue-500 to-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                  {member.role}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  {member.name}
                </h2>
                <div className="mt-auto flex items-center gap-2 pt-5 text-xs font-medium text-slate-400">
                  <GraduationCap size={15} className="text-blue-500" />
                  {member.batch}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            About the association <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
