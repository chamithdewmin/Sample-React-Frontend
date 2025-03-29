import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/book.css";
import { Button } from "react-bootstrap";

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, doctorName, speciality, doctorCharge } = location.state || {};

  const [appointments, setAppointments] = useState([]); // State to hold appointments data

  // Fetch all appointments from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8082/rest-app/appointments")
      .then((response) => {
        setAppointments(response.data); // Set the appointments data from backend
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        alert("Error fetching appointments. Please try again.");
      });
  }, []);

  // Cancel appointment (delete appointment)
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8082/rest-app/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Error cancelling appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-wrapper">
      <h2>Appointments for Dr. {doctorName}</h2>

      {/* Button to navigate to Doctor View Page */}
      <div className="button-container">
        <Button variant="outline-primary" onClick={() => navigate("/DoctorView")}>
          Book Appointments
        </Button>
      </div>

      {/* Appointment Table */}
      <h3>All Appointments</h3>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Contact Number</th>
            <th>Appointment Date</th>
            <th>Doctor Charge (LK)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.speciality}</td>
              <td>{appointment.contact}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.doctorFee}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleCancelAppointment(appointment.appointmentId)}
                  size="sm"
                >
                  Cancel Appointment
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentPage;
