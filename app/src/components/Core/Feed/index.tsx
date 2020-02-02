import React, { useState, useEffect } from 'react';

import { getMovieWithPopularity } from '../../../data';

import Filter from './Filter';
import Movie from './Movie';

import './index.css';

export interface Props {
    match: {
        params: {
            genre: string;
            filter: string;
        }
    };
}

const Component: React.FC<Props> = ({ match }) => {
    const genre = match.params.genre;
    const filter = match.params.filter;
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovieWithPopularity(genre, filter, (res: []) => {
            setMovies(res);
        });
    }, [genre, filter]);

    return (
        <div className="feed">
            <Filter genre={genre} filter={filter} />
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
    );
};

export default Component;
