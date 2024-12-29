import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import './styles.css';


function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/resume">Create Resume</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </div>
  );
}

export default App;
