import Axios from 'axios';

import { SV_ID } from '../constants/api';

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

    // Axios.get(url, { params: data })
    //     .then(res => {
    //         cb(res.data);
    //     })
    //     .catch(() => {
    //         cb(0);
    //     });

    cb('VALIDTOKEN');
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

export const request42Access = cb => {
    const url = `https://api.intra.42.fr/oauth/authorize`;
    const data = {
        client_id: SV_ID,
        scope: 'public',
        redirect_uri: 'http://localhost:3000',
        response_type: 'code',
        state:
            'ksadmklqwnklenwqejkwqnielwqbnduliqwbnduiwqbenuiqwdbneqwijqjbdqweeb'
    };

    Axios.get(url, {
        params: data,
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
        credentials: 'same-origin'
    }).then(res => {
        cb(res);
    });
};
