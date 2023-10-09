import React, { useState } from 'react';
import axios from 'axios';
import NewPlaylist from '../playlist/NewPlaylist';
import PlaylistGenerator from '../playlist/PlaylistGenerator';
import './Search.css';

const Search = () => {
  // State variables for input, number of songs, Spotify tracks, loading state, loaded state, and errors
  const [input, setInput] = useState("");
  const [length, setLength] = useState(10);
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle loading state before making a playlist request
  const loadingPlaylist = () => {
    setLoading(true);
    setLoaded(false);
    setError(null);

    // Check if the input is empty
    if (input.trim() === "") {
      setError("Input required!");
      return;
    }

    // Request prompt for making requests to ChatGPT
    const request = {
      temperature: 0,
      max_tokens: 3000,
      model: "gpt-3.5-turbo-instruct",
      prompt: `You are an assistant that only responds in JSON. Create a list of ${length} unique songs based off the following statement: "${input}". Include "id", "title", "artist", "album" in your response. If asked the same query more than once, be sure to return different results, and for each query, your first response should start with an id of 1. Make sure to include the duration/length as well. An example response is:
      [
          {
              "id": 1,
              "title": "Stairway to Heaven",
              "artist": "Led Zeppelin",
              "album": "Led Zeppelin IV",
              "duration": "7:55"
          }
      ]`
    };

    // Make API request to ChatGPT using user request prompt
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: request,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`
      }
    })
      .then(async (res) => {
        // Handle successful response
        if (res.status === 200) {
          const chatGPTResponses = JSON.parse(res.data.choices[0].text);

          // Retrieve access token, and create empty array for our Spotify tracks
          const spotifyAccessToken = window.localStorage.getItem("token");
          const spotifyTracks = [];

          // Iterate through each ChatGPT response
          for (const chatGPTResponse of chatGPTResponses) {
            const { title, artist } = chatGPTResponse;

            // Construct Spotify search query
            const spotifySearchQuery = `${title} ${artist}`;

            try {
              // Make a Spotify API request
              const spotifyApiResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(spotifySearchQuery)}&type=track`, {
                headers: {
                  Authorization: `Bearer ${spotifyAccessToken}`
                }
              });

              // Extract relevant information from the Spotify API response, else setError state
              if (spotifyApiResponse.data.tracks.items.length > 0) {
                const spotifyTrack = spotifyApiResponse.data.tracks.items[0];
                spotifyTracks.push({
                  chatGPTResponse,
                  spotifyTrack
                });
              } else {
                setError(`No tracks found for query: ${spotifySearchQuery}`);
              }
            } catch (error) {
                setError(`User login expired, please log out and back in: ${error.message}`);
            }
          }

          // Update state with Spotify track data
          setSpotifyTracks(spotifyTracks);
          setLoaded(true);
          setLoading(false);
          setLength(10);
          setInput("");
        } else {
          console.log(res.status);
        }
      })
      .catch((e) => {
        // Handle request error
        setLoading(false);
        setLength(10);
        setError("Oops! Something went wrong");
        console.error(e.message);
      });
  };

  return (
    <div className='inputs'>
      {/* Input fields for user query, and range field for number of songs */}
      <p className='spotifyHeader'>Search</p>
      <div className='d-flex'>
        <input
          className='search-bar'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Eg: Metal songs for running"
        />
        <input
          className='range'
          type="range"
          min="1"
          max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <span className='range-text'>{length} songs</span>
      </div>
      <div>
        {/* Button to initiate playlist generation */}
        <button className='search-button' onClick={() => loadingPlaylist()}>Create</button>
        {/* Display loading spinner, playlist, or error message based on state */}
        {loading && !error ? (
          <div className="loading-container">
            <h5>Loading Playlist...</h5>
            <div className="spinner"></div>
          </div>
        ) : null}
        {loaded ? <NewPlaylist playlist={spotifyTracks} /> : null}
        {error ? <h5 className='error-message'>{error}</h5> : null}
        {loaded && <PlaylistGenerator spotifyTracks={spotifyTracks} />}
      </div>
    </div>
  );
};

export default Search;