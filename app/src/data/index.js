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
    recovery,
    request42Token
} from './Auth';

import {
    getUserByToken,
    getUserByUserName,
    putUser,
    deleteUser
} from './User';

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
    request42Token,
    getUserByToken,
    getUserByUserName,
    putUser,
    deleteUser,
    getHistories,
    getHistory,
    getCommentByMovieId,
    getCommentByUserId,
    postComment,
    deleteComment,
    getTorrents
};
