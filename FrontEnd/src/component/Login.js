import React, { useEffect, useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "./axios";
import { useGlobalContext } from './context/GlobalContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const Nav = useNavigate();
  const Move = useGlobalContext();

  const validate = () => {
    if (email === "" || username === "" || password === "") {
      setValidationError("All fields are required");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    if (!validate()) {
      toast.error("valide this"); // Show validation error as toast
      return;
    }

    try {
      const response = await axios.post("/register", {
        username,
        email,
        password, // Encrypt the password on the server-side
        testAdmin: username === "admin" ? "true" : "false"
      });

      Move.dispatch({
        type: "AUTH",
        payload: {
          userId: response.data.data__user._id,
          username: response.data.data__user.username,
          email: response.data.data__user.email,
          password: response.data.data__user.password,
          basket: response.data.data__user.basket,
          testAdmin: response.data.data__user.testAdmin
        }
      });
      toast.success("Registration successful!");

      setTimeout(() => {
        Nav("/storeData");
      }, 1000);

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log(Move);
  }, [Move]);

  return (
    <>
      <div className='formConainter'>
        <div className="form-box">
          <div className="form">
            <span className="title">Sign up</span>
            <span className="subtitle">Create a free account with your email.</span>
            <div className="form-container">
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Type Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleClick}>Sign up</button>
          </div>
          <div className="form-section">
            <p>Have an account? <a href="">Log in</a></p>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Login;
