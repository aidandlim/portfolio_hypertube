import Axios from 'axios';
import { API } from '../constants/api';

export const getGenres = (lang, cb) => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=${lang}`;

    Axios.get(url)
        .then(res => {
            cb(res.data.genres);
        })
        .catch(() => {
            cb(null);
        });
};

export const getMovies = (genre, filter, page, lang, cb) => {
    let url = `https://api.themoviedb.org/4/discover/movie?api_key=${API}&page=${page}&language=${
        lang === 'en_US' ? 'en-US' : 'ko-KR'
    }`;

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
    else if (filter === 'trend_day')
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API}&page=${page}&language=${
            lang === 'en_US' ? 'en-US' : 'ko-KR'
        }`;
    else if (filter === 'trend_week')
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API}&page=${page}&language=${
            lang === 'en_US' ? 'en-US' : 'ko-KR'
        }`;
    else if (filter === 'now_playing')
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&page=${page}&language=${
            lang === 'en_US' ? 'en-US' : 'ko-KR'
        }`;
    else if (filter === 'upcoming')
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&page=${page}&region=US&language=${
            lang === 'en_US' ? 'en-US' : 'ko-KR'
        }`;

    Axios.get(url)
        .then(res => {
            cb(res.data.results);
        })
        .catch(() => {
            cb(null);
        });
};

export const getMovie = (id, lang, cb) => {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=${lang}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });
};

export const getMovieDetail = (id, lang, cb) => {
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}&language=${
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

export const getSimilarMovies = (id, lang, cb) => {
    let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API}&language=${
        lang === 'en_US' ? 'en-US' : 'ko-KR'
    }`;

    Axios.get(url)
        .then(res => {
            cb(res.data.results);
        })
        .catch(() => {
            cb(null);
        });
};

export const getRecommendationMovies = (id, lang, cb) => {
    let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API}&language=${
        lang === 'en_US' ? 'en-US' : 'ko-KR'
    }`;

    Axios.get(url)
        .then(res => {
            cb(res.data.results);
        })
        .catch(() => {
            cb(null);
        });
};

export const getMovieComment = (id, cb) => {
    // let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}&language=${lang === 'en_US' ? 'en-US' : 'ko-KR'}`;

    // Axios.get(url)
    //     .then(res => {
    //         cb(res.data);
    //     })
    //     .catch(() => {
    //         cb(null);
    //     });
    cb([
        {
            name: 'Aidan Lim',
            picture: null,
            comment:
                "If you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways. For those writers who have writers' block, this can be an excellent way to take a step to crumbling those walls. By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project they're working on in a different light and perspective. Sometimes all it takes is to get that first sentence down to help break the block.",
            time: '01-06-2020 03:30'
        },
        {
            name: 'Luke Kim',
            picture: null,
            comment:
                'For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.',
            time: '01-06-2020 05:32'
        }
    ]);
};