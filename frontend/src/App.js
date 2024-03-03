import React from 'react';
import Home from './pages/home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <header>
        <button class="login-btn">Log In</button>
    </header>
    <Home />
      
    </div>
  );
}

export default App;