import React from 'react';
import { motion } from 'framer-motion';
import { LucideUsers, LucideLightbulb, LucideStar } from 'lucide-react';

const fakeData = {
  personality: 'Analytical • Empathetic • Driven',
  strengths: ['Data Interpretation', 'Structured Thinking', 'Empathy'],
  weaknesses: ['Impatience', 'Overthinking'],
  learningStyle: 'Hands-on with guided reflection',
  scores: {
    problemSolving: 86,
    leadership: 72,
    communication: 78,
    criticalThinking: 82,
    confidence: 69,
  },
  suggestedRoles: ['Data Analyst', 'Product Analyst', 'Consultant'],
};

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

function PersonalityCard({ personality }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card enhanced-card"
    >
      <h3 style={{ marginBottom: 8 }}>Career Personality</h3>
      <p style={{ fontSize: 18, color: '#9fdcf6' }}>{personality}</p>
    </motion.div>
  );
}

function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="card-grid">
      <motion.div className="card" initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
        <h3>Top Strengths</h3>
        <ul style={{ marginTop: 12 }}>
          {strengths.map((s) => (
            <li key={s} style={{ marginBottom: 8 }}>{s}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="card" initial={{ x: 8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
        <h3>Weak Areas</h3>
        <ul style={{ marginTop: 12 }}>
          {weaknesses.map((w) => (
            <li key={w} style={{ marginBottom: 8 }}>{w}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function MetricBar({ label, value, color = '#00f5ff' }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-bar">
        <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9 }} style={{ background: `linear-gradient(90deg, ${color}, #8b5cf6)` }} />
      </div>
    </div>
  );
}

function RadarChart({ scores = {} }) {
  // simple 5-axis radar using SVG polygon normalized to 100
  const axes = [
    { key: 'problemSolving', label: 'Problem' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'communication', label: 'Communication' },
    { key: 'criticalThinking', label: 'Critical' },
    { key: 'confidence', label: 'Confidence' },
  ];
  const cx = 140, cy = 140, radius = 100;
  const points = axes.map((a, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const v = (scores[a.key] ?? 0) / 100;
    const x = cx + Math.cos(angle) * radius * v;
    const y = cy + Math.sin(angle) * radius * v;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.svg width="280" height="280" viewBox="0 0 280 280" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        {[0.2,0.4,0.6,0.8,1].map((r, idx) => (
          <circle key={idx} cx={cx} cy={cy} r={radius * r} fill="none" stroke="rgba(255,255,255,0.04)" />
        ))}
        <polygon points={points} fill="url(#g1)" stroke="#7dd3fc" strokeWidth={1.5} opacity={0.92} />

        {axes.map((a, i) => {
          const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
          const x = cx + Math.cos(angle) * (radius + 16);
          const y = cy + Math.sin(angle) * (radius + 16);
          return <text key={a.key} x={x} y={y} fontSize={12} textAnchor="middle" fill="#cbd5e1">{a.label}</text>;
        })}
      </g>
    </motion.svg>
  );
}

export default function CareerDNA() {
  return (
    <div className="page-container tech-page career-dna-page">
      <section className="section">
        <div className="dashboard-header">
          <SectionTitle>Career DNA — AI Personality Report</SectionTitle>
          <p className="section-subtitle">A concise, AI-generated personality and capability overview tailored to career fit and growth paths.</p>
        </div>

        <div className="card-grid" style={{ gridTemplateColumns: '1fr 360px', gap: 28 }}>
          <div>
            <PersonalityCard personality={fakeData.personality} />

            <div style={{ height: 20 }} />

            <StrengthsWeaknesses strengths={fakeData.strengths} weaknesses={fakeData.weaknesses} />

            <div style={{ height: 20 }} />

            <div className="card enhanced-card" style={{ display: 'grid', gap: 12 }}>
              <h3>Learning Style</h3>
              <p>{fakeData.learningStyle}</p>
            </div>

            <div style={{ height: 20 }} />

            <div className="card" style={{ padding: 18 }}>
              <h3>Suggested Career Roles</h3>
              <ul style={{ marginTop: 12 }}>
                {fakeData.suggestedRoles.map((r) => (
                  <li key={r} style={{ marginBottom: 8 }}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside>
            <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg,#00f5ff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LucideUsers color="#001" />
              </div>
              <div>
                <div style={{ fontSize: 14, color: '#9fdcf6' }}>Overall Employability</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>78%</div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: 16 }}>
              <h3>Capability Scores</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                <MetricBar label="Problem Solving" value={fakeData.scores.problemSolving} color="#06b6d4" />
                <MetricBar label="Leadership" value={fakeData.scores.leadership} color="#7c3aed" />
                <MetricBar label="Communication" value={fakeData.scores.communication} color="#60a5fa" />
                <MetricBar label="Critical Thinking" value={fakeData.scores.criticalThinking} color="#06b6d4" />
                <MetricBar label="Confidence" value={fakeData.scores.confidence} color="#f97316" />
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
              <RadarChart scores={fakeData.scores} />
            </div>

            <div className="card" style={{ marginTop: 12 }}>
              <h3>Quick Insights</h3>
              <ul style={{ marginTop: 12 }}>
                <li>Strong analytical streak — suits data-heavy roles.</li>
                <li>Learning thrives with practical projects + mentors.</li>
                <li>Confidence improvements will accelerate leadership growth.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
