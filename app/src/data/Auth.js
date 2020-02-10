// import Axios from 'axios';

export const signin = (userName, password, cb) => {
    // let url = `/api/auth?userName=${userName}&password=${password}`;

    // Axios.get(url)
    //     .then(res => {
    //         cb(res.data);
    //     })
    //     .catch(() => {
    //         cb(0);
    //     });

    cb('VALIDTOKEN');
};

export const signup = (userName, password, email, firstName, lastName, cb) => {
    // let url = `/api/auth`;

    // Axios.post(url, {
    //     userName,
    //     password,
    //     email,
    //     firstName,
    //     lastName
    // })
    //     .then(res => {
    //         cb(res.data);
    //     })
    //     .catch(() => {
    //         cb(0);
    //     });

    cb(1);
};
