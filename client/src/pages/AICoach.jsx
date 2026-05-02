import { useState } from "react";
import { showToast } from "../components/Toast";
import avatarImage from "../assets/images/image.png";

export default function AICoach() {
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

  return (
    <div className="ai-coach-container">
      <h2>PrepNova AI Coach</h2>
      <div className="ai-coach-box">
        <textarea
          className="ai-query-input"
          value={aiQuery}
          onChange={e => setAiQuery(e.target.value)}
          placeholder="Ask PrepNova AI about interview tips, communication, confidence, feedback..."
          rows={3}
        />
        <div className="ai-coach-actions">
          <button onClick={handleAskAI} disabled={listeningAi}>Ask AI</button>
          <button onClick={startAiListening} disabled={listeningAi}>
            {listeningAi ? "Listening..." : "🎤 Voice Input"}
          </button>
        </div>
        {aiResponse && (
          <div className="ai-coach-response">
            <strong>AI Coach:</strong> {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
}
