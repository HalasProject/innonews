const BACKEND_API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Authentication routes
export const LOGIN = `${BACKEND_API}/auth/login`;
export const REGISTER = `${BACKEND_API}/auth/register`;
export const FORGOT_PASSWORD = `${BACKEND_API}/auth/forgot-password`;

export const USER_INFO = `${BACKEND_API}/me`;
export const USER_UPDATE_INFO = `${BACKEND_API}/user/update`;
export const USER_UPDATE_PASSWORD = `${BACKEND_API}/password`;
export const USER_REMOVE_AVATAR = `${BACKEND_API}/user/avatar`;
export const SEND_EMAIL_VERIFICATION = `${BACKEND_API}/email/sendlink`;

export const GET_ALL_ARTICLES = `${BACKEND_API}/articles`;
