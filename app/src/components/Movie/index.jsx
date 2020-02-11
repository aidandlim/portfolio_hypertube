import React from 'react';

import { Link } from 'react-router-dom';

import GenreInfo from '../GenreInfo';

import StarIcon from 'react-star-rating-component';

import image_default from '../../assets/images/image_default.png';

import './index.css';

const Component = ({ movie }) => {
    const starColor = '#FFEA00';
    const emptyStarColor = '#505050';

    return (
        <Link to={`/detail/${movie.id}`}>
            <div className='movie'>
                <div
                    className='movie-poster'
                    style={{
                        backgroundImage:
                            movie.poster_path !== null
                                ? `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`
                                : `url('${image_default}')`
                    }}
                ></div>
                <div className='movie-info'>
                    <div className='movie-genre'>
                        <GenreInfo genre_ids={movie.genre_ids} />
                    </div>
                    <div className='movie-title'>{movie.title}</div>
                    <div className='movie-rate'>
                        <StarIcon
                            name='rating'
                            value={movie.vote_average / 2.0}
                            starColor={starColor}
                            emptyStarColor={emptyStarColor}
                            editing={false}
                        />
                    </div>
                    <div className='movie-release'>{movie.release_date}</div>
                    <div className='movie-overview'>{movie.overview}</div>
                </div>
            </div>
        </Link>
    );
};

export default Component;
