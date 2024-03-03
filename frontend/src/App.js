import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.js'
import MapPage from './pages/map.js'
function App() {
  return (
    <div className="App">
        <header>
        <button className="login-btn">Log In</button>
    </header>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
      </Routes>
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;