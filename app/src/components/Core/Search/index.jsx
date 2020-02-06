import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_results } from '../../../actions';

import { getSearch } from '../../../data';

import Movie from '../Feed/Movie';

import './index.css';

const Component = () => {
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();

    let isWorking = false;

    const _handleScroll = e => {
        if (search.page < search.total) {
            if (
                !isWorking &&
                e.target.scrollTop /
                    (e.target.scrollHeight - e.target.clientHeight) >
                    0.9
            ) {
                isWorking = true;
                getSearch(search.query, search.page + 1, res => {
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
        <div className="search" onScroll={_handleScroll}>
            {search.results.map((movie, index) => (
                <Movie movie={movie} key={index} />
            ))}
        </div>
    );
};

export default Component;
