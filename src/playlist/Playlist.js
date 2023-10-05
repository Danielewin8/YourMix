import React from "react";
import "./Playlist.css";

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
                {track.chatGPTResponse.title}
                <br />
                {track.chatGPTResponse.artist}
              </td>
              <td>{track.chatGPTResponse.album}</td>
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