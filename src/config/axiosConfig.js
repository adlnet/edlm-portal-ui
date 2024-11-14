import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
  }
});

export const axiosxapiInstance = axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
    'X-Experience-API-Version': '1.0.3',
  }
  });
