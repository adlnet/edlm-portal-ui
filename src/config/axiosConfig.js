import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withXSRFToken: true
});

export const axiosxapiInstance = axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
    'X-Experience-API-Version': '1.0.3',
    'Authorization': 'Basic Y2QzZWQ2NzYyYWM1ZGI3ZTBjYmYxY2EwODI0YjZlZjAyNGQ5YzhlMGI2MjIyYTBhNzA3MTY4NGI1ZDNlMWJlZDo3NjY2OTAzNDg2MDczMWNjMDFhNmI5NGI2YTU0YjE2MjQ3MWNhMjM5MzVjNmQ5ZGFmNzRiMDkwN2JlZWFhM2Y1',
  }
  });
