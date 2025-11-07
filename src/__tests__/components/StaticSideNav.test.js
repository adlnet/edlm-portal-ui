import { fireEvent, render, screen} from '@testing-library/react';
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
    expect(getByText('Learning Plans')).toBeInTheDocument();
    expect(getByText('Collections')).toBeInTheDocument();
    expect(getByText('Additional Resources')).toBeInTheDocument();
    expect(getByText('Help')).toBeInTheDocument();
  });

  it('should nav to the right path when a nav button is clicked', () => {
    const { getByText } = render(<StaticSideNav />);

    fireEvent.click(getByText('Search'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/search' });

    fireEvent.click(getByText('Learning Plans'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/learningPlan' });
  });

  it('should highlight the active path', () => {
    mockRouter.setCurrentUrl('/edlm-portal/learner/search');
    const { getByText } = render(<StaticSideNav />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toHaveClass('bg-blue-50');
    
    const homeButton = getByText('Home');
    expect(homeButton).not.toHaveClass('bg-blue-50');
  });

  it('should toggle the Collections dropdown', () => {
    const { getByText, queryByText } = render(<StaticSideNav />);
      
    // Closed by default
    expect(queryByText('My Collections')).not.toBeInTheDocument();

    fireEvent.click(getByText('Collections'));
    expect(getByText('My Collections')).toBeInTheDocument();
    
    fireEvent.click(getByText('Collections'));
    expect(queryByText('My Collections')).not.toBeInTheDocument();
  });

  it('should navigate when dropdown buttons are clicked', () => {
    const { getByText } = render(<StaticSideNav />);

    fireEvent.click(getByText('Collections'));
    fireEvent.click(getByText('My Collections'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/owned' });
    
    fireEvent.click(getByText('My Subscriptions'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/subscribed' });
  });

  it('should navigate when press keyboard', () => {
    const { getByText } = render(<StaticSideNav />);
    
    fireEvent.click(getByText('Collections'));
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
