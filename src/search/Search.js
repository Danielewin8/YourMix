import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTSearch = () => {
    // State for input, number of songs, generated songs, loading state, completion state, and errors
    const [input, setInput] = useState("");
    const [length, setLength] = useState(10);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle loading state before making a playlist request
    const loadingPlaylist = () => {
        setLoading(true);
        setLoaded(false);
        setError(null);

        // Request prompt for making requests to ChatGPT
        const request = {
            temperature: 0,
            max_tokens: 3000,
            model: "gpt-3.5-turbo-instruct",
            prompt: `You are an assistant that only responds in JSON. Create a list of ${length} unique songs based off the following statement: "${input}". Include "id", "title", "artist", "album" in your response. If asked the same query more than once, be sure to return different results, and for each query, your first response should start with an id of 1. An example response is:
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

        console.log(`Request: ${request.prompt}`);

        // Make API request to ChatGPT using request prompt
        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: request,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`
            }
        })
            .then((res) => {
                // console.log("Request Prompt:", request.prompt);
                // console.log("Response Text:", res.data.choices[0].text);

                // Handle successful response
                if (res.status === 200) {
                    setLoaded(true);
                    setLoading(false);
                    const songs = JSON.parse(res.data.choices[0].text);
                    setSongs(songs);
                } else {
                    console.log(res.status);
                }
            })
            .catch((e) => {
                // Handle request error
                setLoading(false);
                setError("Oops! Something went wrong");
                console.error(e.message);
            });
    };

    return (
        <div>
            <p className='spotifyHeader'>Search</p>
            <div className='d-flex'>
                {/* Input field for user query */}
                <input
                    type='text'
                    className='w500 inputField'
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Eg: Metal songs for running"
                />
                {/* Range input for selecting the number of songs */}
                <input
                    type="range"
                    min="1"
                    max="30"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="inputField"
                />
                {/* Display the selected number of songs next to the range input */}
                <span>{length} songs</span>
            </div>
            <div>
                {/* Button to initiate playlist generation */}
                <button onClick={() => loadingPlaylist()}>Create</button>
                {/* Display loading and completion messages */}
                {loading ? <h3>Loading Playlist!</h3> : null}
                {loaded ? <h3>Playlist loaded!</h3> : null}
                {error ? <h3>{error}</h3> : null}
            </div>
        </div>
    );
};

export default ChatGPTSearch;
