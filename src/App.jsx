import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginRegister from "./Components/loginRegister";
import Home from "./Components/home";
import DoctorView from "./Components/doctorView";
import AppointmentPage from "./Components/appointment";
import AdminHome from "./Components/admin";
import Doctors from "./Components/manageDoctor";
import ManageUsers from "./Components/manageUsers";
import Appointments from "./Components/manageAppointments";
import AboutUs from "./Components/about"; 
import FeedbackPage from "./Components/feedback";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loginRegister" replace />} />
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctorView" element={<DoctorView />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/manageDoctor" element={<Doctors/>}/>
        <Route path="/manageUsers" element={<ManageUsers/>}/>
        <Route path="/manageAppointments" element={<Appointments/>}/>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/feedback" element={<FeedbackPage />} />


      </Routes>
    </Router>
  );
}

export default App;