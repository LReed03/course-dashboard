import React from "react";
import "../styles/Course.css";
import { deleteTask } from "../api/TodoAPI";
import { deleteCourse } from "../api/courseAPI";
import { useNavigate } from "react-router-dom";

function Course({course, tasks, setTasks, setCourses}) {
    const navigate = useNavigate();
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
                <div className="list-items" key={task.id}>
                    <div className="task-text">
                        <li>{task.title}</li>
                        <p id="due-date">{task.dueDate ? task.dueDate.substring(0, 10) : "No due date"}</p>
                    </div>
                    <button onClick={() => removeTask(task)}>Complete</button>
                </div>
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
            <div className="buttons"> 
                <button id="edit-class" onClick={() => navigate(`/edit-course/${course.id}`)}>Edit</button>
                <button id="remove-class" onClick={() => removeCourse(course)}>Remove Class</button>
            </div>
        </div>
     );
}



export default Course;