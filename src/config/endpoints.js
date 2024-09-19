// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_PORTAL_BACKEND_HOST;
export const XDSbackendHost = process.env.NEXT_PUBLIC_XDS_BACKEND;
const api = 'api/';
const elasticApi = 'es-api/';

//graphs
export const graph = `${backendHost}${api}graph/`;

//vacancies
export const vacancies = `${backendHost}${api}vacancy/`;

//course and competencies
export const courseData = `${XDSbackendHost}${elasticApi}teaches/?reference=https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Framework/91130442-c455-499b-8bd8-bdea3d6fae69`;


// // authentication urls
// export const authLogin = `${backendHost}${api}auth/login`;
// export const authRegister = `${backendHost}${api}auth/register`;
// export const authLogout = `${backendHost}${api}auth/logout`;

// // configuration url
// export const configUrl = `${backendHost}${api}ui-configuration/`;

// //Notifications
// export const allNotification = `${backendHost}/inbox/notifications/api/all_list/`;
// export const allRead = `${backendHost}/inbox/notifications/mark-all-as-read/`;
// export const unreadData = `${backendHost}/inbox/notifications/api/unread_list/`;
