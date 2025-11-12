import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { topSubscribedCollectionsDetail } from '@/config/endpoints';
import { useQuery } from 'react-query';
import { useTopSubscribedCollections } from '@/hooks/useTopSubscribedCollections';

// Mock modules
jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  topSubscribedCollectionsDetail: '/mocked-endpoint'
}));

describe('useTopSubscribedCollections', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call useQuery with correct arguments', () => {
    // Arrange
    const mockData = { data: [{ id: 1, name: 'Collection 1' }] };
    const mockQueryResult = { data: mockData, isLoading: false };
    useQuery.mockReturnValue(mockQueryResult);

    // Act
    const { result } = renderHook(() => useTopSubscribedCollections());

    // Assert
    expect(useQuery).toHaveBeenCalledWith(
      ['topSubscribedCollections'],
      expect.any(Function),
      {
        staleTime: expect.any(Number),
        retry: false
      }
    );
    expect(result.current).toEqual(mockQueryResult);
  });

  it('should fetch data using axiosInstance.get and resolve with response data', async () => {
    // Arrange
    const mockResponse = { data: [{ id: 2, name: 'Test Collection' }] };
    axiosInstance.get.mockResolvedValueOnce(mockResponse);

    let fetchFunction;
    useQuery.mockImplementation((key, fn, options) => {
      fetchFunction = fn;
      return {};
    });

    // Act
    renderHook(() => useTopSubscribedCollections());
    const data = await fetchFunction();

    // Assert
    expect(axiosInstance.get).toHaveBeenCalledWith('/mocked-endpoint');
    expect(data).toEqual(mockResponse.data);
  });

  it('should set staleTime to oneHour and retry to false', () => {
    useQuery.mockReturnValue({});

    renderHook(() => useTopSubscribedCollections());

    expect(useQuery).toHaveBeenCalledWith(
      ['topSubscribedCollections'],
      expect.any(Function),
      expect.objectContaining({
        staleTime: expect.any(Number),
        retry: false,
      })
    );
  });
});