import React from 'react';
import spotifyLogo from '../images/spotify_logo.png';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const loginurl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1998" ;

  return (
    <>
      <div className="LoginPage__page-container">
        <header className="LoginPage__page-container__header">
          <img src={spotifyLogo} alt="Logo" />
          <h1>RunnerPlaylister</h1>
        </header>

        <div className="LoginPage__main-container">
          <div className="LoginPage__content">
            <h2 className="LoginPage__welcome-text">Welcome to RunnerPlaylister</h2>
            <p className="LoginPage__subtitle">
              Get personalized running playlists based on your:
            </p>

            <div className="LoginPage__feature-card">
              <span className="LoginPage__feature-icon">🏃</span>
              <h3 className="LoginPage__feature-title">Running Pace</h3>
              <p className="LoginPage__feature-description">
                Automatically matched to your running speed
              </p>
            </div>

            <div className="LoginPage__feature-card">
              <span className="LoginPage__feature-icon">🎵</span>
              <h3 className="LoginPage__feature-title">Music Preferences</h3>
              <p className="LoginPage__feature-description">
                Curated from your Spotify favorites
              </p>
            </div>

            <div className="LoginPage__feature-card">
              <span className="LoginPage__feature-icon">🎧</span>
              <h3 className="LoginPage__feature-title">Personal Profile</h3>
              <p className="LoginPage__feature-description">
                Synced with your Spotify account
              </p>
            </div>

            <Link 
              className="LoginPage__login-button"
              to={loginurl}
            >
              Login with Spotify
            </Link>
          </div>
        </div>
      </div>

      <div id="LoginPage__footer">
        <p className="LoginPage__footer-text">
          © 2024 Ron Reshef & Idan Nir
        </p>
      </div>
    </>
  );
};

export default Login;