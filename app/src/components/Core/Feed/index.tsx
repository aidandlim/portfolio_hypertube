import React, { useState, useEffect } from 'react';

import { getMovieWithPopularity } from '../../../data';

import Movie from './Movie';
import Filter from './Filter';
import Setting from './Setting';

import './index.css';

export interface Props {
    match: {
        params: {
            genre: string;
            filter: string;
        };
    };
}

const Component: React.FC<Props> = ({ match }) => {
    const genre = match.params.genre;
    const filter = match.params.filter;

    const [movies, setMovies] = useState([]);
    const [isSetting, setIsSetting] = useState(false);

    useEffect(() => {
        getMovieWithPopularity(genre, filter, (res: []) => {
            setMovies(res);
        });
    }, [genre, filter]);

    const _handleSetting = () => {
        setIsSetting(isSetting => !isSetting);
    };

    return (
        <div className="feed">
            <div className="content">
                <Filter _handleSetting={_handleSetting} />
                {movies.map(
                    (
                        movie: {
                            title: string;
                            genre_ids: string[];
                            vote_average: number;
                            release_date: string;
                            poster_path: string;
                            overview: string;
                        },
                        index: number
                    ) => (
                        <Movie movie={movie} key={index} />
                    )
                )}
            </div>
            {isSetting ? (
                <Setting
                    genre={genre}
                    filter={filter}
                    _handleSetting={_handleSetting}
                />
            ) : null}
        </div>
    );
};

export default Component;
