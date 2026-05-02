import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { showToast } from "../components/Toast";
import { useSession } from "../lib/auth-client";
import { shuffleArray } from "../lib/questionUtils";

const interviewQuestionBank = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Why do you want this role?",
  "Describe one project you built.",
  "How do you handle pressure?",
  "Tell me about a time you solved a difficult problem.",
  "Why should we hire you?",
  "Describe how you manage deadlines.",
  "What motivates you at work?",
  "How do you stay organized during a busy week?",
];

export default function Interview() {
  const { data: session } = useSession();
  const user = session?.user || JSON.parse(localStorage.getItem("studentUser") || "{}");
  const [questions, setQuestions] = useState(() => shuffleArray(interviewQuestionBank).slice(0, 5));
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(""));
    setCurrentQuestion(0);
  }, [questions]);

  const resetQuestions = () => {
    setQuestions(shuffleArray(interviewQuestionBank).slice(0, 5));
    setSubmitted(false);
    setFeedback("");
  };

  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const saveInterview = async () => {
    const emptyCount = answers.filter((a) => !a.trim()).length;
    if (emptyCount === questions.length) {
      showToast("Please answer at least one question before submitting.", "warning");
      return;
    }

    const generatedFeedback =
      "Good start. Your answers should be more structured, confident, and specific. Try adding real project examples, measurable achievements, and clearer introductions.";

    setIsSaving(true);

    try {
      await axios.post("http://localhost:3001/api/interviews", {
        userEmail: user?.email || "guest@example.com",
        questions,
        answers,
        feedback: generatedFeedback,
      }, { withCredentials: true });

      setFeedback(generatedFeedback);
      setSubmitted(true);
      showToast("Interview result saved successfully!", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || error.response?.data?.error || "Failed to save interview result. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!answers[currentQuestion]?.trim()) {
      showToast("Please enter an answer before moving on.", "warning");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    await saveInterview();
  };

  return (
    <div className="page-container tech-page interview-page">
      <Navbar />

      <section className="section page-hero">
        <div className="hero-content">
          <div className="label-pill">🎙️ Practice & Improve</div>
          <h1 className="section-title">AI Interview Practice</h1>
          <p className="section-subtitle">
            Practice common interview questions, capture your answers, and
            receive coaching feedback to improve your structure and confidence.
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={resetQuestions}>New Random Questions</button>
            <button className="btn btn-outline">View Example Answers</button>
            <button className="btn btn-secondary" onClick={() => navigate("/vr-interview")}>VR Interview Mode</button>
          </div>
        </div>

        <div className="card enhanced-card">
          <h3>Practice smart</h3>
          <p>
            Simulate interview rounds with a focus on storytelling, achievements,
            and clear responses.
          </p>
          <ul className="feature-list">
            <li>Structure your answers like a pro</li>
            <li>Use results and metrics to impress</li>
            <li>Build confidence with guided responses</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card enhanced-card">
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "10px", color: "#1c5c91" }}>
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p style={{ marginBottom: "10px", color: "#4f6f8f" }}>
              {questions[currentQuestion]}
            </p>
            <textarea
              className="auth-input"
              rows="6"
              placeholder="Write your answer here"
              value={answers[currentQuestion]}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn" onClick={handleSubmitQuestion} disabled={isSaving}>
              {isSaving ? "Submitting..." : (currentQuestion < questions.length - 1 ? "Submit Answer" : "Finish Interview")}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))}
              disabled={currentQuestion === 0 || isSaving}
            >
              Previous
            </button>
          </div>

          <div style={{ marginTop: "18px", color: "#6b7d91" }}>
            {answers.filter((answer) => answer.trim()).length} / {questions.length} answered
          </div>
        </div>

        {submitted && (
          <div className="card enhanced-card" style={{ marginTop: "24px" }}>
            <h2 style={{ color: "#1b5d93", marginBottom: "12px" }}>
              Interview Feedback
            </h2>
            <p style={{ color: "#5e7d97", lineHeight: "1.8" }}>{feedback}</p>
          </div>
        )}
      </section>
    </div>
  );
}
