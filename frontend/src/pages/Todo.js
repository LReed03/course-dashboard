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
  const [courseID, setCourseID] = useState(null);

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

    if (courseID === null){
      return;
    } 
  
    const newTask = {
      id: Date.now(),
      title: input,
      completed: false,
      course: courseID,
    };
    addTask(newTask);
    setInput("");
    setCourseID() 
    fetchData();
  }

  function removeTask(task) {
    deleteTask(task);
    fetchData();
  }


  const listTasks = tasks.map((task) => (
    <div>
      <li key={task.id}>{task.title}</li><button onClick={() => removeTask(task)}>Complete</button>
    </div>
  ));
  return (
    <div>
      <Header />
      <div className="todo">
        <select>{courses.map(course =>
          <option key={course.id} value={course.id} onClick={() => setCourseID(course.id)}>
            {course.code}
          </option>
        )}</select>
        <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleAdd}>Add Task</button>
      </div>
      <ul>{listTasks}</ul>
      <Footer/>
    </div>
  );
}

export default Todo;