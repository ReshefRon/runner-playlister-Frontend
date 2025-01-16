

import React, { useState } from 'react';

const ArtistsList = ({ artists, setUserDetails }) => {
  const [artist, setArtist] = useState('');

  const addArtist = () => {
    if (artist.trim()) {
      setUserDetails({
        artists: [...artists, artist]
      });
      setArtist('');
    }
  };

  const removeArtist = (artistToRemove) => {
    setUserDetails({
      artists: artists.filter((a) => a !== artistToRemove)
    });
  };

  return (
    <div className="ArtistsList__artists-list">
      <div className="ArtistsList__main-div">
        <label>Your Favourite Artists:</label>
        <div className="ArtistsList__main-div__artists_input">
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
          />
          <button onClick={addArtist}>Add</button>
        </div>
        <ul className="ArtistsList__main-div__selected-artists">
          {artists.map((a, index) => (
            <li key={index}>
              {a}
              <button onClick={() => removeArtist(a)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistsList;
