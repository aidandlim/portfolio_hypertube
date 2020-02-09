import Axios from 'axios';
import { API } from '../constants/api';

export const getSearch = (query, page, lang, cb) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${query}&page=${page}&language=${lang === 'en_US' ? 'en-US' : 'ko-KR'}`;

    Axios.get(url)
        .then(res => {
            cb({
                results: res.data.results,
                page: res.data.page,
                total: res.data.total_pages
            });
        })
        .catch(() => {
            cb(null);
        });
};

export const getSearchWithCast = (id, page, lang, cb) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_cast=${id}&page=${page}&language=${
        lang === 'en_US' ? 'en-US' : 'ko-KR'
    }`;

    Axios.get(url)
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};

export const getSearchWithCrew = (id, page, lang, cb) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_crew=${id}&page=${page}&language=${
        lang === 'en_US' ? 'en-US' : 'ko-KR'
    }`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};

