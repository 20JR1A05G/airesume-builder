import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to AI Resume Builder</h1>
      <Link to="/resume">Create Resume</Link>
    </div>
  );
};

export default HomePage;
