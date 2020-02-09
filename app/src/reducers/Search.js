const data = {
    type: 'normal',
    query: '',
    queryName: '',
    results: [],
    page: 1,
    total: 0
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'SEARCH_QUERY':
            return Object.assign({}, state, {
                type: action.payload.type,
                query: action.payload.query,
                queryName: action.payload.queryName,
            });
        case 'SEARCH_RESULTS':
            return Object.assign({}, state, {
                results: action.payload.results,
                page: action.payload.page,
                total: action.payload.total
            });
        default:
            return state;
    }
};

export default reducer;
