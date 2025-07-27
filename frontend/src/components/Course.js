import React from "react";
import "../styles/Course.css";

function Course({course, tasks}) {
    function renderTasks() {
        return tasks.filter(task => String(task.course) === String(course.id)).map(task => (
            <li key={task.id} className="task">{task.title}</li>
        ));
    }
    function renderSchedule() {
        return course.schedule.map(sched => (
            <div className="schedule-block">
                <strong><p>{sched.type}</p></strong>
                <p>{sched.days.join(" ")}</p>
                <p>{sched.startTime} - {sched.endTime}</p>
            </div>
        ));
    }
    return (
        <div className="course">
            <h2>{course.name}</h2>
            <p>{course.code}</p>
            <p>Instructor: {course.professor}</p>
            <p>Location: {course.location}</p>
            <div className="schedule">
                <h3>Schedule:</h3>
                <div className="schedule-container">
                    {renderSchedule()}
                </div>
            </div>
            <h3>Tasks:</h3>
            {renderTasks().length > 0 ? (
            <ul>{renderTasks()}</ul>
            ) : (
            <p>No tasks available for this course.</p>
            )}
            <button id="remove-class">Remove Class</button>
        </div>
     );
}



export default Course;