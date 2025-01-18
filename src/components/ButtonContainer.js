import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Loader from './Loader';


const ButtonContainer = ({userDetails}) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleGenerate = async() => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch(`${apiUrl}/generate-playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
      });
      if (response.ok) {
        const data = await response.json();
        setResult('✔');
      } else {
        const errorData = await response.json();
        setResult('❌');
      }
    } catch (error) {
      console.error("Error occured while connecting to the Flask server:", error);
      setResult('❌');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="MainPage__buttons-container">
      <button
        className="MainPage__buttons-container__playlist-button"
        onClick={() => navigate('/playlists')} // Navigate to PlaylistTable
      >
        Your Playlists
      </button>

      {/* Centered loader and result */}
      <div className="MainPage__buttons-container__center">
        {/* Display the loader */}
        {isLoading && <Loader />}

        {/* Display result (V or X) */}
        {result && <div className="result">{result}</div>}
      </div>

      <button className="MainPage__buttons-container__generate-button" onClick={handleGenerate}>Generate New Playlists</button>
    </div>
  );
};

export default ButtonContainer;
