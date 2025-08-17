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
  const [startDate, setStartDate] = useState("");
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

  function formatDateTimeLocal(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

    function handleEdit() {
      if (input.trim() === "") {
        return; 
      }

      let finalStart = startDate;

      if (finalStart === "" && dueDate) {
        let date = new Date(dueDate);
        date.setHours(date.getHours() - 1);
        finalStart = formatDateTimeLocal(date);
        setStartDate(finalStart); 
      }

      const newTask = {
        id: task.id,
        title: input,
        course: courseID,
        startDate: finalStart,
        dueDate: dueDate,
        calendarcheck: document.getElementById("calendar-check").checked
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
                <label for="startDate">Start Date </label>
                <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} max="9999-12-31T23:59" name="startDate" id="startDate"/>
                <label for="DueDate">Due Date</label>
                <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} max="9999-12-31T23:59" name="dueDate" id="dueDate"/>
                <label for="calendar-check">Include in Calendar</label>
                <input type="checkbox" id="calendar-check" value={task.calendarcheck}></input>
                <button onClick={handleEdit}>Save Changes</button>
                </div>
            </div>
            <Footer/>
        </div>
  )
}

export default TaskEditor;