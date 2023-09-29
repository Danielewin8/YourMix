import axios from 'axios';

// This function retrieves the Spotify user ID and stores the user ID in local storage.
// Will be important later for creating Spotify playlists.
const getUserId = async (access_token, setToken) => {
  try {
    // Make a GET request to Spotify with the access token in the headers
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    // Extract the response data
    const res = response.data;

    // Check for error
    if (res.error) {
      // Clear the access token, remove it from local storage, and return early
      setToken("");
      window.localStorage.removeItem("token");
      return;
    }

    // Store the user ID in local storage
    window.localStorage.setItem("user_id", res.id);
    console.log(response);
  } catch (error) {
    // Handle errors, e.g., network issues or invalid response format
    console.error('Error getting user ID:', error);
  }
};

export default getUserId;