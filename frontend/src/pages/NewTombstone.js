import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/NewTombstone.css"
import tombstone from '../assets/tombstone.svg';

const NewTombstone = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    datePassedAway: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Process the form data as needed
    navigate('/thank-you'); // Redirect to another page, e.g., a thank you page
  };

  return (
    <form onSubmit={handleSubmit}>
        <img src={tombstone} alt="Tombstone" className="tombstone-image" />
      <div>
        <label htmlFor="name">NAME:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">DATE OF BIRTH:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="datePassedAway">DATE PASSED AWAY:</label>
        <input
          type="date"
          id="datePassedAway"
          name="datePassedAway"
          value={formData.datePassedAway}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewTombstone;