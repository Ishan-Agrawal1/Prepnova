import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSession, signOut } from "../lib/auth-client";
import { showToast } from "./Toast";
import logoImg from "../assets/images/logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: session } = useSession();

  const authenticated = !!session;
  const activeLink = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("studentUser");
      showToast("Logged out successfully", "success");
      navigate("/login");
    } catch (error) {
      showToast("Logout failed", "error");
    }
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -270 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="sidebar-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link to="/" className="logo">
            <img src={logoImg} alt="PrepNova" className="logo-img" />
            <span className="logo-text">PrepNova</span>
          </Link>
        </motion.div>

        <motion.nav
          className="nav-links"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.6 } }
          }}
        >
          {!authenticated && (
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <Link to="/login" className={`nav-link${activeLink("/login") ? " active" : ""}`}>
                <span className="nav-icon">🔑</span> Login
              </Link>
            </motion.div>
          )}

          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <Link to="/" className={`nav-link${activeLink("/") ? " active" : ""}`}>
              <span className="nav-icon">🏠</span> Home
            </Link>
          </motion.div>

          {!authenticated && (
            <p className="nav-note">Login first to unlock the full platform.</p>
          )}

          {authenticated && (
            <>
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/resume" className={`nav-link${activeLink("/resume") ? " active" : ""}`}>
                  <span className="nav-icon">📄</span> Resume
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/dashboard" className={`nav-link${activeLink("/dashboard") ? " active" : ""}`}>
                  <span className="nav-icon">📊</span> Dashboard
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/interview" className={`nav-link${activeLink("/interview") ? " active" : ""}`}>
                  <span className="nav-icon">🎙️</span> Interview
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/voice-coach" className={`nav-link${activeLink("/voice-coach") ? " active" : ""}`}>
                  <span className="nav-icon">🗣️</span> Voice Coach
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/communication" className={`nav-link${activeLink("/communication") ? " active" : ""}`}>
                  <span className="nav-icon">💬</span> Communication
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/vr-interview" className={`nav-link${activeLink("/vr-interview") ? " active" : ""}`}>
                  <span className="nav-icon">🥽</span> VR Interview
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/github-review" className={`nav-link${activeLink("/github-review") ? " active" : ""}`}>
                  <span className="nav-icon">🐙</span> GitHub Review
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/aptitude" className={`nav-link${activeLink("/aptitude") ? " active" : ""}`}>
                  <span className="nav-icon">🧠</span> Aptitude
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/coding" className={`nav-link${activeLink("/coding") ? " active" : ""}`}>
                  <span className="nav-icon">💻</span> Coding
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/records" className={`nav-link${activeLink("/records") ? " active" : ""}`}>
                  <span className="nav-icon">📋</span> Records
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/profile" className={`nav-link${activeLink("/profile") ? " active" : ""}`}>
                  <span className="nav-icon">👤</span> Profile
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <button className="nav-link nav-logout-btn" onClick={handleLogout} style={{ width: "100%", textAlign: "left" }}>
                  <span className="nav-icon">🚪</span> Logout
                </button>
              </motion.div>
            </>
          )}
        </motion.nav>
      </div>
    </motion.aside>
  );
}