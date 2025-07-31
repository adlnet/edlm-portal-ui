import { QueryClientWrapper } from '@/__mocks__/queryClientMock.js';
import {  render, screen } from '@testing-library/react';
import { useAuthenticatedUser, useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import InitialPage from '@/pages/edlm-portal/index';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mock auth, login and home pages
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/pages/edlm-portal/login', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid='login-page'>Login</div>;
});

jest.mock('@/pages/edlm-portal/learner/index', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid='home-page'>Home</div>;
});

describe('InitialPage', () => {
  
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
