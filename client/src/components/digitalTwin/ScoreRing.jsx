import { motion } from "framer-motion";

export default function ScoreRing({ label, value, subtitle }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}%</p>
        </div>
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 140 140" className="h-24 w-24 -rotate-90">
            <circle cx="70" cy="70" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke="url(#score-gradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-cyan-200">{value}%</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{subtitle}</p>
    </motion.div>
  );
}
