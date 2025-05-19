// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Index from './pages/Index';
import './App.css'
// import About from './pages/About';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
    
  );
}

export default App;
