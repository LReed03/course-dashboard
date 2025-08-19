import './App.css';
import Todo from './pages/Todo';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';  
import Schedule from './pages/Schedule';
import CourseCreation from './pages/CourseCreation';
import CourseEditor from './pages/CourseEditor';
import TaskEditor from './pages/TaskEditor';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Login from './pages/Login';




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/todo" element={<Todo/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/dashboard/coursecreation" element={<CourseCreation/>} />
        <Route path="/edit-course/:id" element={<CourseEditor />} />
        <Route path="/edit-task/:id" element={<TaskEditor/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
