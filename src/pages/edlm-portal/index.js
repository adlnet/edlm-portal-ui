'use strict';

import { useMoodleSession } from '@/hooks/useMoodleSession';
import Home from '@/pages/edlm-portal/learner/index';

export default function IntialPage() {

  // Initialize Moodle session cookie
  useMoodleSession();
  
  return (
    <>
     <Home />
    </>
  );
}