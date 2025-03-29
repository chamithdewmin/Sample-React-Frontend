import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/doctorView.css"; // Importing the CSS file
import axios from "axios";

const CourseTable = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Fetch course data from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8083/cw-app/courses"); // Fetch course data from the entity microservice
        const filteredCourses = response.data.map(course => ({
          id: course.courseId,
          name: course.courseName,
          speciality: course.courseSpeciality, // Make sure this matches the API response field
          charge: course.courseFee
        }));
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleBookCourse = (course) => {
    navigate("/course", {
      state: {
        courseId: course.id,
        courseName: course.name,
        speciality: course.speciality,
        courseCharge: course.charge,
      },
    });
  };

  return (
    <div className="course-table-container">
      <h2>Course List</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Speciality</th>
            <th>Charge (LK)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.speciality}</td>
              <td>{course.charge}</td>
              <td>
                <button className="course-btn" onClick={() => handleBookCourse(course)}>
                  Book Course
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
