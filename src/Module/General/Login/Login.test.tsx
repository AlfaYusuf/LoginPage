beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated method
      removeListener: jest.fn(), // Deprecated method
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { FetchLoginData } from '../../../common/services/Axios';

jest.mock('../../../common/services/Axios', () => ({
  FetchLoginData: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe('Login Component Tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders login component correctly', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SIGN-IN')).toBeInTheDocument();
  });

  test('validates empty email and password fields', async () => {
    fireEvent.click(screen.getByText('SIGN-IN'));

    await waitFor(() => {
      expect(screen.getByText('Please enter Email')).toBeInTheDocument();
      expect(screen.getByText('Please enter password')).toBeInTheDocument();
    });
  });

  test('validates empty password field', async () => {
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'Lyju.cheriyapuliyangod@schindler.com' },
    });

    fireEvent.click(screen.getByText('SIGN-IN'));

    await waitFor(() => {
      expect(screen.getByText('Please enter password')).toBeInTheDocument();
    });
  });

  test('shows error for invalid credentials', async () => {
    (FetchLoginData as jest.Mock).mockRejectedValue({
      response: { status: 401 },
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('SIGN-IN'));

    await waitFor(() => {
      expect(
        screen.getByText('Invalid credentials. Please check your username and password.')
      ).toBeInTheDocument();
    });
  });

  test('handles successful login with valid credentials', async () => {
    const mockResponse = {
      data: {
        tokens: { access: { token: 'mock-access-token' }, refresh: { token: 'mock-refresh-token' } },
      },
    };

    (FetchLoginData as jest.Mock).mockResolvedValue(mockResponse);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'Lyju.cheriyapuliyangod@schindler.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Testing@54' },
    });

    fireEvent.click(screen.getByText('SIGN-IN'));

    await waitFor(() => {
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });

    expect(sessionStorage.getItem('authToken')).toBe('mock-access-token');
  });

  test('handles service failure', async () => {
    (FetchLoginData as jest.Mock).mockRejectedValue(new Error('Service Not Working'));

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'Lyju.cheriyapuliyangod@schindler.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Testing@54' },
    });

    fireEvent.click(screen.getByText('SIGN-IN'));

    await waitFor(() => {
      expect(screen.getByText('Service Not Working')).toBeInTheDocument();
    });
  });
});
