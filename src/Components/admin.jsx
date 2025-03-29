import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarCheck } from "react-icons/fa";
import "../css/admin.css";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-card">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="admin-content">
          <h2>Welcome, Admin!</h2>
          <p>Manage Courses, Courses, Application</p>

          <div className="management-section">
            {/* Manage Courses */}
            <div className="manage-box" onClick={() => navigate("/manageDoctor")}>
              <FaUserMd size={40} className="icon doctor" />
              <h3>Manage Courses</h3>
            </div>

            {/* Manage Students */}
            <div className="manage-box" onClick={() => navigate("/manageUsers")}>
              <FaUsers size={40} className="icon users" />
              <h3>Manage Students</h3>
            </div>

            {/* Manage Applications */}
            <div className="manage-box" onClick={() => navigate("/manageAppointments")}>
              <FaCalendarCheck size={40} className="icon appointments" />
              <h3>Manage Application</h3>
            </div>
          </div>

          <button className="logout-btn" onClick={() => navigate("/loginRegister")}>Logout</button>
        </section>
      </div>
    </div>
  );
};

export default AdminHomePage;
