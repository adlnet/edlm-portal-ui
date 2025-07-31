'use strict';

 import { axiosInstance } from '@/config/axiosConfig';
 import { useMutation } from 'react-query';
 
 let attempted = false;

 // Check if MoodleSession cookie exists (For moodle P1)
 const hasMoodleSession = () => {
   return document.cookie
     .split('; ')
     .some(cookie => cookie.startsWith('MoodleSession='));
 }
 
 const initMoodleSession = () => {
    if (attempted || hasMoodleSession()) {
        return Promise.resolve({ 
            status: 'Session already exists',
            existedSession: true
        });
    }

    attempted = true;

    return axiosInstance
        .get('/my/', { maxRedirects: 0 })
        .then(() => {
            return { 
                status: 'Session initialized',
                existedSession: false
            };
        })
        .catch(() => {
            if (hasMoodleSession()) {
                console.log('Moodle session cookie obtained despite error');
                return { 
                    status: 'Cookie obtained',
                    existedSession: true
                };
            }
            
            console.log('Moodle session validation attempt completed');
            return { 
                status: 'Attempted',
                existedSession: false
            };
    });
 }

 
 export function useMoodleSession() {
     return useMutation(() => initMoodleSession(), {
       retry: 0, 
       onSuccess: (res) => {
        if (!res.existedSession) {
            console.log('Moodle session cookie initialized.');
          }
       },
       onError: (error) => {
         console.error('Error initializing Moodle session cookie.');
       }
     });
   }
 