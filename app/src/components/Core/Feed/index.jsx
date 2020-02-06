import React, { useState, useEffect } from 'react';

import { getMovies } from '../../../data';

import Movie from './Movie';
import FilterIcon from './FilterIcon';
import Filter from './Filter';

import './index.css';

const Component = ({ match }) => {
    const genre = match.params.genre;
    const filter = match.params.filter;

    const [movies, setMovies] = useState([]);
    const [isSetting, setIsSetting] = useState(false);

    useEffect(() => {
        getMovies(genre, filter, res => {
            setMovies(res);
        });
    }, [genre, filter]);

    const _handleSetting = () => {
        setIsSetting(isSetting => !isSetting);
    };

    return (
        <div className="feed">
            <div className="feed-container">
                <FilterIcon _handleSetting={_handleSetting} />
                {movies.map((movie, index) => (
                    <Movie movie={movie} key={index} />
                ))}
            </div>
            {isSetting ? (
                <Filter
                    genre={genre}
                    filter={filter}
                    _handleSetting={_handleSetting}
                />
            ) : null}
        </div>
    );
};

export default Component;
