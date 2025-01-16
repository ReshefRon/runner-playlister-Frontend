import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaArrowAltCircleLeft } from 'react-icons/fa';
import '../styles/PlaylistTable.css';
import spotifyLogo from '../images/spotify_logo.png';

// Helper function to format the date in DD/MM/YYYY HH:MM:SS
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};


const PlaylistTable = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const playlistsResponse = await fetch(`http://localhost:1998/get_playlists_data`);
        if (playlistsResponse.ok) {
          const data = await playlistsResponse.json();
          setPlaylists(data.playlists);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useEffect(() => {
      fetchPlaylists();
    }, []);

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:1998/remove_playlist?id=${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchPlaylists();
        }
      } catch (error) {
        console.error('Error deleting playlist:', error);
      }
    };

    const handleShow = (id,name) => {
      navigate(`/playlist_tracks?playlist_id=${id}&name=${name}`);
    };


  return (
    <>
      <header className="PlaylistTable__header">
        <img src={spotifyLogo} alt="Logo" />
        <h1>RunnerPlaylister</h1>
      </header>
      {/* Back button outside of the container */}
      <button
        className="PlaylistTable__back-to-main-btn"
        title="Back to Main Window"
        onClick={() => navigate('/main')} // Navigate to MainPage
      >
        <FaArrowAltCircleLeft style={{ color: 'white', fontSize: '24px' }} />
      </button>

      <h3 id="playlist_table_title"> Your Playlists:</h3>


      <div className="PlaylistTable__playlist-table-container">
        <table className="PlaylistTable__playlist-table-container__playlist-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Duration (Minutes)</th>
              <th>Created Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist) => (
              <tr key={playlist[0]}>
                <td>{playlist[0]}</td>
                <td>{playlist[1]}</td>
                <td>{formatDuration(playlist[2])}</td>
                <td>{formatDate(playlist[3])}</td> {/* Format the date */}
                <td>
                  <button
                    className="PlaylistTable__action-button delete-button"
                    onClick={() => handleDelete(playlist[0])}
                    title="Delete Playlist"
                  >
                    🗑️
                  </button>
                  <button
                    className="PlaylistTable__action-button show-button"
                    onClick={() => handleShow(playlist[0],playlist[1])}
                    title="Show Playlist"
                  >
                    <FaEye style={{ color: 'white' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer with your name */}
      <div id="PlaylistTable__footer">
    <p className="PlaylistTable__footer-text">
       © 2024 Ron Reshef & Idan Nir
      </p>
    </div>
    </>
  );
};
export default PlaylistTable;
