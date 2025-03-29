import React, { useState, useEffect } from "react";
import { Button, Table, Alert, Spinner, Form, Modal } from "react-bootstrap";
import { FaUserPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    number: "",
    email: "",
    userName: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); 
  const navigate = useNavigate();

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/my-app/patients");
        setUsers(response.data);
      } catch (error) {
        setError("There was an error fetching the users data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/my-app/patients", formData);
      setUsers([...users, response.data]);
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Edit user
  const handleEditUser = async () => {
    try {
      await axios.put(`http://localhost:8080/my-app/patients/${currentUserId}`, formData);
      setUsers(users.map((user) => (user.id === currentUserId ? { ...user, ...formData } : user)));
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/my-app/patients/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      address: "",
      number: "",
      email: "",
      userName: "",
      password: "",
    });
    setIsEdit(false);
    setCurrentUserId(null);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1800px", margin: "0 auto" }}>
      <div className="d-flex justify-content-between mb-4">
        <Button variant="outline-primary" onClick={() => navigate("/Admin")}>
          <FaArrowLeft /> Back to Home
        </Button>
        <Button variant="outline-success" onClick={() => setShowAddForm(true)}>
          <FaUserPlus /> Add User
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>{user.number}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setFormData(user);
                        setIsEdit(true);
                        setCurrentUserId(user.id);
                        setShowAddForm(true);
                      }}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteUser(user.id)} className="ms-2">
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Add/Edit User */}
          <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{isEdit ? "Edit User" : "Add User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={isEdit ? handleEditUser : handleAddUser}>
                  {isEdit ? "Update User" : "Save User"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
