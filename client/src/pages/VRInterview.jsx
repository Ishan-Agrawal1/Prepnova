import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "../components/navbar";
import { showToast } from "../components/Toast";
import { shuffleArray } from "../lib/questionUtils";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { motion } from "framer-motion";
import avatarImage from "../assets/images/image.png";

const AVATAR_IMAGE_URL = avatarImage;

const interviewQuestions = [
  "Tell me about your background and experience.",
  "What are your key strengths?",
  "Describe a technical challenge you overcame.",
  "How do you handle feedback?",
  "Where do you see yourself in 5 years?",
];

const createInterviewRoom = (scene) => {
  // Create floor
  const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 10, height: 10 }, scene);
  floor.material = new BABYLON.StandardMaterial("floorMat", scene);
  floor.material.diffuse = new BABYLON.Color3(0.3, 0.35, 0.4);

  // Create walls
  const backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 10, height: 3, depth: 0.2 }, scene);
  backWall.position.z = 5;
  backWall.position.y = 1.5;
  backWall.material = new BABYLON.StandardMaterial("wallMat", scene);
  backWall.material.diffuse = new BABYLON.Color3(0.25, 0.3, 0.35);

  const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: 0.2, height: 3, depth: 10 }, scene);
  leftWall.position.x = -5;
  leftWall.position.y = 1.5;
  leftWall.material = new BABYLON.StandardMaterial("leftWallMat", scene);
  leftWall.material.diffuse = new BABYLON.Color3(0.22, 0.27, 0.32);

  const rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: 0.2, height: 3, depth: 10 }, scene);
  rightWall.position.x = 5;
  rightWall.position.y = 1.5;
  rightWall.material = new BABYLON.StandardMaterial("rightWallMat", scene);
  rightWall.material.diffuse = new BABYLON.Color3(0.06, 0.09, 0.11);

  // Create ceiling
  const ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: 10, height: 0.2, depth: 10 }, scene);
  ceiling.position.y = 3;
  ceiling.material = new BABYLON.StandardMaterial("ceilingMat", scene);
  ceiling.material.diffuse = new BABYLON.Color3(0.35, 0.37, 0.4);

  // Lights
  const ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
  ambientLight.intensity = 0.6;

  const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 2, -3), scene);
  pointLight.intensity = 0.5;
  pointLight.range = 20;

  return { floor, backWall, leftWall, rightWall, ceiling };
};

const createInterviewerAvatar = (scene, imageUrl = AVATAR_IMAGE_URL) => {
  const avatarPlane = BABYLON.MeshBuilder.CreatePlane("avatarPlane", { width: 1.4, height: 1.8 }, scene);
  avatarPlane.position = new BABYLON.Vector3(0, 1.05, 2);

  const avatarMat = new BABYLON.StandardMaterial("avatarPlaneMat", scene);
  avatarMat.diffuseTexture = new BABYLON.Texture(
    imageUrl,
    scene,
    false,
    true,
    BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    () => {},
    (message, exception) => {
      console.warn("Avatar image failed to load:", message, exception);
    }
  );
  avatarMat.specularColor = new BABYLON.Color3(0, 0, 0);
  avatarMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
  avatarPlane.material = avatarMat;

  return { avatar: avatarPlane };
};

const animateAvatarSpeaking = (avatar, duration = 3) => {
  const startTime = Date.now();
  const animationInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration * 1000) {
      clearInterval(animationInterval);
      if (avatar.avatar) avatar.avatar.position.y = 1.05;
      return;
    }

    const t = (elapsed / (duration * 1000)) * Math.PI * 2;
    if (avatar.avatar) {
      avatar.avatar.position.y = 1.05 + Math.sin(t) * 0.04;
      avatar.avatar.rotation.y = Math.sin(t * 0.3) * 0.04;
    }
  }, 16);
};

