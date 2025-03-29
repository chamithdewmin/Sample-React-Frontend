import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Spinner, Modal, Form } from "react-bootstrap";
import { FaUserMd, FaTrash, FaEdit, FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    doctorName: "",
    speciality: "",
    doctorFee: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8083/cw-app/doctors");
        setDoctors(response.data);
      } catch (error) {
        setError("There was an error fetching the doctors data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add New Doctor
  const handleAddDoctor = async () => {
    if (!newDoctor.doctorName || !newDoctor.speciality || !newDoctor.doctorFee || !newDoctor.phone || !newDoctor.email) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8083/cw-app/doctors", newDoctor);
      setDoctors([...doctors, response.data]);
      setShowAddModal(false);
      setNewDoctor({ doctorName: "", speciality: "", doctorFee: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Open Edit Modal
  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setNewDoctor(doctor);
    setShowEditModal(true);
  };

  // Update Doctor
  const handleUpdateDoctor = async () => {
    try {
      const response = await axios.put(`http://localhost:8083/cw-app/doctors/${selectedDoctor.doctorId}`, newDoctor);
      setDoctors((prev) =>
        prev.map((doc) => (doc.doctorId === selectedDoctor.doctorId ? response.data : doc))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  // Delete Doctor
  const handleDeleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:8083/cw-app/doctors/${doctorId}`);
      setDoctors(doctors.filter((doc) => doc.doctorId !== doctorId));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="outline-secondary" onClick={() => navigate("/Admin")}>
          <FaArrowLeft /> Back to Home
        </Button>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Doctor
        </Button>
      </div>

      <h2 className="mt-3">Doctors List</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : doctors.length === 0 ? (
        <Alert variant="info">No doctors available at the moment.</Alert>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Fee ($)</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.doctorId}>
                <td>{index + 1}</td>
                <td>
                  <FaUserMd className="text-primary me-2" /> {doctor.doctorName}
                </td>
                <td>{doctor.speciality}</td>
                <td>${doctor.doctorFee}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(doctor)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteDoctor(doctor.doctorId)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Doctor Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["doctorName", "speciality", "doctorFee", "phone", "email"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                <Form.Control type="text" name={field} value={newDoctor[field]} onChange={handleInputChange} required />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddDoctor}>Add Doctor</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Doctor Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["doctorName", "speciality", "doctorFee", "phone", "email"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                <Form.Control type="text" name={field} value={newDoctor[field]} onChange={handleInputChange} required />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateDoctor}>Update Doctor</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Doctors;
