import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const BulbScreen = () => {
  const bulbImages = ['bulb_pink.png', 'bulb_green.png', 'bulb_blue.png', 'bulb_orange.png', 'bulb_red.png', 'bulb_yellow.png'];

  const navigate = useNavigate();

  const [currentBulbIndex, setCurrentBulbIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [musicPlayed, setMusicPlayed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showBannerAfterClick, setShowBannerAfterClick] = useState(false);
  const [showBalloonsButton, setShowBalloonsButton] = useState(false);
  const [showSingleBalloon, setShowSingleBalloon] = useState(false);
  const [showRoamingBalloons, setShowRoamingBalloons] = useState(false);
  const [roamingBalloons, setRoamingBalloons] = useState([]);
  const [showTempButton, setShowTempButton] = useState(true);
  const [showDeliciousCakeButton, setShowDeliciousCakeButton] = useState(false);
  const [showLightCandlesButton, setShowLightCandlesButton] = useState(false);
  const [showIamGre, setShowIamGre] = useState(false);
  const [candleImage, setCandleImage] = useState('/assets/cake.png');
  const [showMessageButton, setShowMessageButton] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [messages, setMessages] = useState(["Happy Birthday to my wonderful best friend! 🎉🎂 Your friendship brings so much joy into my life. Wishing you a day filled with love, laughter, and unforgettable moments. May your day be as beautiful and vibrant as you are, and may the year ahead be filled with endless blessings and dreams fulfilled. Here's to celebrating you today and always! 🥳🎈"]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messageAnimation, setMessageAnimation] = useState(false);

  useEffect(() => {
    const bulbInterval = setInterval(() => {
      setCurrentBulbIndex((prevIndex) => (prevIndex + 1) % bulbImages.length);
    }, 3000);

    const musicButtonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearInterval(bulbInterval);
      clearTimeout(musicButtonTimeout);
    };
  }, []);

  useEffect(() => {
    if (showMessageButton) {
      setMessageAnimation(true);
    }

    return () => {
      setMessageAnimation(false);
    };
  }, [showMessageButton]);

  const handleTurnOnMusic = () => {
    const audio = new Audio('/assets/hbd.mp3');
    audio.play();

    setShowButton(false);
    setMusicPlayed(true);

    setTimeout(() => {
      setShowButton(true);
      setShowBannerAfterClick(true);
    }, 15000);
  };

  const handleBanner = () => {
    setShowButton(false);
    setShowBalloonsButton(true);

    if (showBannerAfterClick) {
      setShowBanner(true);
    }
  };

  const handleFlySingleBalloon = () => {
    setShowSingleBalloon(true);
    setShowTempButton(false);

    setTimeout(() => {
      setShowSingleBalloon(false);
      setShowRoamingBalloons(true);

      setRoamingBalloons([...Array(7)].map((_, index) => ({
        id: index,
        image: `/assets/b${index + 1}.png`,
        position: {
          left: `${Math.random() * 90 + 5}%`,
          bottom: `${Math.random() * 50 + 50}%`,
        },
      })));
    }, 5000);

    setTimeout(() => {
      setShowDeliciousCakeButton(true);
    }, 10000);
  };

  const handleDeliciousCake = () => {
    console.log("Showing Delicious Cake!");
    setShowDeliciousCakeButton(false);
    setShowIamGre(true);
    setCandleImage('/assets/cake.png');

    setTimeout(() => {
      setShowLightCandlesButton(true);
    }, 5000);
  };

  const handleLightCandle = () => {
    console.log("Light Up the Candles on Cake!");
    setShowLightCandlesButton(false);
    setShowIamGre(true);
    setCandleImage('/assets/cake1.png');

    setRoamingBalloons([...Array(7)].map((_, index) => ({
      id: index,
      image: `/assets/b${index + 1}.png`,
      position: {
        left: `${(index + 1) * 10}%`,
        bottom: '80%',
      },
    })));

    setShowMessageButton(true);
  };

  const handleShowMessage = () => {
    setIsShowingMessage(true);
    const messageInterval = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsShowingMessage(false);
        clearInterval(messageInterval);
        setShowMessageButton(true);
        setCurrentMessageIndex(0);
      }
    }, 1000);
  };

  return (
    <div className={`bulb-container ${showButton ? 'show-button' : ''}`}>
      {bulbImages.map((imageName, index) => (
        <LazyLoad key={index} height={100} offset={[-100, 100]} placeholder={<div className="bulb" />}>
          <img
            className={`bulb ${index === currentBulbIndex ? 'highlight' : ''}`}
            src={`assets/${index === currentBulbIndex ? 'bulb_white.png' : imageName}`}
            alt="Bulb"
          />
        </LazyLoad>
      ))}
      {showIamGre && (
        <div className="iamgre-container">
          <img className="iamgre-image" src={candleImage} alt="Iamgre" />
        </div>
      )}
      {showButton && !musicPlayed && (
        <div className="button-container">
          <button className="button" onClick={handleTurnOnMusic}>
            Turn On Music
          </button>
        </div>
      )}
      {showButton && musicPlayed && !showBanner && (
        <div className="button-container">
          <button className="button" onClick={handleBanner}>
            Let's Decorate
          </button>
        </div>
      )}
      {showBanner && (
        <div className="banner-container">
          <img className="banner" src="/assets/banner.png" alt="Banner" />
        </div>
      )}
      {showBalloonsButton && showTempButton && (
        <div className="button-container">
          <button className="button" onClick={handleFlySingleBalloon}>
            Let's Fly Balloons
          </button>
        </div>
      )}
      {showSingleBalloon && (
        <div className="balloon-container">
          <img className="single-balloon" src="/assets/Balloon-Border.png" alt="Single Balloon" />
        </div>
      )}
      {showRoamingBalloons && (
        <div className="balloon-container">
          {roamingBalloons.map((balloon) => (
            <img
              key={balloon.id}
              className="roaming-balloon"
              src={balloon.image}
              alt={`Roaming Balloon ${balloon.id}`}
              style={{ left: balloon.position.left, bottom: balloon.position.bottom }}
            />
          ))}
        </div>
      )}
      {showDeliciousCakeButton && (
        <div className="button-container">
          <button className="button" onClick={handleDeliciousCake}>
            Delicious Cake
          </button>
        </div>
      )}
      {showLightCandlesButton && (
        <div className="button-container">
          <button className="button" onClick={handleLightCandle}>
            Light Up Candles
          </button>
        </div>
      )}
      {showMessageButton && (
        <div className={`message-container ${isShowingMessage ? 'show-message' : ''}`}>
          {messages && messages.length > 0 && messages[currentMessageIndex] !== undefined &&
            messages[currentMessageIndex].split('\n').map((line, index) => (
              <p key={index} className="message-line">{line}</p>
          ))}
        </div>
      )}
      {showMessageButton && !isShowingMessage && (
        <div className="button-container">
          <button className="button" onClick={handleShowMessage}>
            Show Message
          </button>
        </div>
      )}
      {isShowingMessage && (
        <div className={`message-container ${isShowingMessage ? 'show-message' : ''}`}>
          {messages && messages.slice(0, currentMessageIndex).map((message, index) => (
            <p key={index} className="message-line">{message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BulbScreen;
