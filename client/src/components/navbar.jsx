<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
=======
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSession, signOut } from "../lib/auth-client";
import { showToast } from "./Toast";
import logoImg from "../assets/images/logo.png";
>>>>>>> 9f619a412038459971cf9b489e8414a28ae5d337

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
<<<<<<< HEAD
        <motion.div 
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Interlyzer AI
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
          {links.map((link) => (
            <motion.div key={link.to} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>
=======
        <Link to="/" className="logo">
          <img src={logoImg} alt="PrepNova" className="logo-img" />
          <span className="logo-text">PrepNova</span>
        </Link>

        <div className="nav-links">
          {!authenticated && (
            <Link to="/login" className={`nav-link${activeLink("/login") ? " active" : ""}`}>
              <span className="nav-icon">🔑</span> Login
            </Link>
          )}

          <Link to="/" className={`nav-link${activeLink("/") ? " active" : ""}`}>
            <span className="nav-icon">🏠</span> Home
          </Link>

          {!authenticated && (
            <p className="nav-note">Login first to unlock the full platform.</p>
          )}

          {authenticated && (
            <>
              <Link to="/resume" className={`nav-link${activeLink("/resume") ? " active" : ""}`}>
                <span className="nav-icon">📄</span> Resume
              </Link>

              <Link to="/dashboard" className={`nav-link${activeLink("/dashboard") ? " active" : ""}`}>
                <span className="nav-icon">📊</span> Dashboard
              </Link>

              <Link to="/interview" className={`nav-link${activeLink("/interview") ? " active" : ""}`}>
                <span className="nav-icon">🎙️</span> Interview
              </Link>

              <Link to="/voice-coach" className={`nav-link${activeLink("/voice-coach") ? " active" : ""}`}>
                <span className="nav-icon">🗣️</span> Voice Coach
              </Link>

              <Link to="/communication" className={`nav-link${activeLink("/communication") ? " active" : ""}`}>
                <span className="nav-icon">💬</span> Communication
              </Link>

              <Link to="/vr-interview" className={`nav-link${activeLink("/vr-interview") ? " active" : ""}`}>
                <span className="nav-icon">🥽</span> VR Interview
              </Link>

              <Link to="/github-review" className={`nav-link${activeLink("/github-review") ? " active" : ""}`}>
                <span className="nav-icon">🐙</span> GitHub Review
              </Link>

              <Link to="/aptitude" className={`nav-link${activeLink("/aptitude") ? " active" : ""}`}>
                <span className="nav-icon">🧠</span> Aptitude
              </Link>

              <Link to="/coding" className={`nav-link${activeLink("/coding") ? " active" : ""}`}>
                <span className="nav-icon">💻</span> Coding
              </Link>

              <Link to="/records" className={`nav-link${activeLink("/records") ? " active" : ""}`}>
                <span className="nav-icon">📋</span> Records
              </Link>

              <Link to="/profile" className={`nav-link${activeLink("/profile") ? " active" : ""}`}>
                <span className="nav-icon">👤</span> Profile
              </Link>

              <button className="nav-link nav-logout-btn" onClick={handleLogout}>
                <span className="nav-icon">🚪</span> Logout
              </button>
            </>
          )}
        </div>
>>>>>>> 9f619a412038459971cf9b489e8414a28ae5d337
      </div>
    </motion.aside>
  );
}