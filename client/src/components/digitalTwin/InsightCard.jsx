import { motion } from "framer-motion";

export default function InsightCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}
