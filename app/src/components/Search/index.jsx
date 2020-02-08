import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_results } from '../../actions';

import { getSearch } from '../../data';

import Movie from '../Movie';

import './index.css';

const Component = () => {
    const ui = useSelector(state => state.ui);
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();

    let isWorking = false;

    useEffect(() => {
        document.querySelector('.searchBar-button').click();
    }, [ui.lang]);

    const _handleScroll = e => {
        if (search.page < search.total) {
            if (
                !isWorking &&
                e.target.scrollTop /
                    (e.target.scrollHeight - e.target.clientHeight) >
                    0.9
            ) {
                isWorking = true;
                getSearch(search.query, search.page + 1, ui.lang, res => {
                    dispatch(
                        search_results({
                            results: [...search.results, ...res.results],
                            page: res.page,
                            total: res.total
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
                {search.query === '' ? ' ' : search.query}"
            </div>
            {search.results.map((movie, index) => (
                <Movie movie={movie} key={index} />
            ))}
        </div>
    );
};

export default Component;
