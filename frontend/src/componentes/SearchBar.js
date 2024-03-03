import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/SearchBar.css"; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = async () => {
    navigate(`/AllCompaniesPage?companyName=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or location"
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