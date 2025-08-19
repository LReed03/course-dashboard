import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Schedule.css";
import CalendarComponent from "../components/CalendarComponent";
import { useAuth } from "../contexts/authcontext";
import { Navigate } from "react-router-dom";

function Schedule() {
  const {userLoggedIn, currentUser} = useAuth();
  return (
    <div>
      {!userLoggedIn && (!currentUser.emailVerified) && (<Navigate to={'/'} replace={true} />)}
      <Header />
      <div className="schedule-page">
        <CalendarComponent/>
      </div>
      <Footer/>
    </div>
  );
}

export default Schedule;