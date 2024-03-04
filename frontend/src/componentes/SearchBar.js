import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/SearchBar.css"; 
import axios from 'axios'; // Import axios for API requests

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`);
      if (response.data[0]) {
        navigate('/map', { state: { locationData: response.data[0] } });
      } else {
        alert('Location not found. Please try another search.');
      }
    } catch (error) {
      console.error('Failed to fetch location', error);
      alert('Error searching for location. Please try again later.');
    }
    
  };



  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="search-bar-animation"></div>
      </div>
    </>
  );
};

export default SearchBar;