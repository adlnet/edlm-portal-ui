'use strict';

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
         .then((res) => res.data);
     }
     return Promise.resolve({ status: 'Cookie already exists' });
   };
 
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
 