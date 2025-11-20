import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import { useUiConfig } from '@/hooks/useUiConfig';
import Header from '@/components/Header';
import React from 'react';
import mockRouter from 'next-router-mock';

//mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@/hooks/useUiConfig', () => ({
  useUiConfig: jest.fn(),
}));

function renderWithQueryClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
  };
});

beforeEach(() => {
  mockRouter.setCurrentUrl('/edlm-portal');
  jest.resetAllMocks();

  // Default mock for uiConfig
  useUiConfig.mockImplementation(() => ({
    data: { portal_name: 'My Portal', logo: '/fake-logo.png' },
    isLoading: false,
  }));
});

describe('Header', () => {
  describe('without user', () => {
    beforeEach(() => {
      useAuth.mockImplementation(() => ({
        user: null,
      }));
    });

    it('shows sign in', () => {
      const { getByText } = renderWithQueryClient(<Header />);
      expect(getByText(/sign in/i)).toBeInTheDocument();
    });

    it('shows sign up', () => {
      const { getByText } = renderWithQueryClient(<Header />);
      expect(getByText(/sign up/i)).toBeInTheDocument();
    });

    it('shows home navigator', () => {
      const { getByTitle } = renderWithQueryClient(<Header />);
      expect(getByTitle(/home/i)).toBeInTheDocument();
    });
  });

  describe('with user', () => {
    beforeEach(() => {
      useAuth.mockImplementation(() => ({
        user: { first_name: 'Test' },
      }));
    });

    it('shows user menu button', () => {
      const { getByText } = renderWithQueryClient(<Header />);
      expect(getByText('My Portal')).toBeInTheDocument();
    });
  });
});