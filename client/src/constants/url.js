// const URL = 'https://localhost';
// const APP_PORT = '3000';
// const SOCKET_PORT = '8445';

const URL = 'https://hypertube.aidandlim.com';
const APP_PORT = '80';
const SOCKET_PORT = '8445';

export const APP_URL = `${URL}${APP_PORT === 80 ? null : ':' + APP_PORT}`;
export const APP_REDIRECT_URL = `${APP_URL}/auth/signin`;
export const SOCKET_URL = `${APP_URL}:${SOCKET_PORT}`;
