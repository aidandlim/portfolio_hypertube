import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getMovies } from '../../data';

import Movie from '../Movie';
import FilterIcon from '../FilterIcon';
import Filter from '../Filter';

import './index.css';

const Component = ({ match }) => {
    const genre = match.params.genre;
    const filter = match.params.filter;

    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const ui = useSelector(state => state.ui);

    let isCancelled = false;

    useEffect(
        isCancelled => {
            getMovies(genre, filter, 1, ui.lang, res => {
                if (!isCancelled && res !== null) {
                    setMovies(res);
                    setPage(page => page + 1);
                }
            });
            return () => {
                isCancelled = true;
            };
        },
        [genre, filter, ui.lang]
    );

    let isWorking = false;

    const _handleScroll = e => {
        if (
            !isWorking &&
            e.target.scrollTop /
                (e.target.scrollHeight - e.target.clientHeight) >
                0.9
        ) {
            isWorking = true;
            getMovies(genre, filter, page, ui.lang, res => {
                if (!isCancelled && res !== null) {
                    setMovies([...movies, ...res]);
                    setPage(page => page + 1);
                }
                isWorking = false;
            });
        }
    };

    const _handleFilter = () => {
        setIsOpenFilter(isOpenFilter => !isOpenFilter);
    };

    return (
        <div className="feed" onScroll={_handleScroll}>
            <div className="feed-container">
                <FilterIcon genre={genre} filter={filter} _handleFilter={_handleFilter} />
                {movies.map((movie, index) => (
                    <Movie movie={movie} key={index} />
                ))}
            </div>
            {isOpenFilter ? (
                <Filter
                    genre={genre}
                    filter={filter}
                    _handleFilter={_handleFilter}
                />
            ) : null}
        </div>
    );
};

export default Component;
