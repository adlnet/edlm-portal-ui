import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCourseProgressDetail } from '@/hooks/useCourseProgressDetail';
import { useQuery, useQueryClient } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  courseProgressDetail: '/mocked-course-progress'
}));

describe('useCourseProgressDetail', () => {
  const mockQueryClient = {
    setQueryData: jest.fn()
  };

  beforeEach(() => {
    useQueryClient.mockReturnValue(mockQueryClient);
    jest.clearAllMocks();
  });

  it('calls useQuery with correct parameters and fetcher', async () => {
    const mockResponse = {
      data: {
        completed_courses: [{ course_id: 'c1', n: 1 }],
        enrolled_courses: [{ course_id: 'c2', n: 2 }],
        in_progress_courses: [{ course_id: 'c3', n: 3 }]
      }
    };
    axiosInstance.get.mockResolvedValueOnce(mockResponse);
    let fetcher;
    useQuery.mockImplementation((key, fn, options) => {
      fetcher = fn;
      return { data: mockResponse.data, isLoading: false };
    });

    const { result } = renderHook(() => useCourseProgressDetail());

    expect(useQuery).toHaveBeenCalledWith(
      ['courseProgressDetail'],
      expect.any(Function),
      expect.objectContaining({
        staleTime: expect.anything(),
        retry: false,
        onSuccess: expect.any(Function)
      })
    );
    await fetcher();
    expect(axiosInstance.get).toHaveBeenCalledWith('/mocked-course-progress');
  });

  it('onSuccess caches all courses from all arrays by course_id', () => {
    const sampleData = {
      completed_courses: [{ course_id: 'id1', data: 1 }],
      enrolled_courses: [{ course_id: 'id2', data: 2 }],
      in_progress_courses: [{ course_id: 'id3', data: 3 }]
    };

    useQuery.mockImplementation((key, fn, options) => {
      options.onSuccess(sampleData);
      return { data: sampleData, isLoading: false };
    });

    renderHook(() => useCourseProgressDetail());

    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['course', 'id1'], sampleData.completed_courses[0]);
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['course', 'id2'], sampleData.enrolled_courses[0]);
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['course', 'id3'], sampleData.in_progress_courses[0]);
  });

  it('onSuccess does nothing if course arrays are empty or missing', () => {
    const emptyData = {};
    useQuery.mockImplementation((key, fn, options) => {
      options.onSuccess(emptyData);
      return { data: emptyData, isLoading: false };
    });

    renderHook(() => useCourseProgressDetail());
    expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
  });

  it('onSuccess does not cache if course_id is missing', () => {
    const partialData = {
      completed_courses: [{ no_id: true }],
      enrolled_courses: [{ no_id: true }],
      in_progress_courses: [{ no_id: true }]
    };
    useQuery.mockImplementation((key, fn, options) => {
      options.onSuccess(partialData);
      return { data: partialData, isLoading: false };
    });

    renderHook(() => useCourseProgressDetail());
    expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
  });
});