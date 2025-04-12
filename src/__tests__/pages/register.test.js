import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { axiosInstance } from '@/config/axiosConfig';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useMockConfig,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import MockAxios from 'jest-mock-axios';
import React, { useContext } from 'react';
import Register from '@/pages/register';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';

const renderer = () => {
  mockRouter.setCurrentUrl('/register');
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Register />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
  mockRouter.setCurrentUrl('/register');
  useUnauthenticatedUser();
  useMockConfig();
});

describe('Register Page', () => {
  it('should render', () => {
    renderer();
    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });

  it('should render a sign-in button', () => {
    renderer();
    expect(
      screen.getByRole('link', { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it('should navigate to homepage when a user is logged in', () => {
    useAuthenticatedUser();
    renderer();
    expect(singletonRouter).toMatchObject({
      asPath: '/',
    });
  });

  it('should navigate user to login page when sign-in button is clicked', () => {
    renderer();
    fireEvent.click(
      screen.getByRole('link', { name: /Sign in/i })
    );
    expect(singletonRouter).toMatchObject({
      asPath: '/login',
    });
  });

  describe('Register form', () => {
    it('should render a form', () => {
      renderer();

      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Confirm Password')
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /Create Account/i })
      ).toBeInTheDocument();
    });

    it('should show an error when the first name is too short', () => {
      renderer();
      const firstName = screen.getByPlaceholderText('First Name');
      fireEvent.change(firstName, { target: { value: 'a' } });
      expect(
        screen.getByText('First name must be at least 2 characters')
      ).toBeInTheDocument();
    });

    it('should not show an error when first name is long enough', () => {
      renderer();
      const firstName = screen.getByPlaceholderText('First Name');
      fireEvent.change(firstName, { target: { value: 'ab' } });
      expect(
        screen.queryByText('First name must be at least 2 characters')
      ).not.toBeInTheDocument();
    });

    it('should show an error when the last name is too short', () => {
      renderer();
      const lastName = screen.getByPlaceholderText('Last Name');
      fireEvent.change(lastName, { target: { value: 'a' } });
      expect(
        screen.getByText('Last name must be at least 2 characters')
      ).toBeInTheDocument();
    });

    it('should not show an error when last name is long enough', () => {
      renderer();
      const lastName = screen.getByPlaceholderText('Last Name');
      fireEvent.change(lastName, { target: { value: 'ab' } });
      expect(
        screen.queryByText('Last name must be at least 2 characters')
      ).not.toBeInTheDocument();
    });

    it('should show an error when the email is invalid', () => {
      renderer();
      const email = screen.getByPlaceholderText('Email');
      fireEvent.change(email, { target: { value: 'a' } });
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });

    it('should not show an error when email is valid', () => {
      renderer();
      const email = screen.getByPlaceholderText('Email');
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      expect(screen.queryByText('Email is invalid')).not.toBeInTheDocument();
    });

    it('should show an error when the password is too short', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'a' } });
      expect(
        screen.getByText('Password must be at least 8 characters long and contain at least one of each:')
      ).toBeInTheDocument();
    });

    it('should show an error when the password does not contain a lowercase letter', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AAAAAAAA' } });
      expect(
        screen.getByTestId('error-message')
      ).toHaveTextContent('Confirmation password is required');
    });

    it('should show an error when the password does not contain an uppercase letter', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'aaaaaaaa' } });
      expect(
        screen.getByText('Uppercase letter')
      ).toBeInTheDocument();
    });

    it('should show an error when the password does not contain a special character', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAAAAAA' } });
      expect(
        screen.getByText('Special character')
      ).toBeInTheDocument();
    });

    it('should show an error when the password does not contain a number', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAA!AAA' } });
      expect(
        screen.getByText('Number')
      ).toBeInTheDocument();
    });

    it('should show an error when the password has a space', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAA4!AAA ' } });
      expect(
        screen.getByTestId('error-message')
      ).toHaveTextContent('Confirmation password is required');
    });

    it('should not show an error when password is valid', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAA4!AAA' } });

      expect(screen.getByTestId('error-message').innerText).toBeUndefined();
    });

    it('should show an error when the password confirmation is invalid', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAA4!AAA' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'AaAAAA4AAA' } });
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('should not show an error when password confirmation is valid', () => {
      renderer();
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaAAAA4!AAA' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'AaAAAA4!AAA' } });

      expect(screen.getByTestId('error-message').innerText).toBeUndefined();
    });

    it('should show the submit button as disabled', () => {
      renderer();
      const firstName = screen.getByPlaceholderText('First Name');
      const lastName = screen.getByPlaceholderText('Last Name');
      const email = screen.getByPlaceholderText('Email');
      fireEvent.change(firstName, { target: { value: 'a' } });
      fireEvent.change(lastName, { target: { value: 'a' } });
      fireEvent.change(email, { target: { value: 'a' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'a' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'a' } });

      expect(screen.getByText('Create Account').disabled).toBe(true);
    });

    it('should show the submit button as enabled', () => {
      renderer();
      const firstName = screen.getByPlaceholderText('First Name');
      const lastName = screen.getByPlaceholderText('Last Name');
      const email = screen.getByPlaceholderText('Email');
      fireEvent.change(firstName, { target: { value: 'abc' } });
      fireEvent.change(lastName, { target: { value: 'def' } });
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test!1234' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Test!1234' } });

      expect(screen.getByText('Create Account').disabled).toBe(false);
    });

    it('should call axios when submit is clicked and there are no errors', () => {
      const mockAxios = jest.spyOn(axiosInstance, 'post');
      renderer();
      const firstName = screen.getByPlaceholderText('First Name');
      const lastName = screen.getByPlaceholderText('Last Name');
      const email = screen.getByPlaceholderText('Email');
      fireEvent.change(firstName, { target: { value: 'abc' } });
      fireEvent.change(lastName, { target: { value: 'def' } });
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test!1234' } });
      fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Test!1234' } });
      fireEvent.click(screen.getByText('Create Account'));
      expect(mockAxios).toHaveBeenCalled();
    });
  });
});
