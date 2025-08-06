import { useEffect, useState } from "react";
import {addTask, loadTasks, deleteTask, updateTask} from "../api/TodoAPI"; 
import { loadCourses } from "../api/courseAPI";
import "../styles/Todo.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function fetchData() {
    let taskList = await loadTasks();
    let courseList = await loadCourses();
    setTasks(taskList);                 
    setCourses(courseList);
  }

  useEffect(() => {
    fetchData();
  }, []);


  function handleAdd() {
    if (input.trim() === "") {
      return; 
    }
    const newTask = {
      id: Date.now(),
      title: input,
      course: courseID,
      dueDate: dueDate
    };
    if(!verifyDate(newTask)){
      return; // If date verification fails, do not add the task
    }
    addTask(newTask);
    console.log("New Task Added:", newTask);
    setInput("")
    fetchData();
  }

  function removeTask(task) {
    deleteTask(task);
    fetchData();
  }

  function verifyDate(task){
    if(task.dueDate && new Date(task.dueDate.substring(0, 10)) < new Date()){
      alert("Due date cannot be in the past.");
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
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} max="9999-12-31T23:59"/>
          <button onClick={handleAdd}>Add Task</button>
        </div>
        {tasks.length > 0 ? <ul>{listTasks}</ul> : <div></div>}
        
      </div>
      <Footer/>
    </div>
  );
}

export default Todo;