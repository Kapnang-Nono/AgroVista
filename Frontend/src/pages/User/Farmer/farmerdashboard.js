import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Farmer/sidebar';

const FarmerDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={` flex ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8 bg-green-100">
        <Outlet /> {/* This renders the nested route content */}
      </main>
      {/* <Aside isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> */}
    </div>
  );
};

export default FarmerDashboard;
