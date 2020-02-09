export const search_query = value => {
    return {
        type: 'SEARCH_QUERY',
        payload: {
            type: value.type,
            query: value.query,
            queryName: value.queryName
        }
    };
};

export const search_results = value => {
    return {
        type: 'SEARCH_RESULTS',
        payload: {
            results: value.results,
            page: value.page,
            total: value.total
        }
    };
};
