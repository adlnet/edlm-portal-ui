'use strict';

import { render, screen } from '@testing-library/react';
import RootRedirect from '@/pages/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('RootRedirect component', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      replace: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to home (/edlm-portal)', () => {
    render(<RootRedirect />);
    expect(useRouter().replace).toHaveBeenCalledWith('/edlm-portal');
  });

  it('should display the message', () => {
    render(<RootRedirect />);
    expect(screen.getByText('Redirecting to EDLM Portal')).toBeInTheDocument();
  });
});