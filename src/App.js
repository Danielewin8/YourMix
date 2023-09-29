import React, { useState, useEffect } from 'react';
import getUserId from './api/spotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  // State to store the access token
  const [token, setToken] = useState('');
  // State to store the loading state
  const [loading, setLoading] = useState(true);


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
    getUserId(token, setToken);

    // Update loading state
    setLoading(false);
  }, []);

  const logout = () => {
    setToken("");
    clearExistingTokens();
    window.localStorage.removeItem("user_id");
  }

  // Check if valid token is present, and adjust return accordingly
  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <div className='loader'>Loading...</div>
        ) : (
          <React.Fragment>
            <h1>
              <FontAwesomeIcon icon={faSpotify} /> YourMix
            </h1>
            {token ? (
              <div>
                <h2>You are logged in!</h2>
                <button className='logout-button' onClick={logout}>Log out</button>
              </div>
            ) : (
              <button className="login-button" onClick={handleSpotifyAuthClick}>
                Login to Spotify
              </button>
            )}
          </React.Fragment>
        )}
      </header>
    </div>
  );

}

export default App;