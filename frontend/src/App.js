import React, { useState, useEffect } from 'react'
import Home from './pages/home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapComponent from './MapComponent.js';

function App() {

  return (
    <div className="App">
      <MapComponent />
    </div>
  );
}

export default App;