import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    // Based on the role, navigate to the appropriate page
    if (role === 'pet-owner') {
      navigate('/profile_owner');
    } else if (role === 'pet-sitter') {
      navigate('/profile_sitter');
    } else {
      // Handle the case where no role is selected or an unexpected value is received
      console.log('Please select a valid role.');
    }
  };

  // Your form JSX goes here
  return (
    <div className="p-5">
      {/* Form content */}
      <form onSubmit={handleSubmit}>
        {/* Username, Password inputs */}
        
        {/* Role Selection */}
        <fieldset className="mb-4">
          <legend className="text-sm font-medium text-gray-700">Role</legend>
          <div className="mt-2 flex items-center">
            <input 
              id="pet-sitter" 
              type="radio" 
              name="role" 
              value="pet-sitter" 
              onChange={(e) => setRole(e.target.value)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="pet-sitter" className="ml-3 block text-sm font-medium text-gray-700">
              Pet Sitter
            </label>
          </div>
          <div className="mt-2 flex items-center">
            <input 
              id="pet-owner" 
              type="radio" 
              name="role" 
              value="pet-owner" 
              onChange={(e) => setRole(e.target.value)}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="pet-owner" className="ml-3 block text-sm font-medium text-gray-700">
              Pet Owner (Customer)
            </label>
          </div>
        </fieldset>
        
        {/* Submit button */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
