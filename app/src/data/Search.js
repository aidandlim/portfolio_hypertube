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
