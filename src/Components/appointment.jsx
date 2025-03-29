import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/appointment.css";
import axios from "axios";

const AppointmentPage = () => {
  const location = useLocation();
  const { doctorId, doctorName, speciality, doctorCharge } = location.state || {};
  
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  

  useEffect(() => {
    console.log("Received doctor details:", location.state);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !doctorName || !speciality || !doctorCharge) {
      alert("Doctor details not available.");
      return;
    }

    const appointmentData = {
      doctorId, 
      doctorName, 
      speciality, 
      patientName,
      contactNumber,
      doctorCharge,
      appointmentDate
    };

    try {
      await axios.post("http://localhost:8082/rest-app/add", appointmentData);
      alert("Appointment booked successfully!");
      setPatientName("");
      setAppointmentDate("");
      setContactNumber("");
     
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-wrapper">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctorId">Doctor ID:</label>
          <input type="text" id="doctorId" value={doctorId || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" value={doctorName || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="speciality">Speciality:</label>
          <input type="text" id="speciality" value={speciality || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="doctorCharge">Doctor's Charge (LK):</label>
          <input type="number" id="doctorCharge" value={doctorCharge || ""} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentPage;