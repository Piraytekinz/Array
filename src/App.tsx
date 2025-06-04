// import React from 'react';
import { Routes, Route, useLocation, NavLink  } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Home from './pages/home';
import Index from './pages/Index';
import './App.css'
import Gallery from './pages/gallery';
import LoginPage from './pages/login'
import ResetPassword from './pages/passwordReset';
import {AppProvider} from './components/AppContext';




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
    <AppProvider>
      <div className='router-container'>
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

        </Routes>
        <nav>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Home
          </NavLink>
          <NavLink 
            to='/home'
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Matrix
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Login
          </NavLink>
        </nav>
      </div>
    </AppProvider>
  );
}

export default App;
