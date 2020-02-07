export const movie_genres = value => {
    return {
        type: 'MOVIE_GENRES',
        payload: {
            genres: value
        }
    };
};