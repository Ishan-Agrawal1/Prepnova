import Navbar from "../components/navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="home-layout">
      <Navbar />

      <div className="home-content">

        {/* HERO */}
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Don't Just Practice. Perform.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-powered interview preparation platform to analyze, improve, and master your skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn">Start Analysis</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-outline" style={{ marginLeft: '15px' }}>Try Interview</motion.button>
          </motion.div>
        </motion.section>

        {/* FEATURES */}
        <motion.section 
          className="features"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05, y: -5 }} className="card">
            <h3>AI Resume Analyzer</h3>
            <p>Get instant feedback and score your resume.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05, y: -5 }} className="card">
            <h3>AI Mock Interview</h3>
            <p>Practice with voice & video AI interviews.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05, y: -5 }} className="card">
            <h3>Aptitude & Coding</h3>
            <p>Company-level practice tests and coding challenges.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05, y: -5 }} className="card">
            <h3>Progress Dashboard</h3>
            <p>Track your improvement and performance.</p>
          </motion.div>
        </motion.section>

        {/* DASHBOARD */}
        <motion.section 
          className="dashboard"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} className="card">
            <h3>Resume Score</h3>
            <div className="progress-bar">
              <motion.div className="progress-fill" initial={{ width: "0%" }} animate={{ width: "80%" }} transition={{ delay: 1.5, duration: 1 }}></motion.div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="card">
            <h3>Interview Score</h3>
            <div className="progress-bar">
              <motion.div className="progress-fill" initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ delay: 1.7, duration: 1 }}></motion.div>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}