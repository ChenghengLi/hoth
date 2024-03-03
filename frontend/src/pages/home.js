import React from 'react';

const Home = () => {
  return (
    <div className="Home">
        <h1 className="title">Ebituary</h1>
        <p className="slogan">Remembering Lives, Connecting Hearts, Sending Love</p>
        <div className="search-container">
        <input type="text" id="search" name="search" placeholder="Search by name or address" />
      </div>
    </div>
  );
};

export default Home;
