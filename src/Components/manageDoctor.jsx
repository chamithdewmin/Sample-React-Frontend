import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Spinner, Modal, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseDuration: "",
    courseFee: "",
    instructor: "",
    courseDescription: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8083/cw-app/courses");
        setCourses(response.data);
      } catch (error) {
        setError("There was an error fetching the courses data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add New Course
  const handleAddCourse = async () => {
    if (!newCourse.courseName || !newCourse.courseDuration || !newCourse.courseFee || !newCourse.instructor || !newCourse.courseDescription) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8083/cw-app/courses", newCourse);
      setCourses([...courses, response.data]);
      setShowAddModal(false);
      setNewCourse({ courseName: "", courseDuration: "", courseFee: "", instructor: "", courseDescription: "" });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Open Edit Modal
  const openEditModal = (course) => {
    setSelectedCourse(course);
    setNewCourse(course);
    setShowEditModal(true);
  };

  // Update Course
  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(`http://localhost:8083/cw-app/courses/${selectedCourse.courseId}`, newCourse);
      setCourses((prev) =>
        prev.map((c) => (c.courseId === selectedCourse.courseId ? response.data : c))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8083/cw-app/courses/${courseId}`);
      setCourses(courses.filter((c) => c.courseId !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="outline-secondary" onClick={() => navigate("/Admin")}>
          <FaArrowLeft /> Back to Home
        </Button>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Course
        </Button>
      </div>

      <h2 className="mt-3">Courses List</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : courses.length === 0 ? (
        <Alert variant="info">No courses available at the moment.</Alert>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Duration</th>
              <th>Fee ($)</th>
              <th>Instructor</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.courseId}>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>{course.courseDuration}</td>
                <td>${course.courseFee}</td>
                <td>{course.instructor}</td>
                <td>{course.courseDescription}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(course)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCourse(course.courseId)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Course Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["courseName", "courseDuration", "courseFee", "instructor", "courseDescription"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                <Form.Control type="text" name={field} value={newCourse[field]} onChange={handleInputChange} required />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddCourse}>Add Course</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["courseName", "courseDuration", "courseFee", "instructor", "courseDescription"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                <Form.Control type="text" name={field} value={newCourse[field]} onChange={handleInputChange} required />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateCourse}>Update Course</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses;
