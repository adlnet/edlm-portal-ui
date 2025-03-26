'use strict';

import { useAuth } from '@/contexts/AuthContext';
import Home from '@/pages/edlm-portal/learner/index';
import Login from '@/pages/edlm-portal/login';

export default function IntialHomePage() {
  const { user } = useAuth();

  return (
    <>
     {user ? <Home /> : <Login />}
    </>
  );
}
