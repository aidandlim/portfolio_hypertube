import Axios from 'axios';

export const getHistories = (token, userName, cb) => {
    const url = `/api/history/userName`;
    const data = {
        token,
        userName
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

export const postHistory = (token, movieId, current, duration, cb) => {
    const url = `/api/history`;
    const data = {
        token,
        movieId,
        current,
        duration
    };

    Axios.post(url, data)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
}
