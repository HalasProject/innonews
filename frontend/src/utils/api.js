const BACKEND_API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Authentication routes
export const LOGIN = `${BACKEND_API}/auth/login`;
export const REGISTER = `${BACKEND_API}/auth/register`;
export const FORGOT_PASSWORD = `${BACKEND_API}/auth/forgot-password`;

export const USER_INFO = `${BACKEND_API}/me`;

export const GET_ALL_ARTICLES = `${BACKEND_API}/articles`;
