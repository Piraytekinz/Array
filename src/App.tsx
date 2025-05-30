// import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Home from './pages/home';
import Index from './pages/Index';
import './App.css'
// import About from './pages/About';




function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location]);
}



function App() {
  usePageTracking();

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
