'use strict';

import { useEffect, useRef } from 'react';
import { useMoodleSession } from '@/hooks/useMoodleSession';
import Home from '@/pages/edlm-portal/learner/index';

export default function IntialPage() {

  // For moodle p1
  const moodleSession = useMoodleSession();
  const isSessionInit = useRef(false);

  // Get Moodle session
  useEffect(() => {
    // Get moodle session from the Moddle staging environment
    if (isSessionInit.current) return;
    if (process.env.NODE_ENV !== 'production') return;

    isSessionInit.current = true;
    moodleSession.mutate(null, {
      onSuccess: (res) => {
        if (!res.existedSession) {
          console.log('Moodle session initialized successfully.');
        }
      },
      onError: (error) => {
        console.error('Failed to initialize Moodle session on page load.');
      }
    });
  }, []);

  return (
    <>
     <Home />
    </>
  );
}