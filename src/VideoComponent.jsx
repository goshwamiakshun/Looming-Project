import React, { useRef, useState, useEffect } from "react";
import './VideoComponent.css';

const VideoComponent = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState("src/assets/MasterVideo.mp4");

  const [hotspotVisible, setHotspotVisible] = useState({
    bus: false,
    truck: false,
    auto: false,
  });

  const [shouldShowHotspots, setShouldShowHotspots] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isWrongChoice, setIsWrongChoice] = useState(false);

  const handlePlayButtonClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    if (isWrongChoice) {
      resetToOriginalVideo(); // Reset to original video if a wrong choice was made
    } else {
      resetHotspots(); // Reset hotspots if the correct choice was made
    }
  };

  const handleOptionClick = (newVideoSrc, isCorrect) => {
    if (!isOptionSelected) {
      setIsOptionSelected(true);
      setShouldShowHotspots(false);
      setVideoSrc(newVideoSrc);
      videoRef.current.load();
      videoRef.current.play();
      setIsPlaying(true);
      setIsWrongChoice(!isCorrect); // Set to true if the choice is wrong
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current.currentTime >= 32 && !isOptionSelected) {
      setHotspotVisible({ bus: true, truck: true, auto: true });
      setShouldShowHotspots(true);
      videoRef.current.pause(); // Pause the video when hotspots appear
    }
  };

  const resetHotspots = () => {
    setHotspotVisible({ bus: false, truck: false, auto: false });
    setShouldShowHotspots(false);
    setIsOptionSelected(false);
    setIsWrongChoice(false);
  };

  const resetToOriginalVideo = () => {
    setVideoSrc("src/assets/MasterVideo.mp4");
    videoRef.current.load();
    videoRef.current.currentTime = 32; // Set the time to where hotspots appear
    videoRef.current.pause(); // Pause the video before playing again
    videoRef.current.play();
    setIsPlaying(true);
    resetHotspots();
    setIsWrongChoice(false); // Reset isWrongChoice to false
  };

  

  useEffect(() => {
    const videoElement = videoRef.current;

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleVideoEnded);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleVideoEnded);
    };
  }, [handleTimeUpdate, handleVideoEnded]);

  return (
    <div className="video-container">
      <video ref={videoRef} width="1200" className="custom-video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {shouldShowHotspots && !isOptionSelected && (
        <div className="hotspots">
          {hotspotVisible.bus && (
            <img
              src="src/assets/BusDotted.png"
              alt="Bus"
              className="hotspot bus"
              onClick={() => handleOptionClick("src/assets/BUS.mp4", false)} // Incorrect
            />
          )}
          {hotspotVisible.truck && (
            <img
              src="src/assets/TruckDotted.png"
              alt="Truck"
              className="hotspot truck"
              onClick={() => handleOptionClick("src/assets/TRUCK.mp4", true)} // Correct
            />
          )}
          {hotspotVisible.auto && (
            <img
              src="src/assets/AutoDotted.png"
              alt="Auto"
              className="hotspot auto"
              onClick={() => handleOptionClick("src/assets/AUTO.mp4", false)} // Incorrect
            />
          )}
        </div>
      )}

      {!isPlaying && !isOptionSelected && (
        <div className="play-icon-container" onClick={handlePlayButtonClick}>
          <div className="play-icon"></div>
          <button className="play-text-button">Play</button>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;