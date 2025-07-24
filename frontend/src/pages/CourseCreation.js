import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadCourses } from "../api/courseAPI";

function CourseCreation(){
    const [courses, setCourses] = useState([]);
    const [highestId, setHighestId] = useState(0)

    async function fetchData() {
        let courseList = await loadCourses();                 
        setCourses(courseList);
        let id = checkHighestID();
        setHighestId(id);
        }

    useEffect(() => {
        fetchData();
      }, []);

    function checkHighestID() {
        if (courses.length === 0) {
            return 0;
        }
        return Math.max(...courses.map(course => course.id));
        }

    
    return(
        <div>
            <Header/>
            <Footer/>
        </div>
    )
}

export default CourseCreation;