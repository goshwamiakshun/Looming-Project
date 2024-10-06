import React, { useState } from 'react';
import './MainContent.css';

import DemoImage from 'public/DemoImage.jpg';

function MainContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [DemoImage, DemoImage, DemoImage];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="MainContent">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {images.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="prev-button">Previous</button>
      <button onClick={nextSlide} className="next-button">Next</button>
    </div>
  );
}

export default MainContent;

