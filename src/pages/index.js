'use strict';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import Login from './login';
import Home from './learner/index';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function IntialPage() {
  const { user } = useAuth();

  return (
    <>
     {user ? <Home /> : <Login />}
    </>
  );
}
