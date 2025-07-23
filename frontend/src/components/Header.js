import React from "react";
import {Link} from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/todo">Todo</Link>
      <Link to="/Schedule">About</Link>
    </header>
  );
}

export default Header;