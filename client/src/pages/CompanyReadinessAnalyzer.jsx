import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { useSession } from "../lib/auth-client";

const companyProfiles = [
  {
    id: "google",
    company: "Google",
    role: "Software Engineer",
    targetResume: 90,
    targetCoding: 92,
    targetInterview: 88,
    requiredSkills: ["Distributed Systems", "System Design", "Python", "Problem Solving"],
    interviewDifficulty: "Hard",
    salaryRange: "$180K - $250K",
    successProbability: "76%",
    learningPlan: [
      "Practice 3 system design rounds with a focus on reliability and scale.",
      "Strengthen Python fundamentals and concurrency patterns.",
      "Prepare 5 leadership stories for behavioral interviews.",
    ],
    description: "Google looks for strong engineering depth, clear communication, and a polished product mindset.",
  },
  {
    id: "meta",
    company: "Meta",
    role: "Frontend Engineer",
    targetResume: 86,
    targetCoding: 90,
    targetInterview: 84,
    requiredSkills: ["React", "TypeScript", "Performance", "Product Thinking"],
    interviewDifficulty: "Medium-Hard",
    salaryRange: "$160K - $220K",
    successProbability: "72%",
    learningPlan: [
      "Refine React performance tuning and state architecture.",
      "Rehearse live coding with TypeScript and accessibility expectations.",
      "Build one polished portfolio case study around user impact.",
    ],
    description: "Meta values product intuition, collaboration, and crisp frontend execution.",
  },
  {
    id: "amazon",
    company: "Amazon",
    role: "SDE II",
    targetResume: 88,
    targetCoding: 91,
    targetInterview: 86,
    requiredSkills: ["Data Structures", "Problem Solving", "OOP", "Leadership"],
    interviewDifficulty: "Very Hard",
    salaryRange: "$150K - $210K",
    successProbability: "69%",
    learningPlan: [
      "Focus on hashing, trees, and graph-based problem solving.",
      "Practice operational excellence and design tradeoff answers.",
      "Prepare a STAR story centered on ownership and impact.",
    ],
    description: "Amazon emphasizes ownership, strong fundamentals, and structured communication.",
  },
];

const studentProfile = {
  name: "Ava",
  resumeScore: 82,
  codingScore: 78,
  interviewScore: 74,
  skills: ["React", "Node.js", "JavaScript", "SQL", "REST APIs"],
};

function ProgressBar({ label, value, target, accent }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percent = Math.min(100, Math.round((value / target) * 100));

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimatedValue(percent));
    return () => window.cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="font-semibold text-slate-100">
          {value}/{target}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full border border-white/10 bg-slate-800/80">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${accent}`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function CompanyReadinessAnalyzer() {
  const { data: session } = useSession();
  const [selectedCompany, setSelectedCompany] = useState(companyProfiles[0]);
  const userName = session?.user?.name || studentProfile.name;

  const missingSkills = useMemo(() => {
    return selectedCompany.requiredSkills.filter((skill) => !studentProfile.skills.includes(skill));
  }, [selectedCompany]);

  const readiness = useMemo(() => {
    const resumeFit = Math.min(100, Math.round((studentProfile.resumeScore / selectedCompany.targetResume) * 100));
    const codingFit = Math.min(100, Math.round((studentProfile.codingScore / selectedCompany.targetCoding) * 100));
    const interviewFit = Math.min(100, Math.round((studentProfile.interviewScore / selectedCompany.targetInterview) * 100));
    const skillFit = Math.max(0, Math.round(((selectedCompany.requiredSkills.length - missingSkills.length) / selectedCompany.requiredSkills.length) * 100));
    return Math.round((resumeFit + codingFit + interviewFit + skillFit) / 4);
  }, [missingSkills.length, selectedCompany]);

  return (
    <div className="page-container tech-page">
      <Navbar />

      <section className="section">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Company Readiness Analyzer
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                See how prepared {userName} is for the next company move.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Select a target company, compare current strengths, and uncover the gaps that matter most for interviews and hiring outcomes.
              </p>
            </div>

            <div className="w-full max-w-sm rounded-[20px] border border-fuchsia-400/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-100">
              <label className="mb-2 block font-medium text-fuchsia-100" htmlFor="company-select">
                Choose a company
              </label>
              <select
                id="company-select"
                value={selectedCompany.id}
                onChange={(event) => {
                  const company = companyProfiles.find((entry) => entry.id === event.target.value);
                  if (company) setSelectedCompany(company);
                }}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-white outline-none ring-0"
              >
                {companyProfiles.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.company} · {company.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_55px_rgba(2,132,199,0.12)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Company Readiness</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedCompany.company}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{selectedCompany.description}</p>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">
                {readiness}% ready
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <ProgressBar label="Resume Score" value={studentProfile.resumeScore} target={selectedCompany.targetResume} accent="from-cyan-400 via-sky-500 to-blue-500" />
              <ProgressBar label="Coding Score" value={studentProfile.codingScore} target={selectedCompany.targetCoding} accent="from-violet-400 via-fuchsia-500 to-purple-600" />
              <ProgressBar label="Interview Score" value={studentProfile.interviewScore} target={selectedCompany.targetInterview} accent="from-emerald-400 via-teal-500 to-cyan-500" />
              <ProgressBar label="Skill Match" value={Math.max(0, Math.round(((selectedCompany.requiredSkills.length - missingSkills.length) / selectedCompany.requiredSkills.length) * 100))} target={100} accent="from-amber-400 via-orange-500 to-rose-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_55px_rgba(34,211,238,0.12)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Focus Areas</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Missing Skills</h3>
              </div>
              <div className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-sm font-semibold text-violet-200">
                {missingSkills.length} gaps
              </div>
            </div>

            {missingSkills.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {missingSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-100">
                You already cover the company’s required core skills.
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Interview Difficulty</p>
                <p className="mt-2 text-lg font-semibold text-white">{selectedCompany.interviewDifficulty}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Salary Range</p>
                <p className="mt-2 text-lg font-semibold text-white">{selectedCompany.salaryRange}</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Recommended Plan</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              {selectedCompany.learningPlan.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Role Match</p>
            <p className="mt-3 text-xl font-semibold text-white">{selectedCompany.role}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your current profile is strongest in {studentProfile.skills.slice(0, 3).join(", ")}, which supports this target role well.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Success Probability</p>
            <p className="mt-4 text-4xl font-semibold text-white">{selectedCompany.successProbability}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Estimated chance of passing the first-round shortlist.
            </p>
          </motion.div>
        </section>
      </section>
    </div>
  );
}
