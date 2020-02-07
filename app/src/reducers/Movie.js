const data = {
    genres: [],
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'MOVIE_GENRES':
            return Object.assign({}, state, {
                genres: action.payload.genres
            });
        default:
            return state;
    }
};

export default reducer;
