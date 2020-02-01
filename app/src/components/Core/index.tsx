import React, { useState, useEffect } from 'react';

import Axios from 'axios';
import { API } from '../../constants/api';

import StarRatingComponent from 'react-star-rating-component';

import './index.css';

export interface Props {}

const Component: React.FC<Props> = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        Axios.get(
            'https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=' +
                API
        ).then(res => {
            setMovies(res.data.results);
        });
    }, []);

    return (
        <div className="core">
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
                    <div className="movie" key={index}>
                        <div
                            className="movie-poster"
                            style={{
                                backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`
                            }}
                        ></div>
                        <div className="movie-info">
                            <div className="movie-genre">
                                {movie.genre_ids.map((genre_id, index) => (
                                    <div
                                        className="movie-genre-name"
                                        key={index}
                                    >
                                        {genre_id}
                                    </div>
                                ))}
                            </div>
                            <div className="movie-title">{movie.title}</div>
                            <div className="movie-rate">
                                <StarRatingComponent
                                    name="rating"
                                    value={movie.vote_average / 2.0}
                                    starColor="#FFEA00"
                                    emptyStarColor="#606060"
                                    editing={false}
                                />
                            </div>
                            <div className="movie-release">
                                {movie.release_date}
                            </div>
                            <div className="movie-overview">
                                {movie.overview}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Component;
