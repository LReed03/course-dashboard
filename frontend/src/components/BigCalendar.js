import React, { useState, useEffect } from "react";
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { loadCourses } from "../api/courseAPI";
import { loadTasks} from "../api/TodoAPI";

function BigCalendar(props){
    const localizer = momentLocalizer(moment);
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    

    async function fetchData() {
        let taskList = await loadTasks();
        let courseList = await loadCourses();
        setTasks(taskList);                 
        setCourses(courseList);
        }
    useEffect(() => {
        fetchData();
        }, []);

    return(
        <div style={{ height: "90vh"}}>
            <Calendar {...props} localizer={localizer} events={[]} />
        </div>
    );
}

export default BigCalendar;