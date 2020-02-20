import Axios from 'axios';

export const getTorrents = (id, cb) => {
    let url = `/torrent/search/${id}`;

    console.log(url);

    Axios.get(url)
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(() => {
            cb({
                status: 400
            });
        });
};
