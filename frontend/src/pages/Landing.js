import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <Header />
      <div className="landing-container">
        <h1>Welcome to the Course Dashboard</h1>
        <p>Your one stop shop to help you keep you course organized.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;