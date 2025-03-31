import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useMockConfig,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import Login from '@/pages/edlm-portal/login';
import MockAxios from 'jest-mock-axios';
import React from 'react';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';

beforeEach(() => {
  mockRouter.setCurrentUrl('/edlm-portal/login');
  useMockConfig();
});

const renderer = () => {
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Login />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Login Page', () => {
  it("should navigate user to '/edlm-portal' if user is authenticated", () => {
    useAuthenticatedUser();
    const screen = renderer();

    expect(singletonRouter).toMatchObject({
      asPath: '/edlm-portal',
    });
  });

  it('should render the component if unauthenticated', () => {
    useUnauthenticatedUser();
    const screen = renderer();

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('should show invalid credentials message.', () => {
    MockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { user: {} } })
    );

    useUnauthenticatedUser();
    const screen = renderer();

    const email = screen.getByPlaceholderText(/email/i);
    act(() => {
      fireEvent.change(email, { target: { value: 'email@test.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    });

    const button = screen.getByText(/Login/i);
    act(() => {
      fireEvent.click(button);
    });
    expect(MockAxios.post).toHaveBeenCalled();
  });
});

describe('Login Page', () => {
  describe('Actions', () => {
    beforeEach(() => {
      useUnauthenticatedUser();
      render(
        <MemoryRouterProvider>
          <QueryClientWrapper>
            <Login />
          </QueryClientWrapper>
        </MemoryRouterProvider>
      );
    });

    it('should change values on input: Email', () => {
      const input = screen.getByPlaceholderText('Email');

      act(() => {
        fireEvent.change(input, { target: { value: 'email' } });
      });

      expect(input.value).toBe('email');
    });

    it('should change values on input: Password', () => {
      const input = screen.getByPlaceholderText('Password');

      act(() => {
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
      });

      expect(input.value).toBe('password');
    });

    it('should change show error message for empty attributes', () => {
      const input = screen.getByPlaceholderText('Password');
      act(() => {
        fireEvent.change(input, { target: { value: '' } });

        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });

      expect(screen.getByText(/All fields required/i)).toBeInTheDocument();
    });

    it('should log a user in.', () => {
      MockAxios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: {} } })
      );

      act(() => {
        const email = screen.getByPlaceholderText('Email');

        fireEvent.change(email, { target: { value: 'email@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        const button = screen.getByText(/Login/i);

        fireEvent.click(button);
      });
      expect(MockAxios.post).toHaveBeenCalled();
    });
    it('should call the login api', async () => {
      MockAxios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: {} } })
      );

      const email = screen.getByPlaceholderText('Email');
      act(() => {
        fireEvent.change(email, { target: { value: 'email@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });
      expect(MockAxios.post).toHaveBeenCalled();
    });
    
  });
});
