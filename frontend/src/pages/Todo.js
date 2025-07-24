import { useEffect, useState } from "react";
import {addTask, loadTasks, deleteTask, updateTask} from "../api/TodoAPI"; 
import "../styles/Todo.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  async function fetchData() {
    const taskList = await loadTasks();  
    setTasks(taskList);                 
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
      completed: false,
    };
    addTask(newTask);
    setInput(""); 
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
        <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleAdd}>Add Task</button>
      </div>
      <ul>{listTasks}</ul>
      <Footer/>
    </div>
  );
}

export default Todo;