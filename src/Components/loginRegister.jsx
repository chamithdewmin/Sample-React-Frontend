import React, { useState } from "react";
import "../css/loginRegister.css";
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Default to Sign In
  const [isActive, setIsActive] = useState(false); // Active class for animations
  const [message, setMessage] = useState(''); // Message state for displaying success or error messages
  const navigate = useNavigate(); // Correctly imported and used

  // Form field states for both login and register
  const [patientUsername, setUsername] = useState('');
  const [patientPassword, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  // Handle form toggle between Sign Up and Sign In
  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
    setIsActive((prev) => !prev); // Toggle active state for animation
  };

  // Handle Sign In submission
  const handleSubmitSignIn = async (e) => {
    e.preventDefault();



    if (!patientUsername || !patientPassword) {
      setMessage("Please enter both Username and Password.");
      alert("Please enter both Username and Password.!");
      return;
    }

    if (patientUsername === "admin" && patientPassword === "1023") {
      // Redirect to the admin page (replace '/admin' with the actual admin route you want)
      setMessage("Admin Login successful!");
      alert("HELLO ADMIN!!");
      navigate("/admin");
      return; // Exit the function here to prevent the login request from being made
    }
    

    try {
      const response = await axios.post("http://localhost:8080/my-app/loginUser", {
        userName: patientUsername,
        password: patientPassword
      });
      
      // Log the response for debugging
      console.log("Login response:", response);

      // Check if the backend response has a success key with a true value
      if (response.data.success === true) {
        console.log("Login successful:", response.data);
        setMessage("Login successful!");
        alert("Login successful!");
        navigate("/home");

        
        // Redirect to a new page after successful login
      } else {
        setMessage("Invalid credentials. Please try again.");
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during Sign In:", error.response ? error.response.data : error.message);
      setMessage("Login failed. Please check your credentials and try again.");
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // Handle Register submission
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !age || !address || !contact || !email || !patientUsername || !patientPassword) {
      setMessage("Please fill out all fields.");
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/my-app/patients", {
        name: fullName,
        age: age,
        email: email,
        number: contact,
        address: address,
        userName: patientUsername,
        password: patientPassword
      });

      // Log the response for debugging
      console.log("Registration response:", response);

      if (response.data.id) {
        console.log("Registration successful:", response.data);
        setMessage("Registration successful!");
        alert("Registration successful!");

        // Redirect to a new page after successful registration
      } else {
        setMessage("Registration failed. Please try again.");
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Sign Up:", error.response ? error.response.data : error.message);
      setMessage("Registration failed. Please check your details and try again.");
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Display message */}
      {message && <p className="message">{message}</p>}

      {/* Sign Up Form */}
      <div className={`form-container sign-up ${isSignUp ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmitSignUp}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="Contact No" value={contact} onChange={(e) => setContact(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Username" value={patientUsername} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={patientPassword} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`form-container sign-in ${!isSignUp ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmitSignIn}>
          <h1>Sign In</h1>
          <input type="text" placeholder="Username" value={patientUsername} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={patientPassword} onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to create an account</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Institute Management System</h1>
            <p>Register with your personal details first</p>
            <button onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;