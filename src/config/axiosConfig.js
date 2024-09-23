import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
    'Authorization': 'token 1b1f660b91bb26c4ec606ba5178d44a82854e347b1eac4aa7ab6446d7f52a976'
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
