import React from "react";
import "../styles/Landing.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Header/>

      <section className="hero">
        <h2>Your Personal Course Organizer</h2>
        <p>Track tasks, schedules, deadlines, and more — all in one place.</p>
        <button onClick={() => navigate("/dashboard")}>Get Started</button>
      </section>

      <section className="features" id="features">
        <h3>Features</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>📅 Schedule Manager</h4>
            <p>Visualize your course schedule clearly.</p>
          </div>
          <div className="feature-card">
            <h4>✅ To-Do List</h4>
            <p>Organize tasks and assignments by course.</p>
          </div>
          <div className="feature-card">
            <h4>🧠 Smart Reminders</h4>
            <p>Stay on top of deadlines and exams.</p>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Landing;
