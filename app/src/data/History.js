import Axios from 'axios';

export const getHistories = (token, cb) => {
    const url = `/api/histories`;
    const data = {
        token
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};

export const getHistory = (token, movieId, cb) => {
    const url = `/api/history`;
    const data = {
        token,
        movieId
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};
