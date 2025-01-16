import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage'; 
import PlaylistTable from './pages/PlaylistTable'; 
import PlayListDescription from './pages/PlayListDescription';

const App = () => {
  return (
    <Router>
       <Routes>
        {/* Set login as the default route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/playlists" element={<PlaylistTable />} />
        <Route path="/playlist_tracks" element={<PlayListDescription />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

