import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
     firstname: '',
     lastname: '',
     email: '',
     street: '',
     city: '',
     province: '',
     postalCode: '',
     suburb: '',
     latitude: '',
     longitude: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/profile/${params.id}`)
      .then((res) => {
        setFormData({
          ...formData,
          ...res.data, // Spread the fetched data to update the state
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
 }, [params.id]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.put(`http://localhost:4000/profile/update/${params.id}`, formData);
    alert("Profile updated successfully!");
    // Optionally, redirect the user or refresh the data
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    <form onSubmit={handleSubmit}>
      {/* Form fields here, e.g., */}
      <label>First Name</label>
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
      />
      {/* Repeat for other fields */}
      <button type="submit">Update Profile</button>
    </form>
  </div>
);
};

export default EditProfileForm;