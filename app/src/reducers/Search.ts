const data = {
    results: [],
};

const reducer = (state = data, action: {
    type: string;
    payload: {
        results: [];
    }
}) => {
    switch (action.type) {
        case 'SEARCH_RESULTS':
            return Object.assign({}, state, {
                results: action.payload.results
            });
        default:
            return state;
    }
};

export default reducer;