// App.js
import React, { useEffect, useState } from 'react';
// import SplashScreen from './SplashScreen';
// import Header from './Header';
import VideoComponent from './VideoComponent';
// import Footer from './Footer';
import './App.css'; // Import your main app CSS
// import MainContent from './MainContent';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {loading ? <SplashScreen /> : <div className="main-content"></div>} */}
      {/* <Header/> */}
      {/* <MainContent/> */}
      <VideoComponent/>
      {/* <Footer/> */}
    </>
  );
};

export default App;
