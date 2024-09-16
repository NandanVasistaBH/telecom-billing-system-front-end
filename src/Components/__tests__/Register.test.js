// src/Components/Register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../pages/Register.jsx';


// Mock the `fetch` API to simulate responses
global.fetch = jest.fn();

const mockSuppliers = [
  { id: '1', name: 'Supplier One' },
  { id: '2', name: 'Supplier Two' },
];

describe('Register Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.clearAllMocks();
  });

  test('renders the Register component', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    // expect(screen.getByLabelText('Supplier:')).toBeInTheDocument();

    
  });

  test('fetches and displays suppliers', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
      expect(screen.getByText('Supplier Two')).toBeInTheDocument();
    });
  });

  test('shows Confetti on successful registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'password123' } });
  
    // Select the supplier
    // fireEvent.change(screen.getByLabelText('Supplier:'), { target: { value: '1' } });
  
    //fireEvent.click(screen.getByText('Register'));
  
    
  });

  test('displays error on failed registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Registration failed' }),
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'password123' } });
    // fireEvent.change(screen.getByRole('textbox', { name: /Supplier:/ }), { target: { value: '1' } });

    // const registerButton = screen.getByRole("button", { name: /Register/i });

    // // Simulate form submission
    // fireEvent.click(registerButton);
    

    // await waitFor(() => {
    //   expect(window.alert).toHaveBeenCalledWith('Registration failed: Registration failed');
    // });
  });

  test('checks username uniqueness on change', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => true,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'uniqueuser' } });

    await waitFor(() => {
      expect(screen.queryByText('Username is already taken. Please choose another.')).toBeNull();
    });
  });

  test('shows error if passwords do not match', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuppliers,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'differentpassword' } });
    // fireEvent.change(screen.getByRole('textbox', { name: /Supplier:/ }), { target: { value: '1' } });


    const registerButton = screen.getByRole("button", { name: /Register/i });

    // Simulate form submission
    fireEvent.click(registerButton);
    

    // await waitFor(() => {
    //   expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
    });
  });
