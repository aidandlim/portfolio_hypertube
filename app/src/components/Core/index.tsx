import React, { useState, useEffect } from 'react';

import Axios from 'axios';
import { API } from '../../constants/api';

import './index.css';

export interface Props {}

const Component: React.FC<Props> = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        Axios.get(
            'https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=' +
                API
        ).then(res => {
            console.log(res.data.results[0]);
            setMovies(res.data.results);
        });
    });

    return (
        <div className="core">
            {movies.map(
                (
                    movie: {
                        title: string;
                        vote_average: number;
                        poster_path: string;
                        overview: string;
                    },
                    index: number
                ) => (
                    <div className="movie" key={index}>
                        <div
                            className="movie-poster"
                            style={{
                                backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`
                            }}
                        ></div>
                        <div className="movie-info">
                            <div className="movie-title">{movie.title} ({movie.vote_average})</div>
                            <textarea className="movie-overview">
                                {movie.overview}
                            </textarea>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Component;
