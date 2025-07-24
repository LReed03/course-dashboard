import './App.css';
import Todo from './pages/Todo';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';  
import Schedule from './pages/Schedule';
import CourseCreation from './pages/CourseCreation';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/dashboard/coursecreation" element={<CourseCreation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
