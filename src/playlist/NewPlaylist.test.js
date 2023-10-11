import React from 'react';
import { render, screen } from '@testing-library/react';
import NewPlaylist from './NewPlaylist';

describe('NewPlaylist Component', () => {
  test('renders with playlist data', () => {
    // Mock playlist data
    const playlist = [
      { chatGPTResponse: { id: 1, duration: '3:30' }, spotifyTrack: { name: 'Song 1', artists: [{ name: 'Artist 1' }], album: { name: 'Album 1' }, preview_url: 'song1.mp3' } },
    ];

    render(<NewPlaylist playlist={playlist} />);

    // Check if the playlist data is rendered
    expect(screen.getByText(/Song 1/)).toBeInTheDocument();
    expect(screen.getByText(/Artist 1/)).toBeInTheDocument();
    expect(screen.getByText(/Album 1/)).toBeInTheDocument();
    expect(screen.getByText(/3:30/)).toBeInTheDocument();
  });
})