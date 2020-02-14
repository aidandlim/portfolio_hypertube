import Axios from 'axios';

import { GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET, SV_ID, SV_SECRET } from '../constants/api';
import { APP_REDIRECT_URL } from '../constants/url';

export const checkToken = (token, cb) => {
    const url = `/api/token`;
    const data = {
        token
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const signin = (userName, password, cb) => {
    const url = `/api/auth`;
    const data = {
        userName,
        password
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const getUserName = (userName, cb) => {
    let url = `/api/auth/userName`;
    const data = {
        userName
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const getEmail = (email, cb) => {
    let url = `/api/auth/email`;
    const data = {
        email
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const signup = (userName, password, email, firstName, lastName, cb) => {
    let url = `/api/auth`;
    const data = {
        userName,
        password,
        email,
        firstName,
        lastName
    };

    console.log(data);

    Axios.post(url, data)
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const recovery = (email, cb) => {
    let url = `/api/auth/recovery`;
    const data = {
        email
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data.status);
        })
        .catch(() => {
            cb(0);
        });
};

export const oAuth = ({ userName, email, firstName, lastName, picture, socialType }, cb) => {
    let url = `/api/auth/social`;
    const data = {
        userName: `${userName}-${Math.floor(Math.random() * 100000)}`,
        email,
        firstName,
        lastName,
        picture,
        socialType
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

export const requestGoogleCode = (code, cb) => {
    let url = `https://oauth2.googleapis.com/token`;
    const data = {
        grant_type: 'authorization_code',
        client_id: GOOGLE_ID,
        client_secret: GOOGLE_SECRET,
        code,
        redirect_uri: `${APP_REDIRECT_URL}/google`
    };

    Axios.post(url, data)
        .then(res => {
            cb({
                token: res.data.access_token
            });
        })
        .catch(() => {
            cb({
                token: null
            });
        });
};

export const requestGoogleProfile = (token, cb) => {
    let url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`;

    Axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            const user = res.data;

            cb({
                userName: user.email.split('@')[0],
                password: '',
                email: user.email,
                firstName: user.given_name,
                lastName: user.family_name,
                picture: user.picture,
                socialType: 'google'
            });
        })
        .catch(() => {
            cb(null);
        });
};

export const requestFacebookCode = (code, cb) => {
    let url = `https://graph.facebook.com/v6.0/oauth/access_token`;
    const data = {
        client_id: FACEBOOK_ID,
        client_secret: FACEBOOK_SECRET,
        code,
        redirect_uri: `${APP_REDIRECT_URL}/facebook`
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb({
                token: res.data.access_token
            });
        })
        .catch(() => {
            cb({
                token: null
            });
        });
};

export const requestFacebookProfile = (token, cb) => {
    let url = `https://graph.facebook.com/v6.0/me?fields=email,first_name,last_name,picture`;

    Axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            const user = res.data;

            cb({
                userName: user.email.split('@')[0],
                password: '',
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                picture: user.picture.data.url,
                socialType: 'facebook'
            });
        })
        .catch(() => {
            cb(null);
        });
};

export const request42Code = (code, cb) => {
    let url = `https://api.intra.42.fr/oauth/token`;
    const data = {
        grant_type: 'authorization_code',
        client_id: SV_ID,
        client_secret: SV_SECRET,
        code,
        redirect_uri: `${APP_REDIRECT_URL}/42`
    };

    Axios.post(url, data)
        .then(res => {
            cb({
                token: res.data.access_token
            });
        })
        .catch(() => {
            cb({
                token: null
            });
        });
};

export const request42Profile = (token, cb) => {
    let url = `https://api.intra.42.fr/v2/me`;

    Axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            const user = res.data;

            cb({
                userName: user.login,
                password: '',
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                picture: user.image_url,
                socialType: '42'
            });
        })
        .catch(() => {
            cb(null);
        });
};
