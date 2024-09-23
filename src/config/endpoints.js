// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_PORTAL_BACKEND_HOST;
export const XDSbackendHost = process.env.NEXT_PUBLIC_XDS_BACKEND;
export const LDSSbackendHost = process.env.NEXT_PUBLIC_LDSS_API;
const api = '/api/';
const elasticApi = '/es-api/';

//graphs
export const graph = `${backendHost}${api}graph/`;

//vacancies
export const vacancies = `${backendHost}${api}vacancy/`;

//lists
export const candidateList = `${backendHost}${api}candidate-lists/`;

//course and competencies
export const courseData = `${XDSbackendHost}${elasticApi}teaches/?reference=https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Framework/8186e8b1-c455-4ccb-b9df-ffe7745d809d`;

//ldss data
export const xapiUsers = `${LDSSbackendHost}/xapi/statements?limit=10&verb=https://adlnet.gov/expapi/verbs/achieved&activity=https%3A//w3id.org/xapi/competency/C017.%2520%2528Encryption%2529%2520KSAs%2520that%2520relate%2520to%2520the%2520process%2520of%2520transforming%2520information%2520to%2520make%2520it%2520unreadable%2520for%2520unauthorized%2520users.%3Flevel%3D1`

// authentication urls
export const authLogin = `${backendHost}${api}auth/login`;
export const authRegister = `${backendHost}${api}auth/register`;
export const authLogout = `${backendHost}${api}auth/logout`;

// configuration url
export const configUrl = `${backendHost}${api}ui-configuration/`;

// //Notifications
// export const allNotification = `${backendHost}/inbox/notifications/api/all_list/`;
// export const allRead = `${backendHost}/inbox/notifications/mark-all-as-read/`;
// export const unreadData = `${backendHost}/inbox/notifications/api/unread_list/`;
