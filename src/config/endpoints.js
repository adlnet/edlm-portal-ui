// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_PORTAL_BACKEND_HOST;
export const XDSbackendHost = process.env.NEXT_PUBLIC_XDS_BACKEND;
export const LDSSbackendHost = process.env.NEXT_PUBLIC_LDSS_API;
const api = 'api/';
const elasticApi = 'es-api/';

//graphs
export const graph = `${backendHost}${api}graph/`;

//vacancies
export const vacancies = `${backendHost}${api}vacancy/`;

//course and competencies
export const courseData = `${XDSbackendHost}${elasticApi}teaches/?reference=https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Framework/8186e8b1-c455-4ccb-b9df-ffe7745d809d`;

//ldss data
export const xapiData = `${LDSSbackendHost}xapi/statements?limit=10&verb=https%3A//w3id.org/xapi/tla/verbs/explored&activity=https://dev-xds2.deloitteopenlxp.com/course/5668b521c9336ddccfb9aa3efaf7d67424fdd9cf96147282a47c37eb553ac4985547040e9c314469a027e9c0be113abde242e4a4d283b96071def77b2d07c2d4`

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
