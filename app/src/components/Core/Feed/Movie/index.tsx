import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import './index.css';

export interface Props {
    movie: {
        poster_path: string;
        genre_ids: string[];
        title: string;
        vote_average: number;
        release_date: string;
        overview: string;
    };
}

const Component: React.FC<Props> = ({ movie }) => {
    const starColor = '#FFEA00';
    const emptyStarColor = '#606060';

    return (
        <div className="movie">
            <div
                className="movie-poster"
                style={{
                    backgroundImage:
                        movie.poster_path !== null
                            ? `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`
                            : ''
                }}
            ></div>
            <div className="movie-info">
                <div className="movie-genre">
                    {movie.genre_ids.map((genre_id, index) => (
                        <div className="movie-genre-name" key={index}>
                            {genre_id}
                        </div>
                    ))}
                </div>
                <div className="movie-title">{movie.title}</div>
                <div className="movie-rate">
                    <StarRatingComponent
                        name="rating"
                        value={movie.vote_average / 2.0}
                        starColor={starColor}
                        emptyStarColor={emptyStarColor}
                        editing={false}
                    />
                </div>
                <div className="movie-release">{movie.release_date}</div>
                <div className="movie-overview">{movie.overview}</div>
            </div>
        </div>
    );
};

export default Component;
