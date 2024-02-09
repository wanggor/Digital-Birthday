import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles

const CelebrationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('celebration-screen');
    return () => {
      document.body.classList.remove('celebration-screen');
    };
  }, []);

  const handleCelebrateClick = () => {
    navigate('/bulbs');
  };

  return (
    <div className="container">
      <h1 className="header">Let's celebrate Your Birthday Maria!</h1>
      <div className="button-container">
        <button className="button" onClick={handleCelebrateClick}>
          Turn On Lights
        </button>
      </div>
    </div>
  );
};

export default CelebrationScreen;
