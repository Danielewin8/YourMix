import React from "react";
import "./NewPlaylist.css";

// The NewPlaylist function/component accepts a playlist, which is the collection of the data from our ChatGPT and Spotify requests from the Search component. It maps and iterates through the playlist, displaying the information in a table format.

function NewPlaylist({ playlist }) {
  return (
    <div className="playlist">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Album</th>
            <th>Duration</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {playlist.map((track, index) => (
            <tr key={index}>
              <td>{track.chatGPTResponse.id}</td>
              <td>
                {track.spotifyTrack.name} {/* Using Spotify track name */}
                <br />
                {track.spotifyTrack.artists[0].name} {/* Using the first artist's name */}
              </td>
              <td>{track.spotifyTrack.album.name}</td>
              <td>{track.chatGPTResponse.duration}</td>
              <td>
                {track.spotifyTrack.preview_url ? (
                  <audio controls>
                    <source src={track.spotifyTrack.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                ) : (
                  "Sorry! No preview available!"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewPlaylist;