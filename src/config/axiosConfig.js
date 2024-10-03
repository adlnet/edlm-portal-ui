import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
      'Authorization': 'token 987f360744eb50b425cc83a6ff240ed6bc304019a3d75fa3e3e8cbd2d301d9a7'
  }
});

export const axiosxapiInstance = axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
    'X-Experience-API-Version': '1.0.3',
    'Authorization': 'Basic Y2QzZWQ2NzYyYWM1ZGI3ZTBjYmYxY2EwODI0YjZlZjAyNGQ5YzhlMGI2MjIyYTBhNzA3MTY4NGI1ZDNlMWJlZDo3NjY2OTAzNDg2MDczMWNjMDFhNmI5NGI2YTU0YjE2MjQ3MWNhMjM5MzVjNmQ5ZGFmNzRiMDkwN2JlZWFhM2Y1',
  }
  });
