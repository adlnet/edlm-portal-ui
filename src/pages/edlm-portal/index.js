'use strict';

import { useAuth } from '@/contexts/AuthContext';
import Home from '@/pages/edlm-portal/learner/index';
import Login from '@/pages/edlm-portal/login';

export default function IntialPage() {
  const { user } = useAuth();

  return (
    <>
    {/* Dont redirect to login page on P1 */}
     {user ? <Home /> : <Login />}
    </>
  );
}