import Axios from 'axios';

export const getUserByToken = (token, cb) => {
    const url = `/api/user`;
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

    // cb({
    //     userName: 'aidan',
    //     firstName: 'Aidan',
    //     lastName: 'Lim',
    // });
};

export const getUserByUserName = (token, userName, cb) => {
    const url = `/api/user/userName`;
    const data = {
        token,
        userName
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });

    // cb({
    //     userName: 'aidan',
    //     firstName: 'Aidan',
    //     lastName: 'Lim',
    // });
};

export const putUser = (token, password, email, firstName, lastName, cb) => {
    let url = `/api/auth`;
    const data = {
        token,
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

    // cb(1);
};

export const deleteUser = (token, cb) => {
    let url = `/api/auth`;
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

    // cb(1);
};
