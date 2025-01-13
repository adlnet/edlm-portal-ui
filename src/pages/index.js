'use strict';

import { useAuth } from '@/contexts/AuthContext';
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
