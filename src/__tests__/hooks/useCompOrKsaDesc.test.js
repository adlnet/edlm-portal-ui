import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCompOrKsaDesc, useMultipleCompAndKsaDesc } from '@/hooks/useCompOrKsaDesc'; // Adjust path as needed
import { useQuery } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');

describe('useCompOrKsaDesc', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls useQuery with the correct arguments', () => {
    useQuery.mockReturnValue({ data: 'mock' });
    const eccrReference = 'COMP-123';

    const { result } = renderHook(() => useCompOrKsaDesc(eccrReference));
    expect(useQuery).toHaveBeenCalledWith(
      ['comp-ksa-description', eccrReference],
      expect.any(Function),
      expect.objectContaining({
        enabled: true,
        staleTime: expect.any(Number),
        cacheTime: expect.any(Number),
      })
    );
    expect(result.current.data).toEqual('mock');
  });

  it('fetcher returns formatted object from axios response', async () => {
    const eccrReference = 'COMP-123';
    const axiosMock = {
      data: {
        name: { '@value': 'Test Name' },
        description: { '@value': 'Test Description' }
      }
    };
    axiosInstance.get.mockResolvedValueOnce(axiosMock);

    let fetcher;
    useQuery.mockImplementation((key, fn) => {
      fetcher = fn;
      return {};
    });

    renderHook(() => useCompOrKsaDesc(eccrReference));
    const result = await fetcher();
    expect(axiosInstance.get).toHaveBeenCalledWith(`/edlm-portal/api/data/${eccrReference}/`);
    expect(result).toEqual({
      id: eccrReference,
      name: 'Test Name',
      description: 'Test Description'
    });
  });

  it('fetcher returns null if eccrReference is falsy', async () => {
    let fetcher;
    useQuery.mockImplementation((key, fn) => {
      fetcher = fn;
      return {};
    });
    renderHook(() => useCompOrKsaDesc(null));
    const result = await fetcher();
    expect(result).toBeNull();
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });
});

describe('useMultipleCompAndKsaDesc', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls useQuery with the correct arguments', () => {
    useQuery.mockReturnValue({ data: 'mock' });
    const eccrReferences = ['ABC', 'DEF'];

    const { result } = renderHook(() => useMultipleCompAndKsaDesc(eccrReferences));
    expect(useQuery).toHaveBeenCalledWith(
      ['multiple-comp-ksa-descriptions', eccrReferences],
      expect.any(Function),
      expect.objectContaining({
        enabled: true,
        staleTime: expect.any(Number),
        cacheTime: expect.any(Number),
      })
    );
    expect(result.current.data).toEqual('mock');
  });

  it('returns empty array if eccrReferences is empty', async () => {
    let fetcher;
    useQuery.mockImplementation((key, fn) => {
      fetcher = fn;
      return {};
    });

    renderHook(() => useMultipleCompAndKsaDesc([]));
    const result = await fetcher();
    expect(result).toEqual([]);
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  it('maps and returns descriptions; handles failures gracefully', async () => {
    // Succeed for one, fail for the other
    const responses = [
      { data: { name: { '@value': 'N1' }, description: { '@value': 'D1' } } }
    ];
    axiosInstance.get
      .mockResolvedValueOnce(responses[0]) // success
      .mockRejectedValueOnce(new Error('fail')); // failure

    let fetcher;
    const eccrReferences = ['id1', 'id2'];
    useQuery.mockImplementation((key, fn) => {
      fetcher = fn;
      return {};
    });

    renderHook(() => useMultipleCompAndKsaDesc(eccrReferences));
    const result = await fetcher();

    expect(axiosInstance.get).toHaveBeenNthCalledWith(1, '/edlm-portal/api/data/id1/');
    expect(axiosInstance.get).toHaveBeenNthCalledWith(2, '/edlm-portal/api/data/id2/');

    expect(result).toEqual([
      {
        id: 'id1',
        name: 'N1',
        description: 'D1'
      },
      {
        id: 'id2',
        name: '',
        description: 'Description not available'
      }
    ]);
  });
});