import { useState } from "react";
import { AdminAptitudeApi } from "../../api/aptitudeApi";
import "../../styles/aptitude.css";

export default function PublishAptitudeTest() {
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const handlePublish = async () => {
    setPublishing(true);
    setError("");
    setResult(null);
    try {
      const { data } = await AdminAptitudeApi.publishTest({
        title: title || undefined,
        durationMinutes: 45,
        questionCount: 30,
      });
      setResult(data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Could not publish the test. Please try again."
      );
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="apt-page">
      <div className="apt-container">
        <div className="apt-card">
          <h1 className="apt-title">Aptitude Evaluation</h1>
          <p className="apt-subtitle">
            Publishing automatically fetches 30 aptitude questions and sends
            the test to every student. Each student gets a 45-minute,
            full-screen, no-tab-switch, single-attempt session.
          </p>

          <label style={{ fontSize: 13, fontWeight: 600, color: "#0b1f4b" }}>
            Test title (optional)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Weekly Aptitude Assessment - Batch A"
            style={{
              width: "100%",
              padding: "12px 14px",
              margin: "8px 0 20px",
              borderRadius: 10,
              border: "1.5px solid #e6efff",
              fontSize: 14,
            }}
          />

          <button
            className="apt-btn apt-btn-primary"
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? "Publishing…" : "🚀 Publish Test to All Students"}
          </button>

          {error && (
            <p style={{ color: "#dc2626", marginTop: 16, fontSize: 14 }}>
              {error}
            </p>
          )}

          {result && (
            <div
              className="apt-card"
              style={{ marginTop: 22, background: "#f4f8ff" }}
            >
              <span className="apt-pill apt-pill-green">✓ Published</span>
              <h3 style={{ margin: "12px 0 4px" }}>{result.title}</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
                {result.totalQuestions} questions · {result.durationMinutes}{" "}
                minutes · sent to {result.studentsAssigned} student
                {result.studentsAssigned === 1 ? "" : "s"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
