import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import Search from './Search';

describe('ChatGPTSearch component', () => {
  it('renders ChatGPTSearch component', () => {
    render(<Search />);
    // Check if the component renders without any errors
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
  
  it('renders input field and handles user input', async () => {
    render(<Search />);
    fireEvent.change(screen.getByPlaceholderText("Eg: Metal songs for running"), { target: { value: 'Test query' } });

    // Wait for the component to update after the user input
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test query')).toBeInTheDocument();
    });
  });
});