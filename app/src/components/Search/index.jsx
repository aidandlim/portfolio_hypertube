import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_query, search_results } from '../../actions';

import { getSearch, getMoviesWithCast, getMoviesWithCrew } from '../../data';

import Movie from '../Movie';

import './index.css';

const Component = () => {
    const ui = useSelector(state => state.ui);
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();

    let isWorking = false;

    useEffect(() => {
        // It needs to be updated!
        if (search.type === 'normal') {
            document.querySelector('.searchBar-button').click();
        } else if (search.type === 'cast') {
            getMoviesWithCast(search.query, 1, ui.lang, res => {
                dispatch(
                    search_query({
                        type: 'cast',
                        query: search.query,
                        queryName: search.queryName,
                    })
                );
                dispatch(
                    search_results({
                        results: res.results,
                        page: res.page,
                        total: res.total_pages
                    })
                );
            });
        }else if (search.type === 'crew') {
            getMoviesWithCrew(search.query, 1, ui.lang, res => {
                dispatch(
                    search_query({
                        type: 'crew',
                        query: search.query,
                        queryName: search.queryName,
                    })
                );
                dispatch(
                    search_results({
                        results: res.results,
                        page: res.page,
                        total: res.total_pages
                    })
                );
            });
        }
    }, [ui.lang, dispatch]);

    const _handleScroll = e => {
        if (search.page < search.total) {
            if (
                !isWorking &&
                e.target.scrollTop /
                    (e.target.scrollHeight - e.target.clientHeight) >
                    0.9
            ) {
                isWorking = true;

                let func = getSearch;

                if (search.type === 'cast') {
                    func = getMoviesWithCast;
                }
                if (search.type === 'crew') {
                    func = getMoviesWithCrew;
                }

                func(search.query, search.page + 1, ui.lang, res => {
                    dispatch(
                        search_results({
                            results: [...search.results, ...res.results],
                            page: res.page,
                            total:
                                search.type === 'cast' || search.type === 'crew'
                                    ? res.total_pages
                                    : res.total
                        })
                    );
                    isWorking = false;
                });
            }
        }
    };

    return (
        <div className='search' onScroll={_handleScroll}>
            <div className='search-result'>
                {ui.lang === 'en_US' ? 'SEARCH RESULT' : '검색결과'} : "
                {search.query === '' ? ' ' : search.type === 'normal' ? search.query : search.queryName}"
            </div>
            {search.results.map((movie, index) => (
                <Movie movie={movie} key={index} />
            ))}
        </div>
    );
};

export default Component;
