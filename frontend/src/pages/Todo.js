import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (input.trim() === "") {
      return; 
    }
    setTasks([...tasks, input]);
    setInput(""); 
  }

  const listTasks = tasks.map((task, index) => (
    <li key={index}>{task}</li>
  ));
  return (
    <div>
      <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addTask}>Add Task</button>
      <ol>{listTasks}</ol>
    </div>
  );
}

export default Todo;