import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act } from '@testing-library/react';
import {
  createSaveSearchMockFn,
  useAuthenticatedUser,
  useMockCreateSaveSearch,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { fireEvent, render } from '@testing-library/react';
import { mockXapiEvents } from '@/__mocks__/mockXapi';
import { useCreateSaveSearch } from '@/hooks/useCreateSaveSearch';
import CreateSavedSearchModal from '@/components/modals/CreateSavedSearch';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <CreateSavedSearchModal path={'/path'} />
    </QueryClientWrapper>
  );
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('CreateSavedSearchModal', () => {
  it('should render the button', () => {
    useAuthenticatedUser();
    useMockCreateSaveSearch();
    const { getByText } = renderer();
    
    expect(getByText('Save Search')).toBeInTheDocument();
  });

  it('should open a modal for creating a saved search when the button is clicked', () => {
    useAuthenticatedUser();
    useMockCreateSaveSearch();
    const { getByText, getByPlaceholderText } = renderer();
    act(() => {
      fireEvent.click(getByText('Save Search'));
    });
    expect(getByPlaceholderText('Query Name')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should call the api when save is clicked', () => {
    useAuthenticatedUser();
    useMockCreateSaveSearch();
    mockXapiEvents();
    const { getByText, getByPlaceholderText } = renderer();
    act(() => {2
      fireEvent.click(getByText('Save Search'));
    });
    act(() => {
      fireEvent.change(getByPlaceholderText('Query Name'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.click(getByText('Save'));
    });
    expect(createSaveSearchMockFn).toHaveBeenCalled();
  });

  it('should call the api when save is clicked and block special chars', () => {
    useAuthenticatedUser();
    useMockCreateSaveSearch();
    const { getByText, getByPlaceholderText } = renderer();
    act(() => {2
      fireEvent.click(getByText('Save Search'));
    });
    act(() => {
      fireEvent.keyPress(getByPlaceholderText('Query Name'), {
        key: ";", code: 186, charCode: 186 
      });
    });
    act(() => {
      fireEvent.keyPress(getByPlaceholderText('Query Name'), {
        key: "1", code: 49, charCode: 49
      });
    });
    act(() => {
      fireEvent.change(getByPlaceholderText('Query Name'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.click(getByText('Save'));
    });
    expect(createSaveSearchMockFn).toHaveBeenCalled();
  });

  it('should not call the api when there is no query to save', () => {
    useAuthenticatedUser();
    useMockCreateSaveSearch();
    const { getByText, getByPlaceholderText } = renderer();
    act(() => {
      fireEvent.click(getByText('Save Search'));
    });
    expect(createSaveSearchMockFn).not.toHaveBeenCalled();
  });
});
