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
    oAuth,
} from './Auth';

import {
    requestGoogleCode,
    requestGoogleProfile,
    requestFacebookCode,
    requestFacebookProfile,
    request42Code,
    request42Profile
} from './oAuth';

import {
    getUserByToken,
    getUserByUserName,
    putUser,
    deleteUser
} from './User';

import { getHistories, getHistoriesByUserName, getHistory } from './History';

import {
    getCommentsByMovieId,
    getCommentsByUserId,
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
    oAuth,
    recovery,
    requestGoogleCode,
    requestGoogleProfile,
    requestFacebookCode,
    requestFacebookProfile,
    request42Code,
    request42Profile,
    getUserByToken,
    getUserByUserName,
    putUser,
    deleteUser,
    getHistories,
    getHistory,
    getHistoriesByUserName,
    getCommentsByMovieId,
    getCommentsByUserId,
    postComment,
    deleteComment,
    getTorrents
};
