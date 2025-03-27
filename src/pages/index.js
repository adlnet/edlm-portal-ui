'use strict';

import { useAuth } from '@/contexts/AuthContext';
import Home from '@/pages/learner/index';
import Login from '@/pages/login';

export default function IntialPage() {
  const { user } = useAuth();

  return (
    <>
     {user ? <Home /> : <Login />}
    </>
  );
}
