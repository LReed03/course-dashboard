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
/*
    if (courseID === null){
      return;
    } 
  */
    const newTask = {
      id: Date.now(),
      title: input,
      course: courseID,
      dueDate: dueDate
    };
    addTask(newTask);
    setInput("")
    fetchData();
  }

  function removeTask(task) {
    deleteTask(task);
    fetchData();
  }


  const listTasks = tasks.map((task) => (
    <div className="list-items">
      <li key={task.id}>{task.title}</li><button onClick={() => removeTask(task)}>Complete</button>
      <p>{task.dueDate}</p>
    </div>
  ));
  return (
    <div className="todo-page">
      <Header />
      <div className="todo-container">
        <div className="todo">
          <select onChange={(e) => setCourseID(e.target.value)}>
            <option value="">No Course:</option>
            {courses.map(course =>
            <option key={course.id} value={course.id}>
              {course.code}
            </option>
          )}</select>
          <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button onClick={handleAdd}>Add Task</button>
        </div>
        {tasks.length > 0 ? <ul>{listTasks}</ul> : <div></div>}
        
      </div>
      <Footer/>
    </div>
  );
}

export default Todo;