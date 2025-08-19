import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../contexts/authcontext";

function Header() {
  const {userLoggedIn} = useAuth();
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CourseTrack</Link>
      </div>
      {!userLoggedIn ? 
      <nav className="nav-links">
        <Link to="/login">Login</Link> 
        <Link to="/signup">Signup</Link>
      </nav>
        :
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/todo">To-Do</Link>
        <Link to="/schedule">Schedule</Link>
      </nav>}
    </header>
  );
}

export default Header;
