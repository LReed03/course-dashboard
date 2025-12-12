import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, Navigate} from "react-router-dom";
import Footer from "../components/Footer";
import Course from "../components/Course";
import { loadCourses } from "../api/courseAPI";
import { loadTasks} from "../api/TodoAPI";
import "../styles/Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function fetchData() {
    const [taskList, courseList] = await Promise.all([
      loadTasks(),
      loadCourses()
    ])
    setTasks(taskList);                 
    setCourses(courseList);
    setLoaded(true);
    }

    
  useEffect(() => {
    fetchData();
    }, []);

  function renderCourses() {
    if (!courses || courses.length === 0) {
      return <p>No courses available.</p>;
    }

    return courses.map(course => (
      <Course key={course.id} course={course} tasks={tasks} setTasks={setTasks} setCourses={setCourses}/>
    ));
  }

  return (
    <div>
      <Header/>
      <div  className="dashboard-page">
        <div  className="dashboard-container">
          {loaded ?
          (courses.length > 0 ? renderCourses() : <p className="no-courses">No courses available.</p>) 
          :
          (<p className="no-courses">Loading...</p>)
          }
        </div>
        <Link to="coursecreation" id="create-class-button">Add Class</Link>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;