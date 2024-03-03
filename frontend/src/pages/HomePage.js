import React from 'react';
import SearchBar from './../componentes/SearchBar.js'
const Home = () => {
  return (
    <div className="Home">
        <h1 className="title">Ebituary</h1>
        <p className="slogan">Remembering Lives, Connecting Hearts, Sending Love</p>
        <div className="search-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
