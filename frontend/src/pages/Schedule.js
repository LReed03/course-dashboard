import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Schedule.css";
import BigCalendar from "../components/BigCalendar";

function Schedule() {
  return (
    <div>
      <Header />
      <div className="schedule-page">
        <BigCalendar/>
      </div>
      <Footer/>
    </div>
  );
}

export default Schedule;