import { motion } from "framer-motion";

export default function MetricCard({ title, value, detail, tone = "cyan" }) {
  const colors = {
    cyan: "from-cyan-400/20 to-cyan-500/5 text-cyan-200",
    violet: "from-violet-400/20 to-violet-500/5 text-violet-200",
    emerald: "from-emerald-400/20 to-emerald-500/5 text-emerald-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${colors[tone] || colors.cyan} p-4 backdrop-blur-xl`}
    >
      <p className="text-sm font-medium text-slate-300">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </motion.div>
  );
}
