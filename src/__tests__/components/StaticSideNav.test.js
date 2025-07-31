import { fireEvent, render } from '@testing-library/react';
import StaticSideNav from '@/components/StaticSideNav';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('StaticSideNav', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
    jest.clearAllMocks();
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

  it('should highlight the active path', () => {
    mockRouter.setCurrentUrl('/edlm-portal/learner/search');
    const { getByText } = render(<StaticSideNav />);
    
    const searchButton = getByText('Search').closest('[role="button"]');
    expect(searchButton).toHaveClass('bg-[#f4f3f6]');
    
    const homeButton = getByText('Home').closest('[role="button"]');
    expect(homeButton).not.toHaveClass('bg-[#f4f3f6]');
  });

  it('should toggle the Learning Summary dropdown', () => {
    const { getByText, queryByText } = render(<StaticSideNav />);
    
    // Open by default
    expect(getByText('My Learning Summary')).toBeInTheDocument();
    
    fireEvent.click(getByText('Learning Summary'));
    expect(queryByText('My Learning Summary')).not.toBeInTheDocument();
    
    fireEvent.click(getByText('Learning Summary'));
    expect(getByText('My Learning Summary')).toBeInTheDocument();
  });

  it('should toggle the Collections dropdown', () => {
    const { getByText, queryByText } = render(<StaticSideNav />);
      
    // Open by default
    expect(getByText('My Collections')).toBeInTheDocument();

    fireEvent.click(getByText('Collections'));
    expect(queryByText('My Collections')).not.toBeInTheDocument();
    
    fireEvent.click(getByText('Collections'));
    expect(getByText('My Collections')).toBeInTheDocument();
  });

  it('should navigate when dropdown buttons are clicked', () => {
    const { getByText } = render(<StaticSideNav />);
    
    fireEvent.click(getByText('My Collections'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/owned' });
    
    fireEvent.click(getByText('My Subscriptions'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/subscribed' });
  });

  it('should navigate when press keyboard', () => {
    const { getByText } = render(<StaticSideNav />);
    
    const myCollectionsBtn = getByText('My Collections').closest('[role="button"]');

    fireEvent.keyDown(myCollectionsBtn, { key: 'Enter' });

    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/owned' });
  });

  it('should not navigate when clicking on future incomplete buttons', () => {
    const { getByText } = render(<StaticSideNav />);
    
    const initialPath = mockRouter.asPath;
    
    fireEvent.click(getByText('Additional Resources'));
    
    expect(mockRouter.asPath).toBe(initialPath);
    
    fireEvent.click(getByText('Help'));
    
    expect(mockRouter.asPath).toBe(initialPath);
  });
});
