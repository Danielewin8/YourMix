import React, { useState } from 'react';
import axios from 'axios';

const PlaylistGenerator = ({ spotifyTracks }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistCreated, setPlaylistCreated] = useState(false);

    const createPlaylist = async () => {
        try {
            // Grab our Spotify access token
            const spotifyAccessToken = window.localStorage.getItem("token");

            // Get the track URIs from the Spotify tracks
            const trackURIs = spotifyTracks.map((track) => track.spotifyTrack.uri);

            // Set up the request payload with the user-inputted playlist name
            const data = {
                name: playlistName,
                description: 'Your Playlist Description',
                public: true,
                collaborative: false,
            };

            // Make the POST request to create a playlist
            const response = await axios.post(
                'https://api.spotify.com/v1/me/playlists',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${spotifyAccessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Get the playlist ID from the response
            const playlistId = response.data.id;

            // Add tracks to the playlist
            await axios.post(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                { uris: trackURIs },
                {
                    headers: {
                        Authorization: `Bearer ${spotifyAccessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setPlaylistCreated(true);
        } catch (error) {
            console.error('Error creating playlist:', error.message);
        }
    };

    return (
        <div className='add-playlist'>
            <h5 className='playlist-query'>
                {playlistCreated ? 'Playlist created successfully!' : 'Add playlist to your Spotify?'}
            </h5>
            {/* Input field for the playlist name */}
            <input
                type="text"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />

            {/* Button to create a playlist */}
            <button onClick={createPlaylist}>Create Playlist</button>

            {/* Show a success message if the playlist was created */}
            {playlistCreated && <p>Playlist created successfully!</p>}
        </div>
    );
};

export default PlaylistGenerator;
