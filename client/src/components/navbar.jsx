import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/resume", label: "Resume Analyzer" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/interview", label: "Interview" },
    { to: "/communication", label: "Communication" },
    { to: "/voice-coach", label: "Voice Coach" },
    { to: "/vr-interview", label: "VR Interview" },
    { to: "/aptitude", label: "Aptitude" },
    { to: "/coding", label: "Coding Test" },
    { to: "/github-review", label: "Github Review" },
    { to: "/roadmap", label: "Roadmap" },
    { to: "/records", label: "Records" },
    { to: "/profile", label: "Profile" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Signup" },
  ];

  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -270 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="sidebar-inner">
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
      </div>
    </motion.aside>
  );
}