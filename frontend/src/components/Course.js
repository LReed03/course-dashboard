import React from "react";

function Course({ course, tasks}) {
    function renderTasks() {
        return tasks.filter(task => String(task.course) === String(course.id)).map(task => (
            <li key={task.id} className="task">{task.title}</li>
        ));
    }
    return (
        <div className="course">
            <h2>{course.name}</h2>
            <p>{course.code}</p>
            <p>Instructor: {course.professor}</p>
            <p>Loction: {course.location}</p>
            <div className="schedule">
                <p>Schedule: {course.schedule[0].type}</p>
                <p>{course.schedule[0].days}</p>
                <p>{course.schedule[0].startTime} - {course.schedule[0].endTime}</p>
            </div>
            <h3>Tasks:</h3>
            {renderTasks().length > 0 ? (
            <ul>{renderTasks()}</ul>
            ) : (
            <p>No tasks available for this course.</p>
            )}
        </div>
     );
}



export default Course;