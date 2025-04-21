'use strict'

import { axiosInstance } from '@/config/axiosConfig';
import { useMutation } from 'react-query';

// Check if MoodleSession cookie exists (For moodle P1)
const hasMoodleSession = () => {
  return document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('MoodleSession='));
}

const initMoodleSession = () => {
    if (!hasMoodleSession()) {
      return axiosInstance
        .get('/lib/ajax/service.php')
        .then((res) => {
            return axiosInstance
                .get('/my/', { maxRedirects: 0 })
                .then(() => {
                    return {
                        status: 'Moodle Cookie Set Successfully',
                    };
                })
                .catch(() => {
                    return {
                        status: 'Cookie Set',
                    };
                });
        });
    }
    return Promise.resolve({ status: 'Cookie already exists' });
  };

export function useMoodleSession() {
    return useMutation(() => initMoodleSession(), {
      onSuccess: () => {
        console.log('Moodle session cookie initialized.');
      },
      onError: (error) => {
        console.error('Error initializing Moodle session cookie.');
      }
    });
  }


