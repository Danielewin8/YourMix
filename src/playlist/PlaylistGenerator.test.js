import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PlaylistGenerator from './PlaylistGenerator';

jest.mock('axios');

describe('PlaylistGenerator Component', () => {
  test('renders the component', () => {
    render(<PlaylistGenerator spotifyTracks={[]} />);
    
    // You can add more specific assertions based on your component structure
    expect(screen.getByText('Add playlist to your Spotify?')).toBeInTheDocument();
  });

  test('creates playlist successfully', async () => {
    const mockResponse = {
      data: { id: 'mockPlaylistId' },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    render(<PlaylistGenerator spotifyTracks={[/* add mock track data here */]} />);

    // Simulate user input and click to create a playlist
    fireEvent.change(screen.getByPlaceholderText('Enter playlist name'), { target: { value: 'My Playlist' } });
    fireEvent.click(screen.getByText('Add Playlist'));

    // Wait for the asynchronous playlist creation process to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/playlists',
        expect.objectContaining({
          name: 'My Playlist',
        }),
        expect.any(Object)
      );
      expect(screen.getByText('Playlist created successfully!')).toBeInTheDocument();
    });
  });
});