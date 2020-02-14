/*
    Response = {
        status: number
            200: success
            400: failure
            401: invalid token
        obj: object(return value)
        list: list(return value)
    }
*/

import Axios from 'axios';

/*
    method: 
        GET
    url: 
        /api/token/:token
    parameter: 
        null
    result:
        status
*/
export const checkToken = (token, cb) => {
    const url = `/api/token/${token}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/*
    method: 
        GET
    url: 
        /api/auth
    parameter: 
        userName, password
    result:
        status:
            200: success
            411: invalid userName
            412: invalid password
        obj
*/
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

/*
    method: 
        GET
    url: 
        /api/auth/userName/:userName
    parameter: 
        null
    result:
        status
*/
export const getUserName = (userName, cb) => {
    let url = `/api/auth/userName/${userName}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/*
    method: 
        GET
    url: 
        /api/auth/email/:email
    parameter: 
        null
    result:
        status
*/
export const getEmail = (email, cb) => {
    let url = `/api/auth/email/${email}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/*
    method: 
        GET
    url: 
        /api/auth
    parameter: 
        userName, password, email, firstName, lastName
    result:
        status
*/
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
};

/*
    method: 
        GET
    url: 
        /api/auth/recovery/:email
    parameter: 
        null
    result:
        status
*/
export const recovery = (email, cb) => {
    let url = `/api/auth/recovery/${email}`;

    Axios.get(url)
        .then(res => {
            cb(res.data.status);
        })
        .catch(() => {
            cb(0);
        });
};

/*
    method: 
        GET
    url: 
        /api/auth/social
    parameter: 
        userName, email, firstName, lastName, picture, socialType
    result:
        status
*/
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
