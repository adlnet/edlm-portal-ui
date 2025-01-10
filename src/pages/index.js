'use strict';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Home from './learner/index';
import Login from './login';


export default function IntialPage() {
  const { user } = useAuth();

  return (
    <>
     {user ? <Home /> : <Login />}
    </>
  );
}
