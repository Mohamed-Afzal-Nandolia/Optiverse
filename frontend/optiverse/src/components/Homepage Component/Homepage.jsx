import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#001C3D' }}>
      <h1 className="text-white text-4xl font-bold">Home Page</h1>
      <button 
        type="button"
        onClick={signout} 
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
        Signout
      </button>
    </div>
  );
};

export default Homepage;
