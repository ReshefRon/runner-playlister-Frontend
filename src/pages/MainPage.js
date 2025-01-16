import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import GeneralInfo from '../components/GeneralInfo';
import PhysicalInfo from '../components/PhysicalInfo';
import RunningInfo from '../components/RunningInfo';
import ButtonContainer from '../components/ButtonContainer';
import BgImage from '../components/BgImage';
import spotifyLogo from '../images/spotify_logo.png';
import bg_image from '../images/img1.jpg';

const KM_DICTIONARY = {
  450: 130,
  428: 135,
  409: 140,
  391: 145,
  373: 150,
  354: 155,
  337: 160,
  317: 165,
  298: 170,
  279: 175,
  261: 180,
  242: 185,
  224: 190,
  205: 195,
  187: 200
};

const MainPage = () => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    distance: '',
    time: '',
    pace: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };
      if (name === 'distance' || name === 'time') {
        const newPace = calculatePace(updatedDetails.distance, updatedDetails.time);
        updatedDetails.pace = newPace; 
      }
      return updatedDetails;
    });
  };

  const calculateBMI = () => {
    if (userDetails.weight && userDetails.height) {
      const heightInMeters = userDetails.height / 100;
      return (userDetails.weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return '';
  };

  const calculatePace = (distance, time) => {
    if (distance && time) {
      const timeInSeconds = parseInt(time) * 60; // Convert time from minutes to seconds
      const secondsPerKm = timeInSeconds / parseFloat(distance); // Calculate seconds per kilometer

      let closestDiff = Infinity;
      let closestPace = 0;

      // Find the closest pace based on the dictionary
      for (let key in KM_DICTIONARY) {
        const keySeconds = parseFloat(key);
        const diff = Math.abs(secondsPerKm - keySeconds);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestPace = KM_DICTIONARY[keySeconds];
        }
      }

      return closestPace;
    }
    return '';
  };

  // Recalculate pace whenever distance or time changes
  useEffect(() => {
    if (userDetails.distance && userDetails.time) {
      const newPace = calculatePace(userDetails.distance, userDetails.time);
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        pace: newPace, 
      }));
    }
  }, [userDetails.distance, userDetails.time]);

  return (
    <>
    <div className="MainPage__page-container">

      <header className="MainPage__page-container__header">
        <img src={spotifyLogo} alt="Logo" />
        <h1>RunnerPlaylister</h1>
    </header>

    <div className="MainPage__main-container">
      <div className="MainPage__main-container__left-side">
        <GeneralInfo
        userName={userDetails.userName}
          age={userDetails.age}
          gender={userDetails.gender}
          handleChange={handleChange}
        />

        <PhysicalInfo 
          weight={userDetails.weight}
          height={userDetails.height}
          bmi={calculateBMI()}
          handleChange={handleChange}
        />

        <RunningInfo 
          distance={userDetails.distance}
          time={userDetails.time}
          pace={userDetails.pace}
          handleChange={handleChange}
        />
        
        
      </div>
      <div className="MainPage__main-container__right-side">
        <BgImage 
          src={bg_image}
          alt="runners image"
          width="750px"
          height="750px"
          />
      </div>
    </div>

    <div className="MainPage__buttons-container">
  <ButtonContainer userDetails={userDetails} />
</div>


    </div>
    
    <div id="MainPage__footer">
    <p className="MainPage__footer-text">
       © 2024 Ron Reshef & Idan Nir
      </p>
    </div>
    </>
  );
}
export default MainPage;