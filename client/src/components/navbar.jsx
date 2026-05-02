import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSession, signOut } from "../lib/auth-client";
import { showToast } from "./Toast";
import logoImg from "../assets/images/image.png";

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
              <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></span> Home
            </Link>
          </motion.div>

          {!authenticated && (
            <p className="nav-note">Login first to unlock the full platform.</p>
          )}

          {authenticated && (
            <>
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/resume" className={`nav-link${activeLink("/resume") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-800v241-1 400-640 200-200Zm0 720q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h320l240 240v100q-19-8-39-12.5t-41-6.5v-41H480v-200H200v640h241q16 24 36 44.5T521-80H200Zm531-149q29-29 29-71t-29-71q-29-29-71-29t-71 29q-29 29-29 71t29 71q29 29 71 29t71-29ZM864-40 756-148q-21 14-45.5 21t-50.5 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50.5T812-204L920-96l-56 56Z"/></svg></span> Resume
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/dashboard" className={`nav-link${activeLink("/dashboard") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg></span> Dashboard
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/interview" className={`nav-link${activeLink("/interview") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M477-320Zm-277 80v-76q0-21 10.5-39.5T239-385q51-30 108.5-44T464-439q-2 10-3 19.5t-1 19.5q0 11 1 21t3 20q-47-4-92 6t-86 33h191q11 24 26.5 44t36.5 36H200Zm240-240q-51 0-85.5-34.5T320-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T440-480Zm0-80q17 0 28.5-11.5T480-600q0-17-11.5-28.5T440-640q-17 0-28.5 11.5T400-600q0 17 11.5 28.5T440-560Zm0-40ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80ZM640-240v-62q-43-8-71.5-40.5T540-420h40q0 33 23.5 56.5T660-340q33 0 56.5-23.5T740-420h40q0 45-28.5 77.5T680-302v62h-40Zm-15.5-154.5Q610-409 610-430v-80q0-21 14.5-35.5T660-560q21 0 35.5 14.5T710-510v80q0 21-14.5 35.5T660-380q-21 0-35.5-14.5Z"/></svg></span> Interview
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/voice-coach" className={`nav-link${activeLink("/voice-coach") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m798-322-62-62q44-41 69-97t25-119q0-63-25-118t-69-96l62-64q56 53 89 125t33 153q0 81-33 153t-89 125ZM670-450l-64-64q18-17 29-38.5t11-47.5q0-26-11-47.5T606-686l64-64q32 29 50 67.5t18 82.5q0 44-18 82.5T670-450Zm-310 10q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H40Zm80-80h480v-32q0-11-5.5-20T580-266q-36-18-92.5-36T360-320q-71 0-127.5 18T140-266q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-567 440-600t-23.5-56.5Q393-680 360-680t-56.5 23.5Q280-633 280-600t23.5 56.5Q327-520 360-520t56.5-23.5ZM360-600Zm0 400Z"/></svg></span> Voice Coach
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/communication" className={`nav-link${activeLink("/communication") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-80v-90q-56-18-94-64t-44-106h80q8 43 40.5 71.5T700-240h120q25 0 42.5 17.5T880-180v100H640Zm120-200q-33 0-56.5-23.5T680-360q0-33 23.5-56.5T760-440q33 0 56.5 23.5T840-360q0 33-23.5 56.5T760-280ZM360-400q0-150 105-255t255-105v80q-117 0-198.5 81.5T440-400h-80Zm160 0q0-83 58.5-141.5T720-600v80q-50 0-85 35t-35 85h-80ZM80-520v-100q0-25 17.5-42.5T140-680h120q45 0 77.5-28.5T378-780h80q-6 60-44 106t-94 64v90H80Zm120-200q-33 0-56.5-23.5T120-800q0-33 23.5-56.5T200-880q33 0 56.5 23.5T280-800q0 33-23.5 56.5T200-720Z"/></svg></span> Communication
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/vr-interview" className={`nav-link${activeLink("/vr-interview") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M263.5-143.5Q168-207 120-308q-11-5-20-9t-18-9q-20-11-31-29t-11-41v-168q0-23 11-41t31-29q9-5 18-9t20-9q48-101 143.5-164.5T480-880q121 0 216.5 63.5T840-652q11 5 20 9t18 9q20 11 31 29.5t11 40.5v168q0 22-11 40.5T878-326q-9 5-18 9t-20 9q-48 101-143.5 164.5T480-80q-121 0-216.5-63.5ZM480-160q69 0 131-28.5T718-268q-59 14-118.5 21T480-240q-60 0-119.5-7T242-268q45 51 107 79.5T480-160Zm0-320Zm0-320q-69 0-131 28.5T242-692q59-14 118.5-21t119.5-7q60 0 119.5 7T718-692q-45-51-107-79.5T480-800Zm0 480q107 0 200.5-20T840-396v-168q-66-36-159.5-56T480-640q-107 0-200.5 20T120-564v168q66 36 159.5 56T480-320Z"/></svg></span> VR Interview
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/github-review" className={`nav-link${activeLink("/github-review") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m430-30-56-57 73-73H313q-13 35-43.5 57.5T200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h134l-73-73 56-57 170 170-170 170-56-57 73-73H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45h134l-73-73 56-57 170 170L430-30Zm245-85q-35-35-35-85 0-40 22.5-70.5T720-313v-334q-35-12-57.5-42.5T640-760q0-50 35-85t85-35q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-50 0-85-35Zm-475-45q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm560 0q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160ZM200-720q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM200-200Zm560 0ZM200-760Zm560 0Z"/></svg></span> GitHub Review
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/aptitude" className={`nav-link${activeLink("/aptitude") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v200q0 17-11.5 28.5T420-160h-97Zm180.5-23.5Q480-207 480-240q0-23 11-40.5t29-28.5v-342q-18-11-29-28.5T480-720q0-33 23.5-56.5T560-800q33 0 56.5 23.5T640-720q0 23-11 40.5T600-651v101l80-48q0-34 23.5-58t56.5-24q33 0 56.5 23.5T840-600q0 33-23.5 56.5T760-520q-11 0-20.5-2.5T721-530l-91 55 101 80q7-3 14-4t15-1q33 0 56.5 23.5T840-320q0 33-23.5 56.5T760-240q-37 0-60.5-28T681-332l-81-65v89q18 11 28.5 28.5T639-240q0 33-23 56.5T560-160q-33 0-56.5-23.5Z"/></svg></span> Aptitude
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/coding" className={`nav-link${activeLink("/coding") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg></span> Coding
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/records" className={`nav-link${activeLink("/records") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/></svg></span> Records
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link to="/profile" className={`nav-link${activeLink("/profile") ? " active" : ""}`}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm379-235q41-41 41-99t-41-99q-41-41-99-41t-99 41q-41 41-41 99t41 99q41 41 99 41t99-41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm168.5-337.5Q420-555 420-580t17.5-42.5Q455-640 480-640t42.5 17.5Q540-605 540-580t-17.5 42.5Q505-520 480-520t-42.5-17.5ZM480-503Z"/></svg></span> Profile
                </Link>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <button className="nav-link nav-logout-btn" onClick={handleLogout} style={{ width: "100%", textAlign: "left" }}>
                  <span className="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></span> Logout
                </button>
              </motion.div>
            </>
          )}
        </motion.nav>
      </div>
    </motion.aside>
  );
}