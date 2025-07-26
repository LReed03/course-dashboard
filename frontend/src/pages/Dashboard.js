import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Course from "../components/Course";
import { loadCourses } from "../api/courseAPI";
import { loadTasks } from "../api/TodoAPI";
import "../styles/Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  console.log(courses);

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
        <Link to="coursecreation"><button>Create Class</button></Link>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;