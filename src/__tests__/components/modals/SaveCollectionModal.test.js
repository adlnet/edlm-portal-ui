import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateUserList } from '@/hooks/useCreateUserList';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists.js';
import SaveModal from '@/components/modals/SaveCollectionModal';
import userListData from '@/__mocks__/data/userLists.data';

jest.mock('@/hooks/useUpdateUserList', () => ({
  useUpdateUserList: jest.fn(),
}));

jest.mock('@/hooks/useCreateUserList', () => ({
  useCreateUserList: jest.fn(),
}));

jest.mock('@/hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

// mocking the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockResizeObserver = jest.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.ResizeObserver = mockResizeObserver;

const mutateFn = jest.fn();

const createMutateFn = jest.fn();

const renderer = (isAuth = false) => {
  // // defaults user to logged in
  if (!isAuth) {
    useAuth.mockReturnValue({
      user: null,
    });
  } else {
    useAuth.mockReturnValue({
      user: {
        user: {
          id: '1',
          username: 'test',
          email: '',
        },
      },
    });
  }

  return render(
    <QueryClientWrapper>
      <div>
        <SaveModal courseId={'12345'} title={"test"} modalState={true} />
      </div>
    </QueryClientWrapper>
  );
};

beforeEach(() => {
  useUpdateUserList.mockImplementation(() => ({
    mutate: mutateFn,
  }));

  useCreateUserList.mockImplementation(() => ({
    mutate: createMutateFn,
    isSuccess: true,
  }));

  useUserOwnedLists.mockImplementation(() => ({
    data: userListData,
    isSuccess: true,
  }));
});

describe('Save Modal', () => {
  describe('static content', () => {
    it('should have a button id', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });
      expect(getByText(/add "test" to collections/i).id).not.toBeNull();
    });
    it('should render the title', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });
      expect(getByText(/add "test" to collections/i)).toBeInTheDocument();
    });
  });
  describe('with list data', () => {
    it('should render the remove button', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByText(/remove/i)).toBeInTheDocument();
    });
    it('should render the add button', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByText(/add/i)).toBeInTheDocument();
    });

    it('should call mutate on click of remove', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      act(() => {
        fireEvent.click(getByText(/remove/i));
      });

      expect(mutateFn).toHaveBeenCalled();
    });
    it('should call mutate on click of add', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      act(() => {
        fireEvent.click(getByText(/add/i));
      });

      expect(mutateFn).toHaveBeenCalled();
    });
  });
  describe('create new list', () => {
    it('should render input fields for name and description', () => {
      const { getByText, getByPlaceholderText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/Collections Description.../i)).toBeInTheDocument();
    });

    it('should show error message when name is not entered', () => {
      const { getByText, getByPlaceholderText, getByRole } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      fireEvent.change(getByPlaceholderText(/collections description/i), {
        target: { value: 'Test Description' },
      });

      act(() => {
        fireEvent.click(getByRole('button', { name: /create/i }));
      });

      expect(getByText(/list name is required/i)).toBeInTheDocument();
    });

    it('should show error message when description is not entered', () => {
      const { getByText, getByPlaceholderText, getByRole } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      fireEvent.change(getByPlaceholderText(/name/i), {
        target: { value: 'Test Name' },
      });

      act(() => {
        fireEvent.click(getByRole('button', { name: /create/i }));
      });

      expect(getByText(/list description is required/i)).toBeInTheDocument();
    });

    it('should call create mutation when form is valid', () => {
      const { getByText, getByPlaceholderText, getByRole } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      fireEvent.change(getByPlaceholderText(/name/i), {
        target: { value: 'Test Name' },
      });

      fireEvent.change(getByPlaceholderText(/Collections Description.../i), {
        target: { value: 'Test Description' },
      });

      act(() => {
        fireEvent.click(getByRole('button', { name: /create/i }));
      });

      expect(createMutateFn).toHaveBeenCalled
    });
  });

  describe('modal', () => {
    it('should open modal when save button is clicked', () => {
      const { getByText, getByRole } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    // it('should close modal when close button is clicked', () => {
    //   const { getByText, queryByRole } = renderer();
    //   act(() => {
    //     fireEvent.click(getByText(/save/i));
    //   });

    //   act(() => {
    //     fireEvent.click(getByText(/close/i));
    //   });

    //   expect(queryByRole('dialog')).not.toBeInTheDocument();
    // });

    it('should maintain modal state when clicking the modal content', () => {
      const { getByText, getByRole } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      act(() => {
        fireEvent.click(getByRole('dialog'));
      });

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should reset modal state when unmounted', () => {
      const { getByText, queryByRole, unmount } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(queryByRole('dialog')).toBeInTheDocument();

      unmount();

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

  });

});
