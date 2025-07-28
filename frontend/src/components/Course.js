import React from "react";
import "../styles/Course.css";
import { deleteTask } from "../api/TodoAPI";
import { deleteCourse } from "../api/courseAPI";

function Course({course, tasks, setTasks, setCourses}) {
    function removeTask(task) {
      deleteTask(task);
      setTasks(prev => prev.filter(t => t.id !== task.id));
      }

      function removeCourse(course){
        deleteCourse(course);
        setCourses(prev => prev.filter(c => c.id !== course.id));
      }

      
    function renderTasks() {
        return tasks
            .filter((task) => String(task.course) === String(course.id))
            .map((task) => (
            <li key={task.id} className="task">
                {task.title}
                <input type="checkbox" checked={task.completed} onChange={() => removeTask(task)} />
            </li>
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
        <div className="task-container">{renderTasks()}</div>
        ) : (
        <p className="no-course">No tasks available for this course.</p>
        )}

            <button id="remove-class" onClick={() => removeCourse(course)}>Remove Class</button>
        </div>
     );
}



export default Course;