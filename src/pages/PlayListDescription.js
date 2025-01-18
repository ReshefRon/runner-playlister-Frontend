import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import '../styles/PlayListDescription.css';
import spotifyLogo from '../images/spotify_logo.png';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PlayListDescription = () => {
  const location = useLocation();
  //const playlistId = location.state?.playlistId;
  //const playlistName = location.state?.name;
  const { playlist_id: playlistId, name: playlistName } = location.state || {};
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchTracks = async () => {
    try {
      const response = await fetch(`${apiUrl}/get_playlists_tracks`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          playlist_id : playlistId
        })
        });
      if (response.ok) {
        const data = await response.json();
        setTracks(data.tracks);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [playlistId]);

  const handleDeleteTrack = async (trackId,playlistId) => {
    try {
      const response = await fetch(`${apiUrl}/remove_track?track_id=${trackId}&playlist_id=${playlistId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trackId,
          playlistId  // This is already available from useParams
        })
      });
      if (response.ok) {
        fetchTracks();
      }
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  return (
    <>
      <header className="PlayListDescription__header">
        <img src={spotifyLogo} alt="Logo" />
        <h1>RunnerPlaylister</h1>
      </header>

    <h3 id='playlist_desc_title'> {playlistName}'s tracks: </h3>

    <div className="PlayListDescription__main-container">
    <div className="PlayListDescription__playlist-table-container">
        <table className="PlayListDescription__playlist-table-container__playlist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Duration (Minutes)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr key={track[1]}>
                <td>{track[1]}</td>
                <td>{track[2]}</td>
                <td>{formatDuration(track[3])}</td>
                <td>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteTrack(track[0],playlistId)}
                    title="Delete Playlist"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons for navigation */}
      <div className="PlayListDescription__nav-buttons">
        <button
          className="PlayListDescription__back-to-main-btn"
          onClick={() => navigate('/main')} // Navigate to MainPage
          title="Back to Main Window"
        >
          <FaArrowAltCircleLeft style={{ color: 'white', fontSize: '24px' }} />
        </button>
        <button
          className="PlayListDescription__back-to-playlists-btn"
          onClick={() => navigate('/playlists')} // Navigate to PlaylistTable
          title="Back to Playlists"
        >
          <FaArrowAltCircleRight style={{ color: 'white', fontSize: '24px' }} />
        </button>
      </div>

      {/* Footer with your name */}
      <div id="PlayListDescription__footer">
    <p className="PlayListDescription__footer-text">
       © 2024 Ron Reshef & Idan Nir
      </p>
    </div>
    </div>
      
    </>
  );
};

export default PlayListDescription;
