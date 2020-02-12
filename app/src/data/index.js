import {
    apiGenres,
    apiMovies,
    apiMovie,
    apiMovieDetail,
    apiSimilarMovies,
    apiRecommendationMovies,
    apiSearch,
    apiSearchWithCast,
    apiSearchWithCrew,
    apiSearchWithCompany
} from './API';

import {
    checkToken,
    signin,
    getUserName,
    getEmail,
    signup,
    recovery
} from './Auth';

import { getHistories, getHistory } from './History';

import {
    getCommentByMovieId,
    getCommentByUserId,
    postComment,
    deleteComment
} from './Comment';

import { getTorrents } from './Torrent';

export {
    apiGenres,
    apiMovies,
    apiMovie,
    apiMovieDetail,
    apiSimilarMovies,
    apiRecommendationMovies,
    apiSearch,
    apiSearchWithCast,
    apiSearchWithCrew,
    apiSearchWithCompany,
    checkToken,
    signin,
    getUserName,
    getEmail,
    signup,
    recovery,
    getHistories,
    getHistory,
    getCommentByMovieId,
    getCommentByUserId,
    postComment,
    deleteComment,
    getTorrents
};
