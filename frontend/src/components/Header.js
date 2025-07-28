import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CourseTrack</Link>
      </div>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/todo">To-Do</Link>
        <Link to="/schedule">Schedule</Link>
      </nav>
    </header>
  );
}

export default Header;
