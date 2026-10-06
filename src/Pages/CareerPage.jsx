import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";
import { fadeUp } from "../utils/motion";

const careerSections = {
  job: {
    title: "Alumni job opportunities",
    eyebrow: "Careers",
    description:
      "Discover career opportunities shared across the PSG iTech alumni community and connect with alumni in your field.",
    icon: BriefcaseBusiness,
    action: "Explore alumni directory",
    to: "/alumni/directory",
  },
  internship: {
    title: "Internship opportunities",
    eyebrow: "Careers",
    description:
      "Find internship leads and connect with alumni who can share advice about starting your career.",
    icon: GraduationCap,
    action: "Meet the alumni community",
    to: "/alumni/directory",
  },
  mentorship: {
    title: "Mentorship",
    eyebrow: "Careers",
    description:
      "Build meaningful connections with experienced alumni and get guidance for your academic and professional journey.",
    icon: Sparkles,
    action: "Find an alumni mentor",
    to: "/alumni/directory",
  },
};

export default function CareerPage() {
  const { section = "job" } = useParams();
  const career = careerSections[section];
  const Icon = career?.icon;

  if (!career) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-slate-50 px-6 pt-24 text-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">Career page not found</h1>
          <Link to="/careers/job" className="mt-5 inline-flex text-blue-600 hover:text-blue-700">
            Browse career opportunities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 px-6 pb-16 pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-400"
          >
            {career.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            {career.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-2xl leading-relaxed text-white/65"
          >
            {career.description}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Icon size={26} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold text-slate-900">
            Start with your alumni network
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-500">
            Opportunity listings are shared through the alumni community. Browse
            alumni profiles to find people working in your area of interest, or
            sign in to connect with the network.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={career.to}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {career.action} <ArrowRight size={16} />
            </Link>
            <Link
              to="/alumni/login"
              className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
            >
              Alumni sign in
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
