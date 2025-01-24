// noinspection JSCheckFunctionSignatures

import { act, fireEvent, render, screen } from '@testing-library/react';
import { logoutFn } from '@/__mocks__/predefinedMocks';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/menus/UserMenu';
import singletonRouter from 'next/router';

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('next/router', () => require('next-router-mock'));
describe('User Menu', () => {
  describe('with user', () => {
    beforeEach(() => {
      useAuth.mockImplementation(() => ({
        user: { user: { first_name: 'value' } },
        logout: logoutFn
      }));
      render(<UserMenu />);
    });
    it('shows the users email', () => {
      expect(screen.getByText('value')).toBeInTheDocument();
    });
    it('shows user menu', () => {
      const button = screen.getByText(/value/i);

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });
    it('Show logout and test logout option', async() => {
      const button = screen.getByText(/value/i);

      fireEvent.click(button);
      
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
      await act (async() => {
        fireEvent.click(screen.getByText(/Logout/i));
      });

      // expect(singletonRouter).toMatchObject({
      //   asPath: '/login',
      // });

    });

    // it('applies the correct styling', () => {
    //   const button = screen.getByText(/value/i);

    //   fireEvent.click(button);

    //   // hover over the button
    //   const menuOption = screen.getByText(/My Lists/i);
    //   expect(menuOption.className.includes('bg-white')).toBeTruthy();

    //   fireEvent.focus(menuOption);
    //   expect(menuOption.className.includes('bg-gray-100')).toBeTruthy();
    // });

    it('applies the correct styling when focused', () => {
      const button = screen.getByText(/value/i);

      fireEvent.click(button);

      // hover over the button
      const menuOption = screen.getByText(/Logout/i);
      expect(
        menuOption.className.includes('ring-2 ring-blue-500 ring-offset-1')
      ).toBeFalsy();
      fireEvent.focus(menuOption);
      expect(menuOption.className.includes('ring-2 ring-blue-500 ring-offset-1')).toBeTruthy();
    });
  });
});
