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
        /api/user/token/:token
    parameter: 
        null
    result:
        status
        obj
*/
export const getUserByToken = (token, cb) => {
    const url = `/api/user/token/${token}`;

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
        /api/user/userName/:userName
    parameter: 
        token
    result:
        status
        obj
*/
export const getUserByUserName = (token, userName, cb) => {
    const url = `/api/user/userName/${userName}`;
    const data = {
        token
    };

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
        PUT
    url: 
        /api/user
    parameter: 
        token, userName, password, email, firstName, lastName
    result:
        status
*/
export const putUser = (token, userName, password, email, firstName, lastName, cb) => {
    let url = `/api/auth`;
    const data = {
        token,
        userName,
        password,
        email,
        firstName,
        lastName
    };

    Axios.put(url, data)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/*
    method: 
        DELETE
    url: 
        /api/user/:token
    parameter: 
        null
    result:
        status
*/
export const deleteUser = (token, cb) => {
    let url = `/api/auth/${token}`;

    Axios.delete(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};
