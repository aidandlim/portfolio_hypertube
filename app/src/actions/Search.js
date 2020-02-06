export const search_query = value => {
    return {
        type: 'SEARCH_QUERY',
        payload: {
            query: value
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
