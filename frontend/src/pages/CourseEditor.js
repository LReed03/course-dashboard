import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadCourses,  editCourse } from "../api/courseAPI";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCreation.css";
import { useParams } from "react-router-dom";


function CourseEditor() {
    const [schedule, setSchedule] = useState([
        {type: "Lecture", days: [], startTime: "", endTime: "" },
    ]);

    const [course, setCourse] = useState({
        name: "",
        code: "",
        professor: "",
        location: "",
        schedule: []
    });

    const [courses, setCourses] = useState([]);

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        async function fetchData() {
        const allCourses = await loadCourses();
        setCourses(allCourses);
        const match = allCourses.find(c => String(c.id) === id);
        if (match) {
            setCourse(match);
            setSchedule(match.schedule);
        }
        }
        fetchData();
    }, [id]);

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
      id: course.id,
      name: course.name,
      code: course.code,
      professor: course.professor,
      location: course.location,
      schedule: schedule,
    };
    
    for (let i = 0; i < courses.length; i++) {
        if (id != course.id && courses[i].code === course.code) {
            alert("Course code already exists. Please use a different code.");
            return;
            }
        }

    console.log("Submitting course:", course);
    editCourse(courseData);
    setTimeout(() => {
        navigate("/dashboard");
        }, 1000);
    }

  return (
    <div  className="course-creation-container">
      <Header />
      <div className="container">
        <h1>Edit Course</h1>
        <form onSubmit={handleSubmit}>
          <h3>Course Details</h3>
          <label htmlFor="courseName">Course Name*</label>
          <input type="text" id="courseName" name="courseName" placeholder="Enter Course Name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} required />

          <label htmlFor="courseCode">Course Code*</label>
          <input type="text" id="courseCode" name="courseCode" placeholder="Enter Course Code" value={course.code} onChange={(e) => setCourse({ ...course, code: e.target.value })} required />

          <label htmlFor="professorName">Professor Name (Optional)</label>
          <input type="text" id="professorName" name="professorName" placeholder="Enter Professor Name" value={course.professor} onChange={(e) => setCourse({ ...course, professor: e.target.value })}/>

          <label htmlFor="location">Location (Optional)</label>
          <input type="text" id="location" name="location" placeholder="Enter Location" value={course.location} onChange={(e) => setCourse({ ...course, location: e.target.value })}/>

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

              {schedule.length > 1 && (
                <button type="button" onClick={() => handleRemoveSlot(index)} className="small-button-remove">
                  Remove Time Slot
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={handleAddSlot} className="small-button-add">+ Add Time Slot</button>

          <br /><br />
          <button type="submit">Save Course</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CourseEditor;
