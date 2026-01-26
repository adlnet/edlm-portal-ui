import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen} from '@testing-library/react';
import { useBackendConfig } from '@/hooks/useBackendConfig';
import StaticSideNav from '@/components/StaticSideNav';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('@/hooks/useBackendConfig', () => ({
  useBackendConfig: jest.fn(),
}));

function renderWithQueryClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
describe('StaticSideNav', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/'); // reset route for every test
    jest.clearAllMocks();
    
    // Default backendConfig returns isManager:false, not loading
    useBackendConfig.mockReturnValue({
      data: [{ manager: false }],
      isLoading: false,
    });
  });

  it('should render correctly', () => {
    const { getByText } = renderWithQueryClient(<StaticSideNav />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Learning Plans')).toBeInTheDocument();
    expect(getByText('Collections')).toBeInTheDocument();
    expect(getByText('Additional Resources')).toBeInTheDocument();
    expect(getByText('Help')).toBeInTheDocument();
  });

  it('should nav to the right path when a nav button is clicked', () => {
    const { getByText } = renderWithQueryClient(<StaticSideNav />);

    fireEvent.click(getByText('Search'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/search' });

    fireEvent.click(getByText('Learning Plans'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/learningPlan' });
  });

  it('should highlight the active path', () => {
    mockRouter.setCurrentUrl('/edlm-portal/learner/search');
    const { getByText } = renderWithQueryClient(<StaticSideNav />);

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toHaveClass('bg-blue-50');

    const homeButton = getByText('Home');
    expect(homeButton).not.toHaveClass('bg-blue-50');
  });

  it('should toggle the Collections dropdown', () => {
    const { getByText, queryByText } = renderWithQueryClient(<StaticSideNav />);

    // Closed by default
    expect(queryByText('My Collections')).not.toBeInTheDocument();

    fireEvent.click(getByText('Collections'));
    expect(getByText('My Collections')).toBeInTheDocument();

    fireEvent.click(getByText('Collections'));
    expect(queryByText('My Collections')).not.toBeInTheDocument();
  });

  it('should navigate when dropdown buttons are clicked', () => {
    const { getByText } = renderWithQueryClient(<StaticSideNav />);

    fireEvent.click(getByText('Collections'));
    fireEvent.click(getByText('My Collections'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/owned' });

    fireEvent.click(getByText('My Subscriptions'));
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/subscribed' });
  });

  it('should navigate when pressed keyboard', () => {
    const { getByText } = renderWithQueryClient(<StaticSideNav />);
    fireEvent.click(getByText('Collections'));
    const myCollectionsBtn = getByText('My Collections').closest('[role="button"]');
    fireEvent.keyDown(myCollectionsBtn, { key: 'Enter' });
    expect(mockRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/owned' });
  });

  it('should not navigate when clicking on future incomplete buttons', () => {
    const { getByText } = renderWithQueryClient(<StaticSideNav />);
    const initialPath = mockRouter.asPath;

    fireEvent.click(getByText('Additional Resources'));
    expect(mockRouter.asPath).toBe(initialPath);

    fireEvent.click(getByText('Help'));
    expect(mockRouter.asPath).toBe(initialPath);
  });

  it('should render Leader\'s Report for managers', () => {
    useBackendConfig.mockReturnValue({
      data: [{ manager: true }],
      isLoading: false,
    });
    renderWithQueryClient(<StaticSideNav />);
    expect(screen.getByText("Leader's Report")).toBeInTheDocument();
  });

  it('should render My Learning Summary for non-managers', () => {
    useBackendConfig.mockReturnValue({
      data: [{ manager: false }],
      isLoading: false,
    });
    renderWithQueryClient(<StaticSideNav />);
    expect(screen.getByText("My Learning Summary")).toBeInTheDocument();
  });

  it('should not show summary/report during backendConfig loading', () => {
    useBackendConfig.mockReturnValue({
      data: null,
      isLoading: true,
    });
    renderWithQueryClient(<StaticSideNav />);
    expect(screen.queryByText("Leader's Report")).toBeNull();
    expect(screen.queryByText("My Learning Summary")).toBeNull();
  });
});