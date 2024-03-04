import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.js'
import MapPage from './pages/MapPage.js'
import ObituaryPage from './pages/ObituaryPage.js';
import NewTombstone from './pages/NewTombstone.js';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/obituary" element={<ObituaryPage />}></Route>
        <Route path='/newTombstone' element={<NewTombstone/>}></Route>
      </Routes>
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;