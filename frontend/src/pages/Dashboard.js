import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import CourseCreation from "./CourseCreation";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div>
      <Header/>
      <div>
        <Link to="coursecreation"><button>Create Class</button></Link>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;