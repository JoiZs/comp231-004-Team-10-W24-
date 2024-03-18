import React, { useState } from 'react';
import '../component/registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log({ username, password, role });
    // You would replace the above console.log with your fetch to the backend
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    console.log("Redirect to login");
    // You might use react-router-dom's useHistory here for navigation or a window.location redirect
  };

  return (
    <div className="registration-container">
      <h2>Account registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input 
            type="email" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Password
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <fieldset>
          <legend>Role</legend>
          <label>
            <input 
              type="radio" 
              name="role" 
              value="pet-sitter" 
              checked={role === 'pet-sitter'} 
              onChange={(e) => setRole(e.target.value)} 
            />
            pet sitter
          </label>
          <label>
            <input 
              type="radio" 
              name="role" 
              value="pet-owner" 
              checked={role === 'pet-owner'} 
              onChange={(e) => setRole(e.target.value)} 
            />
            pet owner (customer)
          </label>
        </fieldset>
        <button type="submit">Create account</button>
        <button type="button" onClick={handleLoginRedirect}>Login</button>
      </form>
    </div>
  );
};

export default Registration;