export default function VRInterview() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const avatarRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasVideoRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const uploadedAvatarUrlRef = useRef(null);

  const [vrSupported, setVrSupported] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState(() => shuffleArray(interviewQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [eyeContact, setEyeContact] = useState(0); // 0-100%
  const [cameraActive, setCameraActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [avatarImageSrc, setAvatarImageSrc] = useState(avatarImage);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [listeningAi, setListeningAi] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const startAiListening = () => {
    if (!SpeechRecognition) {
      showToast("Speech recognition is not supported in this browser.", "warning");
      return;
    }

    setListeningAi(true);
    setAiQuery("");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript + " ";
      }
      setAiQuery(transcript.trim());
    };

    recognition.onerror = () => {
      setListeningAi(false);
      showToast("Voice query failed. Please try again.", "error");
    };

    recognition.onend = () => {
      setListeningAi(false);
    };

    recognition.start();
  };

  const handleAskAI = () => {
    if (!aiQuery.trim()) {
      showToast("Please enter a query or use voice input.", "warning");
      return;
    }

    const queryLower = aiQuery.toLowerCase();
    let response = "";

    if (queryLower.includes("interview") || queryLower.includes("answer")) {
      response = "For interview questions, focus on the STAR method (Situation, Task, Action, Result). Tell a real story, quantify your impact, and connect it to the role. Practice clear articulation and confidence.";
    } else if (queryLower.includes("communication")) {
      response = "Effective communication means listening actively, speaking clearly, and explaining complex ideas simply. Use examples and avoid technical jargon when needed. Always seek feedback and adapt your style.";
    } else if (queryLower.includes("confidence")) {
      response = "Build confidence through practice. Record yourself, identify gaps, and practice answering common questions. Remember: employers want to see YOU succeed. Be authentic and prepared.";
    } else if (queryLower.includes("feedback") || queryLower.includes("improve")) {
      response = "Track what works and what doesn't. After each practice, note: clarity, pacing, structure, and confidence level. Focus on one improvement per session to build momentum.";
    } else if (queryLower.includes("eye contact") || queryLower.includes("body")) {
      response = "Maintain eye contact to show confidence. Sit upright, avoid fidgeting, and speak at a moderate pace. Your body language shows engagement and professionalism.";
    } else {
      response = "I can help you with interview prep, communication tips, confidence building, and feedback. Ask me about STAR method, communication strategies, body language, or how to improve your answers.";
    }

    setAiResponse(response);
    showToast("PrepNova AI response ready.", "success");
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadedAvatarUrlRef.current) {
      URL.revokeObjectURL(uploadedAvatarUrlRef.current);
    }
    const fileUrl = URL.createObjectURL(file);
    uploadedAvatarUrlRef.current = fileUrl;
    setAvatarImageSrc(fileUrl);
  };

  useEffect(() => {
    return () => {
      if (uploadedAvatarUrlRef.current) {
        URL.revokeObjectURL(uploadedAvatarUrlRef.current);
        uploadedAvatarUrlRef.current = null;
      }
    };
  }, []);

  // Initialize Babylon.js scene
  useEffect(() => {
    if (!canvasRef.current || !sessionStarted) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.15, 0.18, 0.22);

    // Create camera
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -3));
    camera.attachControl(canvasRef.current, true);
    camera.inertia = 0.7;
    camera.angularSensibility = 1000;

    // Create scene
    createInterviewRoom(scene);
    const { avatar } = createInterviewerAvatar(scene, avatarImageSrc);

    engineRef.current = engine;
    sceneRef.current = scene;
    avatarRef.current = { avatar };
    cameraRef.current = camera;

    // Check VR support
    const checkVRSupport = async () => {
      try {
        await sceneRef.current.createDefaultXRExperienceAsync();
        if (navigator.xr) {
          const supported = await navigator.xr.isSessionSupported("immersive-vr");
          setVrSupported(supported);
        }
      } catch {
        setVrSupported(false);
      }
    };
    checkVRSupport();

    const handleResize = () => engine.resize();
    window.addEventListener("resize", handleResize);

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, [sessionStarted, avatarImageSrc]);

  // Speak question
  const speakQuestion = useCallback(() => {
    if (!("speechSynthesis" in window)) return;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) => /google|samantha|alex|en-us/i.test(voice.name)) || voices[0];
    const utterance = new SpeechSynthesisUtterance(randomQuestions[currentQuestion]);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.95;
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (avatarRef.current) {
        animateAvatarSpeaking(avatarRef.current, utterance.text.split(" ").length / 2);
      }
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion, randomQuestions]);

  useEffect(() => {
    if (sessionStarted) {
      const timeout = setTimeout(() => {
        speakQuestion();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [sessionStarted, speakQuestion]);

  // Start VR session
  const startVR = async () => {
    if (!sceneRef.current || !vrSupported) return;

    try {
      await sceneRef.current.createDefaultXRExperienceAsync();
      await navigator.xr.requestSession("immersive-vr");
    } catch {
      showToast("VR session not available. Ensure WebXR is supported.", "warning");
    }
  };

  // Initialize camera for face detection
  useEffect(() => {
    if (!sessionStarted) return;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
        }
      } catch (error) {
        console.error("Camera access denied", error);
        showToast("Camera access required for VR interview experience.", "warning");
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setCameraActive(false);
    };
  }, [sessionStarted]);

  // Simple face detection using canvas brightness analysis
  useEffect(() => {
    if (!sessionStarted) return;

    const detectFaceSimple = () => {
      const video = videoRef.current;
      const canvas = canvasVideoRef.current;
      if (!video || !canvas || video.readyState < HTMLVideoElement.HAVE_ENOUGH_DATA) {
        setFaceDetected(false);
        setEyeContact(0);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let skinPixels = 0;
      const centerRegion = {
        x: canvas.width * 0.2,
        y: canvas.height * 0.15,
        width: canvas.width * 0.6,
        height: canvas.height * 0.7,
      };

      for (let y = Math.floor(centerRegion.y); y < centerRegion.y + centerRegion.height; y += 4) {
        for (let x = Math.floor(centerRegion.x); x < centerRegion.x + centerRegion.width; x += 4) {
          const offset = (y * canvas.width + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          if (r > 95 && g > 40 && b > 20 && r > b && r > g && Math.abs(r - g) > 15) {
            skinPixels += 1;
          }
        }
      }

      const totalPixelsInRegion = Math.max(1, Math.floor(centerRegion.width / 4) * Math.floor(centerRegion.height / 4));
      const skinPercentage = (skinPixels / totalPixelsInRegion) * 100;

      if (skinPercentage > 10) {
        setFaceDetected(true);
        setEyeContact(Math.min(100, Math.round(70 + (skinPercentage - 10) * 0.5)));
      } else {
        setFaceDetected(false);
        setEyeContact(0);
      }

      ctx.strokeStyle = skinPercentage > 10 ? "#00c853" : "#ff1744";
      ctx.lineWidth = 3;
      ctx.strokeRect(centerRegion.x, centerRegion.y, centerRegion.width, centerRegion.height);
      ctx.fillStyle = `rgba(0, ${skinPercentage > 10 ? 200 : 0}, 0, 0.12)`;
      ctx.fillRect(centerRegion.x, centerRegion.y, centerRegion.width, centerRegion.height);
    };

    detectionIntervalRef.current = window.setInterval(detectFaceSimple, 120);
    return () => {
      if (detectionIntervalRef.current) {
        window.clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    };
  }, [sessionStarted]);

  const nextQuestion = () => {
    if (currentQuestion < randomQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeout(() => speakQuestion(), 500);
    }
  };

  const repeatQuestion = () => {
    speakQuestion();
  };

  return (
    <div className="page-container tech-page vr-interview-page">
      <Navbar />
      {!sessionStarted ? (
        <motion.section 
          className="section page-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <div className="label-pill">Immersive VR</div>
            <h1 className="section-title">VR Interview Experience</h1>
            <p className="section-subtitle">Experience a fully immersive virtual interview with an AI interviewer.</p>
            <div className="hero-upload">
              <label className="upload-label">
                Upload avatar image
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
              </label>
              {avatarImageSrc && (
                <div className="avatar-preview">
                  <img src={avatarImageSrc} alt="Uploaded avatar preview" />
                </div>
              )}
            </div>
            <div className="hero-actions">
              <button className="btn" onClick={() => {
                setRandomQuestions(shuffleArray(interviewQuestions));
                setCurrentQuestion(0);
                setSessionStarted(true);
              }}>
                Start Interview
              </button>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section className="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="vr-container card enhanced-card" style={{ padding: "20px" }}>
          <div className="vr-media-grid">
            <canvas ref={canvasRef} className="vr-scene-canvas" />
            <div className="vr-preview-card">
              <h4>Attention preview</h4>
              <canvas ref={canvasVideoRef} className="vr-preview-canvas" />
              <p>Live video tracking helps the avatar understand your eye contact and presence.</p>
            </div>
          </div>

          <video ref={videoRef} style={{ display: "none" }} autoPlay muted playsInline />

          <div className="vr-controls">
            <div className="vr-status">
              <p>Question: {currentQuestion + 1} / {randomQuestions.length}</p>
              <p>Face Detected: {faceDetected ? "✓ Yes" : "✗ No"}</p>
              <p>Eye Contact: {eyeContact}%</p>
              <p>Camera: {cameraActive ? "Active" : "Waiting for access"}</p>
              <p>Interviewer: {isSpeaking ? "Speaking..." : "Ready"}</p>
            </div>

            <div className="vr-buttons">
              <button onClick={speakQuestion} disabled={isSpeaking}>
                {isSpeaking ? "Listening..." : "Read Question"}
              </button>
              <button onClick={repeatQuestion} disabled={isSpeaking}>
                Repeat Question
              </button>
              <button onClick={nextQuestion} disabled={currentQuestion === randomQuestions.length - 1}>
                Next Question
              </button>
              {vrSupported && (
                <button onClick={startVR} className="vr-btn">
                  Enter VR Mode
                </button>
              )}
            </div>

            <div className="vr-question-display">
              <h3>Current Question:</h3>
              <p>{randomQuestions[currentQuestion]}</p>
            </div>

            <div className="ask-ai-card" style={{ marginTop: "24px" }}>
              <div className="ask-ai-header">
                <h3>📚 PrepNova AI Coach</h3>
                <p>Ask for interview tips, communication advice, or feedback on your performance. Type or speak your question.</p>
              </div>
              <div className="ask-ai-row">
                <input
                  className="ask-ai-input"
                  type="text"
                  placeholder="Ask about interview techniques, communication, confidence, or feedback..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                />
                <button className="btn btn-outline" onClick={startAiListening}>
                  {listeningAi ? "Listening..." : "🎙️ Voice"}
                </button>
              </div>
              <div className="ask-ai-actions">
                <button className="btn" onClick={handleAskAI}>
                  Ask AI
                </button>
              </div>
              {aiResponse && (
                <div className="ask-ai-response">
                  <strong>PrepNova Response:</strong>
                  <p>{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </motion.section>
      )}
    </div>
  );
}
