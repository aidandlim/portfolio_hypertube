import Axios from 'axios';

export const getTorrents = (id, cb) => {
    let url = `/torrent/search/${id}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb({
                status: 400
            });
        });
};

export const getTorrentSubtitles = (id, lang, cb) => {
    let url = `/torrent/subtitle/${id}/${lang}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb({
                status: 400
            });
        });
};
