import React, { useState } from 'react';
import { useGlobalContext } from './context/GlobalContext';
import "./Identify.css";
import axios from "./axios";
import { Link, useNavigate } from 'react-router-dom';

const Identify = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Move = useGlobalContext();
  const [error, setError] = useState(null);
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New state to track success

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error on new login attempt

    try {
      const response = await axios.post("/identify", { username, password });

      Move.dispatch({
        type: "ADD__TO__CARD",
        payload: response.data.user.basket,
      });

      Move.dispatch({
        type: "AUTH",
        payload: {
          userId: response.data.user._id,
          username: response.data.user.username,
          email: response.data.user.email,
          password: response.data.user.password,
          testAdmin: response.data.user.testAdmin,
        },
      });

      setLoading(false);
      setSuccess(true); // Mark as successful login

      setTimeout(() => {
        Nav("/storeData");
      }, 1000);

    } catch (error) {
      console.log(`Error: ${error}`);
      setLoading(false);
      setError("Failed to login. Please check your username or password and try again.");
      setSuccess(false); // Reset success on failure
    }
  };

  return (
    <div className='Identify__Container'>
      <input 
        type='text'
        style={{ border: `1px solid ${loading === false && error ? 'red' : 'black' }` }}
        placeholder='Username' 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <br/>
      <input 
        type='password'
        style={{ border: `1px solid ${loading === false && error ? 'red' : 'black' }` }}
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <br/>
      <button 
        onClick={handleLogin} 
        disabled={loading} 
        style={{ 
          backgroundColor: success ? "green" : (loading === false && error ? "red" : "") 
        }}
      >
        {loading ? "Loading..." : success ? "Success" : "Login"}
      </button>
      
      {error && <p className="error-message">{error} or <Link to="/l" style={{ textDecoration: "none" }}><span style={{ color: "red" }}>Sign Up</span></Link> if you don&#39;t have an account.</p>}
    </div>
  );
};

export default Identify;
