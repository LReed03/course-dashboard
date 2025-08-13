import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Schedule.css";
import CalendarComponent from "../components/CalendarComponent";

function Schedule() {
  return (
    <div>
      <Header />
      <div className="schedule-page">
        <CalendarComponent/>
      </div>
      <Footer/>
    </div>
  );
}

export default Schedule;