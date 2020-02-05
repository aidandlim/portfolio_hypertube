import Axios from 'axios';
import { API } from '../constants/api';

export const getSearch = (
    query: string,
    page: number,
    cb: (result?: { results: []; page: number; total: number }) => void
) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${query}&page=${page}`;

    Axios.get(url)
        .then(
            (res: {
                data: { results: []; page: number; total_pages: number };
            }) => {
                cb({
                    results: res.data.results,
                    page: res.data.page,
                    total: res.data.total_pages
                });
            }
        )
        .catch(() => {
            cb(null);
        });
};
