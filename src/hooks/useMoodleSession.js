'use strict'

import { axiosInstance } from '@/config/axiosConfig';
import { useEffect } from 'react';

// Check if MoodleSession cookie exists (For moodle P1)
const hasMoodleSession = () => {
  return document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('MoodleSession='));
}

// Make an API call if there is no moodle cookie,
// to nitialize Moodle session cookie without user visit moodle on p1 first
export function useMoodleSession() {
  useEffect(() => {
    if (!hasMoodleSession()) {
      axiosInstance.get('/lib/ajax/service.php')
        .then(() => {
          console.log('Moodle session cookie initialized.');
        })
        .catch((err) => {
          console.error('Error initializing Moodle session cookie.');
        });
    }  
  }, []);
};