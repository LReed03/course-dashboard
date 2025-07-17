import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (input.trim() === "") {
      return; 
    }
    const newTask = {
      id: Date.now,
      title: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput(""); 
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }


  const listTasks = tasks.map((task) => (
    <div>
      <li key={task.id}>{task.title}</li><button onClick={() => removeTask(task.id)}>Complete</button>
    </div>
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