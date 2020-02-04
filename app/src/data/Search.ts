import Axios from 'axios';
import { API } from '../constants/api';

export const search = (
    query: string,
    cb: (result: []) => void
) => {
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API + '&query=' + query;


    Axios.get(url)
        .then(res => {
            cb(res.data.results);
        })
        .catch(() => {
            cb([]);
        });
};