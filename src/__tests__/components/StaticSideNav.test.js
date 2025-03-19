import { fireEvent, render } from '@testing-library/react';
import StaticSideNav from '@/components/StaticSideNav';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('StaticSideNav', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('should render correctly', () => {
    const { getByText } = render(<StaticSideNav />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Learning Plan')).toBeInTheDocument();
    expect(getByText('Learning Summary')).toBeInTheDocument();
    expect(getByText('Collections')).toBeInTheDocument();
    expect(getByText('Additional Resources')).toBeInTheDocument();
    expect(getByText('Help')).toBeInTheDocument();
  });

  it('should nav to the right path when a nav button is clicked', () => {
    const { getByText } = render(<StaticSideNav />);

    fireEvent.click(getByText('Search'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/search' });

    fireEvent.click(getByText('Learning Plan'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/learningPlan' });
  });

  it('should show the dropdown when the dropdown button is clicked', () => {
    const { getByText, queryByText } = render(<StaticSideNav />);

    fireEvent.click(getByText('Learning Summary'));
    expect(getByText('My Learning Summary')).toBeInTheDocument();
    expect(getByText("Leader's Report")).toBeInTheDocument();
    fireEvent.click(getByText('Collections'));
    expect(getByText('My Collections')).toBeInTheDocument();
    expect(getByText('My Subscriptions')).toBeInTheDocument();
    expect(getByText('Saved Searches')).toBeInTheDocument();
  });
});
