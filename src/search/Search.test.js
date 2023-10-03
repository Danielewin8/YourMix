import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ChatGPTSearch from './Search';

describe('ChatGPTSearch component', () => {
  it('renders ChatGPTSearch component', () => {
    render(<ChatGPTSearch />);
    // Check if the component renders without any errors
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
  
  it('renders input field and handles user input', async () => {
    render(<ChatGPTSearch />);
    fireEvent.change(screen.getByPlaceholderText("Eg: Metal songs for running"), { target: { value: 'Test query' } });

    // Wait for the component to update after the user input
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test query')).toBeInTheDocument();
    });
  });

  it('handles loading state and shows "Loading Playlist!" message', async () => {
    render(<ChatGPTSearch />);
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByText("Loading Playlist!")).toBeInTheDocument();
  });
});