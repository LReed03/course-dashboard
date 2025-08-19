import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadCourses, addCourse } from "../api/courseAPI";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCreation.css";
import { useAuth } from "../contexts/authcontext";
import { Navigate } from "react-router-dom";


function CourseCreation() {
  const [courses, setCourses] = useState([]);
  const [highestId, setHighestId] = useState(0);
  const [schedule, setSchedule] = useState([
    {type: "Lecture", days: [], startTime: "", endTime: "" },
  ]);
  const {userLoggedIn} = useAuth;

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const navigate = useNavigate();
  const cleanedSchedule = schedule.filter(slot => Array.isArray(slot.days) && slot.days.length > 0);



  async function fetchData() {
    let courseList = await loadCourses();
    setCourses(courseList);
    let id = checkHighestID(courseList);
    setHighestId(id);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function checkHighestID(courseList) {
    if (!courseList || courseList.length === 0) {
      return 0;
    }
    return Math.max(...courseList.map((course) => course.id));
  }

  function handleDayChange(index, day) {
    const updated = [...schedule];
    const currentDays = updated[index].days;
    if (currentDays.includes(day)) {
      updated[index].days = currentDays.filter((d) => d !== day);
    } 
    else {
      updated[index].days = [...currentDays, day];
    }
    setSchedule(updated);
  }

  function handleTimeChange(index, field, value) {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  }

  function handleTypeChange(index, value) {
    const updated = [...schedule];
    updated[index].type = value;
    setSchedule(updated);
    }


  function handleAddSlot() {
    setSchedule([...schedule, { days: [], startTime: "", endTime: "" }]);
  }

  function handleRemoveSlot(index) {
    const updated = [...schedule];
    updated.splice(index, 1);
    setSchedule(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const courseData = {
      id: highestId + 1,
      name: e.target.courseName.value,
      code: e.target.courseCode.value,
      professor: e.target.professorName.value,
      location: e.target.location.value,
      schedule: cleanedSchedule,
    };
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].code === courseData.code) {
            alert("Course code already exists. Please use a different code.");
            return;
            }
        }

    console.log("Submitting course:", courseData);
    addCourse(courseData);
    setTimeout(() => {
        navigate("/dashboard");
        }, 1000);

  }

  return (
    <div  className="course-creation-container">
      {!userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <Header />
      <div className="container">
        <h1>Add Course</h1>
        <form onSubmit={handleSubmit}>
          <h3>Course Details</h3>
          <label htmlFor="courseName">Course Name*</label>
          <input type="text" id="courseName" name="courseName" placeholder="Enter Course Name" required />

          <label htmlFor="courseCode">Course Code*</label>
          <input type="text" id="courseCode" name="courseCode" placeholder="Enter Course Code" required />

          <label htmlFor="professorName">Professor Name (Optional)</label>
          <input type="text" id="professorName" name="professorName" placeholder="Enter Professor Name" />

          <label htmlFor="location">Location (Optional)</label>
          <input type="text" id="location" name="location" placeholder="Enter Location" />

          <h3>Class Schedule</h3>
          {schedule.map((slot, index) => (
              <div key={index} className="select-container">
                <label htmlFor={`type-${index}`}>Type:</label>
                <select
                  id={`type-${index}`}
                  value={slot.type}
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                >
                  <option value="Lecture">Lecture</option>
                  <option value="Lab">Lab</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              <div> 
                <label>Days:</label>
                <div  className="days-container">
                  {daysOfWeek.map((day) => (
                    <label key={day}>
                      <input
                        type="checkbox"
                        checked={slot.days.includes(day)}
                        onChange={() => handleDayChange(index, day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label>
                  Start Time:
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                  />
                </label>

                <label>
                  End Time:
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                  />
                </label>
              </div>

              {schedule.length > 0 && (
                <button type="button" onClick={() => handleRemoveSlot(index)} className="small-button-remove">
                  Remove Time Slot
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={handleAddSlot} className="small-button-add">+ Add Time Slot</button>

          <br /><br />
          <button type="submit">Create Course</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CourseCreation;
