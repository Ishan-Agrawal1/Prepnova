import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { showToast } from "../components/Toast";
import { useSession } from "../lib/auth-client";
import { getRandomItems } from "../lib/questionUtils";

const aptitudeQuestionBank = [
  {
    question: "What is 25% of 200?",
    options: ["25", "50", "75", "100"],
    answer: "50",
  },
  {
    question: "If a train travels 60 km in 1 hour, how far in 3 hours?",
    options: ["120 km", "180 km", "240 km", "300 km"],
    answer: "180 km",
  },
  {
    question: "What is 15 + 26?",
    options: ["31", "41", "51", "61"],
    answer: "41",
  },
  {
    question: "A laptop costs $800. After a 10% discount, what is the price?",
    options: ["$720", "$740", "$760", "$780"],
    answer: "$720",
  },
  {
    question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["18", "20", "24", "32"],
    answer: "32",
  },
  {
    question: "If 3 pens cost $9, how much do 7 pens cost?",
    options: ["$18", "$21", "$24", "$27"],
    answer: "$21",
  },
];

export default function Aptitude() {
  const { data: session } = useSession();
  const user = session?.user || JSON.parse(localStorage.getItem("studentUser") || "{}");
  const [questions, setQuestions] = useState(() => getRandomItems(aptitudeQuestionBank, 2));
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetQuiz = () => {
    setQuestions(getRandomItems(aptitudeQuestionBank, 2));
    setSelected({});
    setScore(null);
  };

  const submitTest = async () => {
    const answeredCount = Object.keys(selected).length;
    if (answeredCount === 0) {
      showToast("Please answer at least one question before submitting.", "warning");
      return;
    }

    let totalScore = 0;
    questions.forEach((q, index) => {
      if (selected[index] === q.answer) {
        totalScore++;
      }
    });

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
      await axios.post(`${API_URL}/api/aptitude`, {
        userEmail: user?.email || "guest@example.com",
        score: totalScore,
        total: questions.length,
      }, { withCredentials: true });
      setScore(totalScore);
      showToast(`Test completed! You scored ${totalScore}/${questions.length}`, "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || error.response?.data?.error || "Failed to save aptitude result. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container tech-page aptitude-page">
      <Navbar />

      <section className="section page-hero">
        <div className="hero-content">
          <div className="label-pill">🧠 Quant Skills</div>
          <h1 className="section-title">Aptitude Test</h1>
          <p className="section-subtitle">
            Practice quick aptitude questions designed for placement readiness and
            speed building.
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={resetQuiz}>Take Quick Quiz</button>
            <button className="btn btn-outline">Review Concepts</button>
          </div>
        </div>

        <div className="card enhanced-card">
          <h3>Why aptitude matters</h3>
          <p>
            Aptitude is the foundation of most technical and quantitative tests.
            Keep your problem solving sharp with short, regular practice.
          </p>
          <ul className="feature-list">
            <li>Improve speed and accuracy</li>
            <li>Focus on high-value concepts</li>
            <li>Measure progress with every attempt</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card enhanced-card">
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "10px", color: "#1c5c91" }}>
                {index + 1}. {q.question}
              </h3>
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className={`aptitude-option ${selected[index] === option ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selected[index] === option}
                    onChange={() => setSelected({ ...selected, [index]: option })}
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
          ))}
          <button className="btn" onClick={submitTest} disabled={loading}>
            {loading ? "Submitting..." : "Submit Test"}
          </button>
        </div>

        {score !== null && (
          <div className="card enhanced-card" style={{ marginTop: "24px" }}>
            <h2 style={{ color: "#1b5d93" }}>
              Your Score: {score}/{questions.length}
            </h2>
          </div>
        )}
      </section>
    </div>
  );
}
