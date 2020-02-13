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
    request42Access
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
    request42Access,
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
