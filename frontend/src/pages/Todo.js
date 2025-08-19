import { useEffect, useState } from "react";
import {addTask, loadTasks, deleteTask} from "../api/TodoAPI"; 
import { loadCourses } from "../api/courseAPI";
import "../styles/Todo.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const {userLoggedIn} = useAuth();
  

  async function fetchData() {
    let taskList = await loadTasks();
    let courseList = await loadCourses();
    setTasks(taskList);                 
    setCourses(courseList);
  }

  useEffect(() => {
    fetchData();
  }, []);

function formatDateTimeLocal(date) {
  const pad = (n) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}



function handleAdd() {
  if (input.trim() === "") return;

  let finalStart = startDate;

  if (finalStart === "" && dueDate) {
    let date = new Date(dueDate);
    date.setHours(date.getHours() - 1);
    finalStart = formatDateTimeLocal(date);
    setStartDate(finalStart); 
  }

  const newTask = {
    id: Date.now(),
    title: input,
    course: courseID,
    startDate: finalStart,  
    dueDate: dueDate,
    calendarcheck: document.getElementById("calendar-check").checked
  };

  if (!verifyDate(newTask)) return;

  addTask(newTask);
  console.log("New Task Added:", newTask);
  setInput("");
  fetchData();
}


  function removeTask(task) {
    deleteTask(task);
    fetchData();
  }

function verifyDate(task) {
  const now = new Date();

  const due = task.dueDate ? new Date(task.dueDate) : null;
  const start = task.startDate ? new Date(task.startDate) : null;

  if (due && due < now) {
    alert("Due date cannot be in the past.");
    return false;
  }

  if (start && due && start > due) {
    alert("Start date cannot be after due date.");
    return false;
  }

  return true;
  }



  const listTasks = tasks.map((task) => (
    <div className="list-items" key={task.id}>
      <div className="task-text">
        <li>{task.title}</li>'
        <p className="course-name">
          {courses.find(course => course.id === Number(task.course))?.name || "No Course"}
        </p>
        <p className="due-date">{task.dueDate ? task.dueDate.substring(0, 10) : "No due date"}</p>
      </div>
      <div className="task-buttons">
        <button onClick={() => removeTask(task)}>Complete</button>
        <a className="edit-link" href={`/edit-task/${task.id}`}>Edit</a>
      </div>
    </div>
  ));


  return (
    <div className="todo-page">
      {!userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <Header />
      <div className="todo-container">
        <div className="todo">
          <select onChange={(e) => setCourseID(e.target.value)}>
            <option value="">No Course</option>
            {courses.map(course =>
            <option key={course.id} value={course.id}>
              {course.code}
            </option>
          )}</select>
          <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
          <label for="startDate">Start Date </label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} max="9999-12-31T23:59" name="startDate" id="startDate"/>
          <label for="DueDate">Due Date</label>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} max="9999-12-31T23:59" name="dueDate" id="dueDate"/>
          <label for="calendar-check">Include in Calendar</label>
          <input type="checkbox" id="calendar-check" defaultChecked ></input>
          <button onClick={handleAdd}>Add Task</button>
        </div>
        {tasks.length > 0 ? <ul>{listTasks}</ul> : <div></div>}
        
      </div>
      <Footer/>
    </div>
  );
}

export default Todo;