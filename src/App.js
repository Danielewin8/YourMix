import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the access token
  const [token, setToken] = useState('');

  // Variables for Spotify authentication
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:3000';
  const SCOPES = ['playlist-modify-public'];
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';

  // Function to clear existing tokens
  const clearExistingTokens = () => {
    window.location.hash = '';
    window.localStorage.removeItem('token');
  };

  // Function to initiate Spotify authentication
  const handleSpotifyAuthClick = () => {
    // Clear existing tokens before initiating a new login
    clearExistingTokens();

    // Construct the Spotify authentication URL and redirect
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  // UseEffect to check for access token in URL and local storage
  useEffect(() => {
    // Check the URL hash for an access token
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    
    if (!token && hash) {
      // Extract and set the token from the URL hash
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    // Set the token state
    setToken(token);
  }, []);

  return (
    // Check if valid token is present, and adjust return accordingly
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {token ? (
          <h2>You are logged in!</h2>
        ) : (
          <a onClick={handleSpotifyAuthClick} href="#/">Login to Spotify</a>
        )}
      </header>
    </div>
  );
}

export default App;