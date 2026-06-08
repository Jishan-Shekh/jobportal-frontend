const BASE_URL = "https://jobportal-backend-8u7u.onrender.com";

export const JOB_API_POST = `${BASE_URL}/api/v1/job/post`;
export const JOB_API_GET = `${BASE_URL}/api/v1/job/get`;
export const JOB_API_ADMIN = `${BASE_URL}/api/v1/job/getadminjobs`;
export const JOB_API_BY_ID = (id) => `${BASE_URL}/api/v1/job/get/${id}`;
export const JOB_API_UPDATE = (id) => `${BASE_URL}/api/v1/job/update/${id}`;