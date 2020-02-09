import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getSearch, getSearchWithCast, getSearchWithCrew } from '../../data';

import Movie from '../Movie';

import './index.css';

const Component = ({ match }) => {
    const type = match.params.type;
    const query = match.params.query;
    const queryName = match.params.queryName;

    const [result, setResult] = useState({
        results: [],
        page: 1,
        total: 1
    });

    const ui = useSelector(state => state.ui);

    useEffect(() => {
        let isCancelled = false;

        let func = getSearch;

        if (type === 'cast') {
            func = getSearchWithCast;
        }
        if (type === 'crew') {
            func = getSearchWithCrew;
        }

        func(query, 1, ui.lang, res => {
            console.log(res);
            if (!isCancelled) {
                setResult({
                    results: res.results,
                    page: 1,
                    total:
                        type === 'cast' || type === 'crew'
                            ? res.total_pages
                            : res.total
                });
                isCancelled = false;
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [ui.lang, type, query]);

    let isWorking = false;

    const _handleScroll = e => {
        if (result.page < result.total) {
            if (
                !isWorking &&
                e.target.scrollTop /
                    (e.target.scrollHeight - e.target.clientHeight) >
                    0.9
            ) {
                isWorking = true;

                let func = getSearch;

                if (type === 'cast') {
                    func = getSearchWithCast;
                }
                if (type === 'crew') {
                    func = getSearchWithCrew;
                }

                func(query, result.page + 1, ui.lang, res => {
                    setResult({
                        results: [...result.results, ...res.results],
                        page: res.page,
                        total:
                            type === 'cast' || type === 'crew'
                                ? res.total_pages
                                : res.total
                    });
                    isWorking = false;
                });
            }
        }
    };

    return (
        <div className="search" onScroll={_handleScroll}>
            <div className="search-result">
                {ui.lang === 'en_US' ? 'SEARCH RESULT' : '검색결과'} : "
                {type === 'movie' ? query : queryName}"
            </div>
            {result.results.map((movie, index) => (
                <Movie movie={movie} key={index} />
            ))}
        </div>
    );
};

export default Component;
