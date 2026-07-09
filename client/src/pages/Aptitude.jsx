import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import { showToast } from "../components/Toast";
import questionsData from "../data/aptitude_questions.json";

// Simple helpers
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(s) {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function Aptitude() {
  const allQuestions = questionsData;
  const categories = ["All", ...Array.from(new Set(allQuestions.map((q) => q.category)))];

  const [mode, setMode] = useState("Practice");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [search, setSearch] = useState("");

  const [questions, setQuestions] = useState(() => shuffle(allQuestions).slice(0, 25));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({}); // key: question.id -> option
  const [marked, setMarked] = useState({});
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem("apt_bookmarks") || "[]"));

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const startAtRef = useRef(null);

  const [showResults, setShowResults] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("apt_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (running && remaining > 0) {
      timerRef.current = setInterval(() => setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          autoSubmit();
          return 0;
        }
        return r - 1;
      }), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running, remaining]);

  function applyFilters() {
    let pool = allQuestions.slice();
    if (filterCategory !== "All") pool = pool.filter((q) => q.category === filterCategory);
    if (filterDifficulty !== "All") pool = pool.filter((q) => q.difficulty === filterDifficulty);
    if (search.trim()) pool = pool.filter((q) => (q.question + (q.explanation || '')).toLowerCase().includes(search.toLowerCase()));
    setQuestions(shuffle(pool).slice(0, Math.min(100, pool.length)));
    setCurrentIndex(0);
    setSelected({});
    setMarked({});
    setShowResults(false);
  }

  function startTimed(mins = 20) {
    setMode("Timed Test");
    const pool = allQuestions.slice();
    setQuestions(shuffle(pool).slice(0, Math.min(100, pool.length)));
    setTimerSeconds(mins * 60);
    setRemaining(mins * 60);
    setRunning(true);
    startAtRef.current = Date.now();
    setShowResults(false);
  }

  function startPractice(size = 25) {
    setMode("Practice");
    setQuestions(shuffle(allQuestions).slice(0, Math.min(size, allQuestions.length)));
    setRunning(false);
    setRemaining(0);
    setShowResults(false);
  }

  function startMock(mins = 30) {
    setMode("Mock Test");
    startTimed(mins);
  }

  function selectOption(qId, option) {
    setSelected((s) => ({ ...s, [qId]: option }));
  }

  function next() { setCurrentIndex((i) => Math.min(i + 1, questions.length - 1)); }
  function prev() { setCurrentIndex((i) => Math.max(i - 1, 0)); }
  function jumpTo(i) { setCurrentIndex(Math.max(0, Math.min(i, questions.length - 1))); }
  function toggleMark(qId) { setMarked((m) => ({ ...m, [qId]: !m[qId] })); }
  function toggleBookmark(q) { setBookmarks((b) => { const exists = b.find(x=>x.id===q.id); if (exists) return b.filter(x=>x.id!==q.id); return [...b, q]; }); }
  function skip() { next(); }

  function pauseResume() { if (remaining<=0) return; setRunning((r) => !r); }

  function computeSummary() {
    const total = questions.length;
    let correct = 0, wrong = 0, unattempted = 0;
    const perQ = questions.map((q) => {
      const sel = selected[q.id];
      if (sel == null) unattempted++;
      else if (sel === q.answer) correct++;
      else wrong++;
      return { ...q, selected: sel };
    });
    const pct = Math.round((correct / total) * 100);
    const timeTaken = startAtRef.current ? Math.round((Date.now() - startAtRef.current) / 1000) : 0;
    return { total, correct, wrong, unattempted, pct, timeTaken, perQ };
  }

  function submitTest() {
    const summary = computeSummary();
    setResultSummary(summary);
    setShowResults(true);
    setRunning(false);
    clearInterval(timerRef.current);
    persistResult(summary);
    setTimeout(renderChart, 200);
  }

  function autoSubmit() {
    showToast('Time ended — auto submitting', 'info');
    submitTest();
  }

  function persistResult(summary) {
    const history = JSON.parse(localStorage.getItem('apt_history') || '[]');
    history.unshift({ id: Date.now(), date: new Date().toISOString(), mode, ...summary });
    localStorage.setItem('apt_history', JSON.stringify(history.slice(0, 50)));
    const stats = JSON.parse(localStorage.getItem('apt_stats') || '{}');
    const attempts = (stats.testsAttempted || 0) + 1;
    const highest = Math.max(stats.highestScore || 0, summary.pct);
    const avg = ((stats.averageScore || 0) * (attempts - 1) + summary.pct) / attempts;
    const hours = (stats.totalPracticeHours || 0) + (summary.timeTaken || 0) / 3600;
    localStorage.setItem('apt_stats', JSON.stringify({ testsAttempted: attempts, highestScore: highest, averageScore: avg, totalPracticeHours: hours }));
  }

  async function renderChart() {
    if (!resultSummary || !chartRef.current) return;
    const Chart = (await import('chart.js/auto')).default;
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current._chart) chartRef.current._chart.destroy();
    chartRef.current._chart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels: ['Correct', 'Wrong', 'Unattempted'], datasets: [{ data: [resultSummary.correct, resultSummary.wrong, resultSummary.unattempted], backgroundColor: ['#28a745','#dc3545','#6c757d'] }] },
      options: { responsive: true }
    });
  }

  async function downloadPDF() {
    if (!resultSummary) return showToast('No results to download', 'warning');
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Aptitude Test Result', 14, 20);
    doc.setFontSize(12);
    doc.text(`Score: ${resultSummary.correct}/${resultSummary.total} (${resultSummary.pct}%)`, 14, 34);
    doc.text(`Time Taken: ${formatTime(resultSummary.timeTaken)}`, 14, 42);
    doc.save(`aptitude-result-${Date.now()}.pdf`);
  }

  const attempted = Object.keys(selected).length;
  const remainingCount = questions.length - attempted;
  const correctCount = Object.keys(selected).reduce((acc, id) => {
    const q = questions.find((qq) => String(qq.id) === String(id));
    return acc + (q && selected[id] === q.answer ? 1 : 0);
  }, 0);
  const accuracy = attempted ? Math.round((correctCount / attempted) * 100) : 0;

  return (
    <div className="page-container tech-page aptitude-page">
      <Navbar />

      <section className="section page-hero">
        <div className="hero-content">
          <div className="label-pill">🧠 Quant Skills</div>
          <h1 className="section-title">Aptitude Test</h1>
          <p className="section-subtitle">Practice quick aptitude questions designed for placement readiness and speed building.</p>
          <div className="hero-actions">
            <button className="btn" onClick={() => startPractice(25)}>Practice Mode</button>
            <button className="btn" onClick={() => startTimed(15)}>Timed Test (15m)</button>
            <button className="btn btn-outline" onClick={() => startMock(30)}>Mock Test (30m)</button>
          </div>
        </div>

        <div className="card enhanced-card">
          <h3>Why aptitude matters</h3>
          <p>Aptitude is the foundation of most technical and quantitative tests. Keep your problem solving sharp with short, regular practice.</p>
          <ul className="feature-list"><li>Improve speed and accuracy</li><li>Focus on high-value concepts</li><li>Measure progress with every attempt</li></ul>
        </div>
      </section>

      <section className="section">
        <div className="card enhanced-card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label>Category:
              <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)} style={{ marginLeft: 8 }}>
                {categories.map(c=> <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Difficulty:
              <select value={filterDifficulty} onChange={e=>setFilterDifficulty(e.target.value)} style={{ marginLeft: 8 }}>
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>
            <label>Search:
              <input placeholder="keyword" value={search} onChange={e=>setSearch(e.target.value)} style={{ marginLeft: 8 }} />
            </label>
            <button className="btn" onClick={applyFilters}>Apply</button>
            <div style={{ marginLeft: 'auto' }}>
              <div><strong>Mode:</strong> {mode}</div>
              <div><strong>Attempted:</strong> {attempted}</div>
            </div>
          </div>
        </div>

        <div className="card enhanced-card">
          <div style={{ display: 'flex', gap: 18 }}>
            <div style={{ flex: 1 }}>
              {questions.slice(currentIndex, currentIndex+1).map((q, idx) => (
                <div key={q.id} style={{ marginBottom: 16 }}>
                  <h3 style={{ color: '#1c5c91' }}>{currentIndex+1}. {q.question}</h3>
                  {q.options.map((opt,i)=> (
                    <label key={i} className={`aptitude-option ${selected[q.id]===opt? 'selected':''}`} style={{display:'block'}}>
                      <input type="radio" checked={selected[q.id]===opt} onChange={()=>selectOption(q.id,opt)} />
                      <span className="option-text" style={{ marginLeft: 8 }}>{opt}</span>
                    </label>
                  ))}

                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={()=>toggleMark(q.id)}>{marked[q.id]?'Unmark':'Mark for Review'}</button>
                    <button className="btn" onClick={()=>toggleBookmark(q)}>{bookmarks.find(b=>b.id===q.id)?'Bookmarked':'Bookmark'}</button>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" onClick={prev}>Previous</button>
                <button className="btn" onClick={next}>Next</button>
                <button className="btn" onClick={skip}>Skip</button>
                <button className="btn" onClick={submitTest}>Submit Test</button>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 200, height: 10, background:'#eee', borderRadius:6 }}>
                    <div style={{ width: `${Math.round((attempted/questions.length)*100)}%`, height: '100%', background:'#1c5c91', borderRadius:6 }} />
                  </div>
                </div>
              </div>
            </div>

            <aside style={{ width: 300 }}>
              <div className="card">
                <h4>Controls</h4>
                <div>Remaining Time: {remaining > 0 ? formatTime(remaining) : 'N/A'}</div>
                <div>Attempted: {attempted}</div>
                <div>Remaining: {remainingCount}</div>
                <div>Accuracy: {accuracy}%</div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn" onClick={pauseResume}>{running? 'Pause' : 'Resume'}</button>
                </div>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h4>Navigator</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {questions.map((q,i)=> (
                    <button key={q.id} className={`btn ${i===currentIndex? 'btn-outline':''}`} style={{ minWidth: 36 }} onClick={()=>jumpTo(i)}>{i+1}</button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h4>Bookmarks</h4>
                {bookmarks.length===0 ? <div>No bookmarks</div> : bookmarks.map(b=> <div key={b.id}>{b.id}. {b.question}</div>)}
              </div>
            </aside>
          </div>

          {showResults && resultSummary && (
            <div className="card enhanced-card" style={{ marginTop: 12 }}>
              <h3>Results</h3>
              <div>Total: {resultSummary.total}</div>
              <div>Correct: {resultSummary.correct}</div>
              <div>Wrong: {resultSummary.wrong}</div>
              <div>Unattempted: {resultSummary.unattempted}</div>
              <div>Percentage: {resultSummary.pct}%</div>
              <div>Time Taken: {formatTime(resultSummary.timeTaken)}</div>
              <div>Pass: {resultSummary.pct >= 40 ? 'Pass' : 'Fail'}</div>
              <div style={{ height: 160 }}>
                <canvas ref={chartRef} />
              </div>

              <div style={{ marginTop: 12 }}>
                <h4>Analysis</h4>
                {resultSummary.perQ.map((q, idx) => (
                  <div key={q.id} style={{ borderTop: '1px solid #eee', paddingTop: 8, marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>{idx+1}. {q.question}</div>
                    <div>Your answer: {q.selected || 'Unattempted'}</div>
                    <div>Correct: {q.answer}</div>
                    <div>Explanation: {q.explanation || 'N/A'}</div>
                  </div>
                ))}

                <div style={{ marginTop: 12 }}>
                  <button className="btn" onClick={downloadPDF}>Download Result (PDF)</button>
                  <button className="btn btn-outline" onClick={()=>{ setShowResults(false); setSelected({}); setMarked({}); }}>Retake</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
