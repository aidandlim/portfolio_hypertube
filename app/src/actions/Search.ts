export const search_query = (value: string) => {
    return {
        type: 'SEARCH_QUERY',
        payload: {
            query: value
        }
    };
};

export const search_results = (value: {
    results: any[];
    page: number;
    total: number;
}) => {
    return {
        type: 'SEARCH_RESULTS',
        payload: {
            results: value.results,
            page: value.page,
            total: value.total
        }
    };
};