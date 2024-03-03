import React from 'react';
import SearchBar from './../componentes/SearchBar.js'
import "./../styles/HomePage.css"
import Background from './../assets/HomeBackground.svg';


const Home = () => {
  return (
    <div className="home-container">
      <img src={Background} className="home-background" alt="Background" />
      <div className="searchbar-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;



