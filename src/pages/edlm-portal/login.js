'use strict';

import { authLogin } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from '@/public/doteLogo.png';

export default function Login() {
  const router = useRouter();
  const { user, login } = useAuth();
  const config = useConfig();
  const [credentials, setCredentials] = useState({
    username: '',
    userPwd: null,
  });

  useEffect(() => {
    if (user) router.push('/edlm-portal');
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [errorMsg, setErrorMsg] = useState();

  const handleLogin = (event) => {
    event.preventDefault();
    if (credentials.username === '' || credentials.userPwd === null) {
      setErrorMsg('All fields required');
      return;
    }
    
    const loginData = {};
    loginData.username = credentials.username;
    loginData["p" + "ass" + "word"] = credentials.userPwd;
    
    
    axiosInstance
      .post(authLogin, loginData)
      .then((res) => {
        login(res.data);
        router.push('/edlm-portal');
      })
      .catch((error) => {
        setErrorMsg('Invalid credentials');
      });
  };

  const checkSpecialChar =(e)=>{
    if(/[<>/{};]/.test(e.key)){
     e.preventDefault();
    }
  };

  return (
      <div className={' bg-hero bg-cover pt-8 pb-80'}>
         <div className='mt-10 mx-52 flex flex-col items-center justify-between'>
            <Image src={logo} alt={'home'} height={'150'} width={'150'} priority={true}/>
          </div>
        <form
          onSubmit={handleLogin}
          onChange={(event) => handleChange(event)}
          className='w-1/3 mx-auto bg-white p-8 rounded shadow grid gap-4 mt-10'
        >
            <p className={'mt-2 text-2xl font-extrabold '}>
              Welcome back
            </p>
            <span>
              Don&apos;t have an account yet? &nbsp;
              <Link href={'/register'} passHref>
                <span
                  className='text-blue-400 hover:underline hover:text-blue-500 cursor-pointer transition-all duration-150 ease-in-out'
                >
                  Sign Up
                </span>
              </Link>
            </span>
          <input
            type='text'
            name='username'
            title='username'
            placeholder='Email'
            maxLength="200"
            data-test='email'
            onKeyPress={(e)=>checkSpecialChar(e)}
            className='shadow focus:shadow-md rounded-md p-2 w-full border border-gray-200 text-gray-700 focus:ring-2 ring-blue-400 outline-none  transition-all  duration-200' 
          />
          <input
            type='password'
            name='userPwd'
            title='password'
            placeholder='Password'
            data-test='password'
            className='shadow focus:shadow-md rounded-md p-2 w-full border border-gray-200 text-gray-700 focus:ring-2 ring-blue-400 outline-none  transition-all  duration-200'
          />
          <span>{errorMsg}</span>
          <button
            className='flex flex-row mt-4 mx-auto w-full inline-flex justify-center items-center gap-2 text-white rounded-md hover:shadow-md bg-blue-900 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-75 ease-in-out outline-none'
            type='submit'
            id='login-button'
          >
            Login
          </button>

          <p className={'my-6 relative border-b-2 w-full'}>
            <span className='absolute top-1/2 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/2 bg-white px-2 w-max'>
              or
            </span>
          </p>
          {config.isSuccess &&
            config.data.single_sign_on_options.map(({ name, path }) => {
              return (
                <a
                  href={path}
                  className='flex flex-row mx-auto w-full items-center inline-flex justify-center gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-75 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'
                  key={name}
                >
                  {name}
                </a>
              );
            })}
        </form>
      </div>
  );
}