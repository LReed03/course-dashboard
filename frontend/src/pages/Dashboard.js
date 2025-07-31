import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Course from "../components/Course";
import { loadCourses } from "../api/courseAPI";
import { loadTasks} from "../api/TodoAPI";
import "../styles/Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    let taskList = await loadTasks();
    let courseList = await loadCourses();
    setTasks(taskList);                 
    setCourses(courseList);
    }

    
  useEffect(() => {
    fetchData();
    }, []);

  function renderCourses() {
    if (!courses || courses.length === 0) {
      return <p>No courses available.</p>;
    }

    return courses.map(course => (
      <Course key={course.id} course={course} tasks={tasks} />
    ));
  }

  return (
    <div>
      <Header/>
      <div  className="dashboard-container">
        {renderCourses()}
      </div>
      <Link to="coursecreation"><button id="create-class-button">Add Class</button></Link>
      <Footer/>
    </div>
  );
}

export default Dashboard;