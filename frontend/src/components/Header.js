import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../contexts/authcontext";
import { auth } from "../firebase/Firebase";
import { doSignOut } from "../firebase/Auth";

function Header() {
  const {userLoggedIn} = useAuth();
  const user = auth.currentUser;

  function signOut(){
      doSignOut();
      window.location.reload();
    }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CourseTrack</Link>
      </div>
      {!userLoggedIn ? (
      <nav className="nav-links">
        <Link to="/login">Login</Link> 
        <Link to="/signup">Signup</Link>
      </nav>
      )
        : !user.emailVerified ?(
        <nav className="nav-links">
          <Link to="/verifypage">Verify Email</Link>
          <Link onClick={signOut}>Logout</Link>
        </nav>
        ) :(
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/todo">To-Do</Link>
        <Link to="/schedule">Schedule</Link>
      </nav>)}
    </header>
  );
}

export default Header;
