import Axios from 'axios';

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
