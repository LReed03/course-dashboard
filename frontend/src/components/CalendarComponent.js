import React, { useState, useEffect } from "react";
import { Calendar as RBCalendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { loadCourses } from "../api/courseAPI";
import { loadTasks } from "../api/TodoAPI";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);   

  async function fetchData() {
      let courseList = await loadCourses();
      let taskList = await loadTasks();              
      setCourses(courseList);
      setTasks(taskList);
    }
    useEffect(() => {
      fetchData();
      }, []);

const events = tasks.map((task) => {
  if(task.calendarcheck){
    return {
      start: moment(task.startDate).toDate(),
      end: moment(task.dueDate).toDate(),
      title: task.title
    };
  }

});


  return (
    <div style={{ height: "90vh" }}>
      <RBCalendar
        localizer={localizer}
        events={events}
        view={view}
        onView={setView}
        date={date}                                
        onNavigate={(newDate ) => {
          setDate(newDate);                        
        }}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        toolbar={true}
      />
    </div>
  );
}
