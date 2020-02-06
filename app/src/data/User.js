import Axios from 'axios';

export const signin = (userName, password, cb) => {
    let url = `/api/auth?userName=${userName}&password=${password}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};
