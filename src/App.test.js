import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Mock the window.location object
  delete window.location;
  window.location = {
    href: '',
  };
});

describe('App component', () => {
  it('renders the "Login to Spotify" button initially', () => {
    const { getByText } = render(<App />);
    const loginButton = getByText('Login to Spotify');
    expect(loginButton).toBeInTheDocument();
  });

  it('redirects to the Spotify authentication URL when the login button is clicked', () => {
    const { getByText } = render(<App />);
    const loginButton = getByText('Login to Spotify');
    fireEvent.click(loginButton);
  });

  it('handles successful authentication by setting the token', () => {
    // Simulate successful authentication by setting a mock token in the URL hash
    window.location.hash = '#access_token=mockAccessToken&token_type=Bearer';

    render(<App />);

    // Expect the component to render content for authenticated users
    const authenticatedContent = screen.getByText('You are logged in!');
    expect(authenticatedContent).toBeInTheDocument();

    // Expect the token state to be set correctly
    const token = localStorage.getItem('token');
    expect(token).toBe('mockAccessToken');
  });

  it('logs out and removes the token', () => {
    render(<App />);

    const logoutButton = screen.getByText('Log out');
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(screen.getByText('Login to Spotify')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user_id')).toBeNull();
  });
});
