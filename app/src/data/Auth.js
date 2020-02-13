import Axios from 'axios';

import { SV_ID, SV_SECRET } from '../constants/api';

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

    // cb(1);
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

    // cb('VALIDTOKEN');
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

    // cb(1);
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

    // cb(1);
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

    Axios.post(url, data)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });

    // cb(1);
};

export const recovery = (email, cb) => {
    let url = `/api/auth`;
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

    // cb(1);
};

export const request42Token = (code, cb) => {
    let url = `https://api.intra.42.fr/oauth/token`;
    const data = {
        grant_type: 'authorization_code',
        client_id: SV_ID,
        client_secret: SV_SECRET,
        code,
        redirect_uri: 'http://localhost:3000/auth/signin/42'
    };

    Axios.post(url, data)
        .then(res => {
            cb(res);
        })
        .catch(() => {
            cb(0);
        });
}