// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_XDS_BACKEND;
export const XDSbackendHost = process.env.NEXT_PUBLIC_XDS_BACKEND;
export const LRSbackendHost = process.env.NEXT_PUBLIC_LRS_API;
export const ECCRHost = process.env.NEXT_PUBLIC_ECCR_API;
const ECCR_DOTE_UUID = process.env.NEXT_PUBLIC_DOTE_UUID;
const ECCR_TYPE = process.env.NEXT_PUBLIC_ECCR_TYPE;
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
export const xapiUsers = `${LRSbackendHost}/xapi/statements?limit=10&verb=https://adlnet.gov/expapi/verbs/achieved&activity=https%3A//w3id.org/xapi/competency/C017.%2520%2528Encryption%2529%2520KSAs%2520that%2520relate%2520to%2520the%2520process%2520of%2520transforming%2520information%2520to%2520make%2520it%2520unreadable%2520for%2520unauthorized%2520users.%3Flevel%3D1`

// authentication urls
export const authLogin = `${XDSbackendHost}${api}auth/login`;
export const authRegister = `${XDSbackendHost}${api}auth/register`;
export const authLogout = `${XDSbackendHost}${api}auth/logout`;

// configuration url
export const configUrl = `${XDSbackendHost}${api}ui-configuration/`;

// spotlight courses url
export const spotlightCourses = `${XDSbackendHost}${api}spotlight-courses`;

// all the interest lists
export const interestLists = `${XDSbackendHost}${api}interest-lists/`;
export const userOwnedLists = `${XDSbackendHost}${api}interest-lists/owned`;

// course url
export const courseUrl = `${XDSbackendHost}${api}experiences/`;

// search url
export const searchUrl = `${XDSbackendHost}${elasticApi}`;

// More like this
export const moreLikeThisUrl = `${XDSbackendHost}${elasticApi}more-like-this/`;

// Save Search
export const saveSearchUrl = `${XDSbackendHost}${api}saved-filters`;
export const saveSearchOwnedUrl = `${XDSbackendHost}${api}saved-filters/owned`;

// Competency Search
export const compSearchUrl = `/edlm-portal/api/data/${ECCR_TYPE}/${ECCR_DOTE_UUID}`


