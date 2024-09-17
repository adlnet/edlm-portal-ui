// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;
const api = 'api/';
const elasticApi = '/es-api/';

//graphs
export const graph = `${backendHost}${api}graph/`;

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
