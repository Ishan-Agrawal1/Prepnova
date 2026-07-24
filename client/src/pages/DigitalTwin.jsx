import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import Navbar from "../components/navbar";
import MetricCard from "../components/digitalTwin/MetricCard";
import ScoreRing from "../components/digitalTwin/ScoreRing";
import InsightCard from "../components/digitalTwin/InsightCard";

export default function DigitalTwin() {
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
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                <BrainCircuit size={16} />
                AI Digital Twin
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your hiring intelligence, packaged into one living dashboard.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Track your resume strength, communication, coding fluency, confidence, and employability in one elegant workspace.
              </p>
            </div>
            <div className="rounded-[20px] border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-sm text-fuchsia-100">
              <div className="flex items-center gap-2">
                <Cpu size={16} />
                <span>Adaptive coaching engine online</span>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_55px_rgba(2,132,199,0.12)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">AI Avatar</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Nova • Career Twin</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">
                Optimizing
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/15 via-slate-900/40 to-violet-500/20 p-5">
                <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_35%)]" />
                  <div className="absolute h-36 w-36 rounded-full bg-cyan-400/25 blur-3xl" />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-slate-800 to-violet-400 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                    <Sparkles className="text-cyan-100" size={34} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-semibold">Readiness Status</span>
                  </div>
                  <p className="mt-3 text-xl font-semibold text-white">Strong fit for product and engineering roles.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your profile is aligned with modern hiring patterns across resume clarity, communication, and coding depth.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Career Readiness</p>
                    <p className="mt-2 text-2xl font-semibold text-white">84/100</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Learning Velocity</p>
                    <p className="mt-2 text-2xl font-semibold text-white">+18%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <ScoreRing label="Career Readiness" value={84} subtitle="You're trending above the benchmark for interviewed candidates." />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="Resume Score" value="91" detail="Strong keyword alignment and impact-driven wording." tone="cyan" />
          <MetricCard title="Communication Score" value="87" detail="Pacing and storytelling are steadily improving." tone="violet" />
          <MetricCard title="Coding Score" value="82" detail="Solid grasp of data structures and practical problem solving." tone="emerald" />
          <MetricCard title="Confidence Score" value="79" detail="Calmer delivery and clearer answers under pressure." tone="cyan" />
          <MetricCard title="Learning Velocity" value="+18%" detail="New concepts are converting into durable recall." tone="violet" />
          <MetricCard title="Employability Score" value="88" detail="Strong portfolio signal with a clear role fit narrative." tone="emerald" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <InsightCard title="AI Recommendation">
            <div className="space-y-3">
              {[
                "Refine your story with a sharper 90-second intro.",
                "Target fintech and product roles in your next applications sprint.",
                "Practice one advanced React system design prompt each morning.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </InsightCard>

          <InsightCard title="Weekly Improvement">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Momentum is compounding</p>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">
                  +29%
                </div>
              </div>
              <div className="mt-5 flex items-end gap-2">
                {[48, 56, 67, 74, 81, 89].map((bar, index) => (
                  <div key={bar} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-full bg-gradient-to-t from-cyan-500 to-violet-500" style={{ height: `${bar}px` }} />
                    <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{['M','T','W','T','F','S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </InsightCard>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Google", "Software Engineer", "92% fit", "Excellent alignment on systems thinking and storytelling."],
            ["Stripe", "Frontend Engineer", "88% fit", "Your React fluency and polished communication stand out."],
            ["Meta", "Product Engineer", "84% fit", "Resume claims and technical depth are now more targeted."],
          ].map(([company, role, fit, note]) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{company}</p>
                  <p className="mt-1 text-sm text-slate-400">{role}</p>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">
                  {fit}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{note}</p>
            </motion.div>
          ))}
        </section>
      </section>
    </div>
  );
}
