import React from "react";
import './Playlist.css';

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
                    </tr>
                </thead>
                <tbody>
                    {playlist.map((song, index) => {
                        return <tr key={index}>
                            <td>{song.id}</td>
                            <td>{song.title}<br />{song.artist}</td>
                            <td>{song.album}</td>
                            <td>{song.duration}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default NewPlaylist;