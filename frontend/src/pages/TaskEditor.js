import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editTask, loadTasks } from "../api/TodoAPI";
import { loadCourses } from "../api/courseAPI";
import "../styles/TaskEditor.css";


function TaskEditor() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState({
      id: id,
      title: "",
      course: "",
      dueDate: ""
  });
  const navigate = useNavigate();

  async function fetchData() {
    let courseList = await loadCourses();
    let taskList = await loadTasks();              
    setCourses(courseList);
    const match = taskList.find(t => String(t.id) === id);
    if(match) {
        setTask(match);
        setInput(match.title);
        setCourseID(match.course);
        setDueDate(match.dueDate);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

    function handleEdit() {
      if (input.trim() === "") {
        return; 
      }

      const newTask = {
        id: task.id,
        title: input,
        course: courseID,
        dueDate: dueDate
      };

      if(!verifyDate(newTask)){
        return; // If date verification fails, do not edit the task
      }
      editTask(newTask);
      console.log("Task Changed:", newTask);
      setTimeout(() => {
          navigate("/todo");
      }, 1000);
    }

  function verifyDate(task){
    if(task.dueDate && new Date(task.dueDate.substring(0, 10)) < new Date()){
      alert("Due date cannot be in the past.");
      return false;
    }
    return true;
    }

    return (
        <div className="task-editor">
        <Header />
        <div className="task-editor-container">
            <div className="todo">
                <select onChange={(e) => setCourseID(e.target.value)} value={courseID}>
                    <option value="">No Course</option>
                    {courses.map(course =>
                    <option key={course.id} value={course.id}>
                    {course.code}
                    </option>
                )}</select>
                <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)}/>
                <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <button onClick={handleEdit}>Save Changes</button>
                </div>
            </div>
            <Footer/>
        </div>
  )
}

export default TaskEditor;