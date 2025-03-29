import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/appointment.css";
import axios from "axios";

const CoursePage = () => {
  const location = useLocation();
  const { courseId, courseName, courseSpeciality, courseFee } = location.state || {};
  
  const [studentName, setStudentName] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  

  useEffect(() => {
    console.log("Received course details:", location.state);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId || !courseName || !courseSpeciality || !courseFee) {
      alert("Course details not available.");
      return;
    }

    const courseData = {
      courseId, 
      courseName, 
      courseSpeciality,
      studentName,
      contactNumber,
      courseFee,
      enrollmentDate
    };

    try {
      await axios.post("http://localhost:8082/rest-app/add", courseData);
      alert("Course enrollment successful!");
      setStudentName("");
      setEnrollmentDate("");
      setContactNumber("");
     
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Error enrolling in course. Please try again.");
    }
  };

  return (
    <div className="appointment-wrapper">
      <h2>Enroll in Course</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="courseId">Course ID:</label>
          <input type="text" id="courseId" value={courseId || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input type="text" id="courseName" value={courseName || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="courseSpeciality">Course Speciality:</label>
          <input type="text" id="courseSpeciality" value={courseSpeciality || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input type="text" id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="courseFee">Course Fee (LK):</label>
          <input type="number" id="courseFee" value={courseFee || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentDate">Enrollment Date:</label>
          <input type="date" id="enrollmentDate" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Enroll in Course</button>
      </form>
    </div>
  );
};

export default CoursePage;
