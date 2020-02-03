import Axios from 'axios';
import { API } from '../constants/api';

export const getMovies = (
    genre: string,
    filter: string,
    cb: (result: []) => void
) => {
    let url = 'https://api.themoviedb.org/4/discover/movie?api_key=' + API;

    if (genre === 'action') url += '&with_genres=28';
    else if (genre === 'adventure') url += '&with_genres=12';
    else if (genre === 'animation') url += '&with_genres=16';
    else if (genre === 'comedy') url += '&with_genres=35';
    else if (genre === 'crime') url += '&with_genres=80';
    else if (genre === 'documentary') url += '&with_genres=99';
    else if (genre === 'drama') url += '&with_genres=18';
    else if (genre === 'family') url += '&with_genres=10751';
    else if (genre === 'fantasy') url += '&with_genres=14';
    else if (genre === 'history') url += '&with_genres=36';
    else if (genre === 'horror') url += '&with_genres=27';
    else if (genre === 'music') url += '&with_genres=10402';
    else if (genre === 'mystery') url += '&with_genres=9648';
    else if (genre === 'romance') url += '&with_genres=10749';
    else if (genre === 'sciencefiction') url += '&with_genres=878';
    else if (genre === 'tvmovie') url += '&with_genres=10770';
    else if (genre === 'thriller') url += '&with_genres=53';
    else if (genre === 'war') url += '&with_genres=10752';
    else if (genre === 'western') url += '&with_genres=37';

    if (filter === 'popularity') url += '&sort_by=popularity.desc';
    else if (filter === 'rating') url += '&sort_by=vote_average.desc';
    else if (filter === 'revenue') url += '&sort_by=revenue.desc';

    console.log(url);

    Axios.get(url)
        .then(res => {
            cb(res.data.results);
        })
        .catch(() => {
            cb([]);
        });
};

export const getMovie = (
    id: number,
    cb: (result: {
        title: string,
        status: string,
        poster_path: string,
    }) => void
) => {
    let url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API;

    Axios.get(url)
        .then(res => {
            console.log(res.data);
            cb(res.data);
        })
        .catch(() => {
            cb({
                title: '',
                status: '',
                poster_path: '',
            });
        });
};
