import { QueryClientWrapper } from '@/__mocks__/queryClientMock.js';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthenticatedUser, useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import Home from '@/pages/learner/index';
import InitialPage from '@/pages/index';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';
import xAPIMapper from "@/utils/xapi/xAPIMapper";

jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mock auth, login and home pages
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/pages/login', () => {
  return () => <div data-testid='login-page'>Login</div>;
});

jest.mock('@/pages/learner/index', () => {
  return () => <div data-testid='home-page'>Home</div>;
});

describe('IntialPage', () => {
  it('should render login page when user is not authenticated', () => {
    useUnauthenticatedUser();
    render(
      <QueryClientWrapper>
        <InitialPage />
      </QueryClientWrapper>
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
  });
  
  it('should render home page when user is authenticated', () => {
    useAuthenticatedUser();
    render(
      <QueryClientWrapper>
        <InitialPage />
      </QueryClientWrapper>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });
});
