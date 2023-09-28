import React from 'react';
import axios from 'axios';

// This function retrieves the Spotify user ID and stores the user ID in local storage. Which will be used later for creating Spotfiy playlists.
const getUserId = async (access_token, setToken) => {
    // Send a GET request to Spotify's /v1/me endpoint with the access token in the headers
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });

    // Parse the response as JSON
    const res = await response.json();

    // Check if there's an error in the response
    if (res.error) {
        // Clear the access token, remove it from local storage, and return early
        setToken("");
        window.localStorage.removeItem("token");
        return;
    }

    // Store the user ID in local storage
    window.localStorage.setItem("user_id", res.id);
    console.log(response);
};

export default getUserId;

