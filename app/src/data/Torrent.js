import Axios from 'axios';

export const getTorrents = (id, cb) => {
    let url = `/search/${id}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};
