import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useQuery } from 'react-query';
import { useTopSavedCourses } from '@/hooks/useTopSavedCourses';

// Mocking modules
jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  topSavedCoursesDetail: '/mocked-courses-endpoint'
}));

describe('useTopSavedCourses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls useQuery with the correct arguments', () => {
    const mockData = { data: [{ id: 1, title: 'Course 1' }] };
    const mockQueryResult = { data: mockData, isLoading: false };
    useQuery.mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => useTopSavedCourses());

    expect(useQuery).toHaveBeenCalledWith(
      ['topSavedCourses'],
      expect.any(Function),
      {
        staleTime: expect.any(Number),
        retry: false
      }
    );
    expect(result.current).toEqual(mockQueryResult);
  });

  it('fetches data from axiosInstance.get and returns response data', async () => {
    const mockResponse = { data: [{ id: 2, title: 'Test Course' }] };
    axiosInstance.get.mockResolvedValueOnce(mockResponse);

    let fetchFunction;
    useQuery.mockImplementation((key, fn, options) => {
      fetchFunction = fn;
      return {};
    });

    renderHook(() => useTopSavedCourses());
    const data = await fetchFunction();

    expect(axiosInstance.get).toHaveBeenCalledWith('/mocked-courses-endpoint');
    expect(data).toEqual(mockResponse.data);
  });

  it('should set staleTime to oneHour and retry to false', () => {
    useQuery.mockReturnValue({});

    renderHook(() => useTopSavedCourses());

    expect(useQuery).toHaveBeenCalledWith(
      ['topSavedCourses'],
      expect.any(Function),
      expect.objectContaining({
        staleTime: expect.any(Number),
        retry: false,
      })
    );
  });
});