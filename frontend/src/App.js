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
import Signup from './pages/Signup';
import VerifyPage from './pages/VerifyPage';
import RequireVerified from './components/auth/RequireVerified';
import ForgotPassword from './pages/ForgotPassword';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/todo" element={<Todo/>} /> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<RequireVerified><Dashboard/></RequireVerified>} />
        <Route path="/schedule" element={<RequireVerified><Schedule/></RequireVerified>} />
        <Route path="/dashboard/coursecreation" element={<RequireVerified><CourseCreation/></RequireVerified>} />
        <Route path="/edit-course/:id" element={<RequireVerified><CourseEditor /></RequireVerified>} />
        <Route path="/edit-task/:id" element={<RequireVerified><TaskEditor/></RequireVerified>} />
        <Route path="/verifypage" element={<VerifyPage/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
