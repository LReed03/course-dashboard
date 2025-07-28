import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Semester</h1>
          <p>Plan smarter. Stay focused. Hit every deadline with ease.</p>
          <button onClick={() => navigate("/dashboard")}>Launch Dashboard</button>
        </div>
      </section>

      <section className="features">
        <h2>Everything You Need, All in One Place</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src="/icons/calendar.svg" alt="Schedule Icon" />
            <h3>Course Scheduler</h3>
            <p>Map out lectures, labs, and tutorials with an intuitive visual planner.</p>
          </div>
          <div className="feature-card">
            <img src="/icons/list.svg" alt="To-do Icon" />
            <h3>Task Tracker</h3>
            <p>Stay on top of assignments, quizzes, and submissions organized by course.</p>
          </div>
          <div className="feature-card">
            <img src="/icons/bell.svg" alt="Reminder Icon" />
            <h3>Deadline Alerts</h3>
            <p>Never miss a due date with automated reminders and smart scheduling tools.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Add Your Courses</h3>
            <p>Quickly input your course details including time, location, and type.</p>
          </div>
          <div className="step">
            <h3>2. Create Tasks & Reminders</h3>
            <p>Set up assignments, quizzes, and get alerts before they're due.</p>
          </div>
          <div className="step">
            <h3>3. View Everything in One Dashboard</h3>
            <p>Your semester, visualized. Stay focused, stay prepared.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Take Control of Your Semester Today</h2>
        <p>Stop stressing about deadlines — start organizing smarter.</p>
        <button onClick={() => navigate("/dashboard")}>Try it Free</button>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;