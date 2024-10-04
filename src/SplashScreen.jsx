// SplashScreen.js
import React from 'react';
import './SplashScreen.css'; // Import the CSS file for styling

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src="/src/assets/DemoLogo.png" alt="Logo" className="splash-logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
