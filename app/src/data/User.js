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
        /api/user/token
    parameter: 
        null
    result:
        status
        obj
*/
export const getUserByToken = (token, cb) => {
    const url = `/api/user/token`;
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

/*
    method: 
        GET
    url: 
        /api/user/:userName
    parameter: 
        token
    result:
        status
        obj
*/
export const getUserByUserName = (token, userName, cb) => {
    const url = `/api/user/${userName}`;
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
    const url = `/api/auth`;
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
        /api/user
    parameter: 
        null
    result:
        status
*/
export const deleteUser = (token, cb) => {
    const url = `/api/auth`;
    const data = {
        token
    };

    Axios.delete(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};