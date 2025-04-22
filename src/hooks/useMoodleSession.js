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
        console.log('Moodle Session already initialized');
        return Promise.resolve({ status: 'Attempt already made' });
    }

    attempted = true;

    return axiosInstance
        .get('/my/', { maxRedirects: 0 })
        .then(() => {
            console.log('Moodle session initialized');
            return { status: 'Session initialized' };
        })
        .catch(() => {
            if (hasMoodleSession()) {
                console.log('Moodle session cookie obtained despite error');
                return { status: 'Cookie obtained' };
            }
            
            console.log('Moodle session validation attempt completed');
            return { status: 'Attempted' };
    });
 }

 
 export function useMoodleSession() {
     return useMutation(() => initMoodleSession(), {
       retry: 0, 
       onSuccess: () => {
         console.log('Moodle session cookie initialized.');
       },
       onError: (error) => {
         console.error('Error initializing Moodle session cookie.');
       }
     });
   }
 