import React, { useState, useEffect } from 'react';

import { getMovie } from '../../../data';

import StarRatingComponent from 'react-star-rating-component';
import { Icon } from 'ts-react-feather-icons';

import './index.css';

export interface Props {
    match: {
        params: {
            id: number;
        };
    };
    history: any;
}

const Component: React.FC<Props> = ({ match, history }) => {
    const id = match.params.id;
    const [movie, setMovie] = useState({
        title: '',
        overview: '',
        status: '',
        poster_path: '',
        vote_average: 0,
        vote_count: 0,
        genres: [
            {
                name: ''
            }
        ],
        runtime: 0,
        release_date: '',
        production_companies: [
            {
                name: ''
            }
        ]
    });

    const starColor = '#FFEA00';
    const emptyStarColor = '#505050';

    useEffect(() => {
        getMovie(id, res => {
            setMovie(res);
        });
    }, [id]);

    const _handleBack = () => {
        history.goBack();
    };

    return (
        <div className="detail">
            <div
                className="detail-container"
                style={{
                    backgroundImage:
                        movie.poster_path !== '' && movie.poster_path !== null
                            ? `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`
                            : ''
                }}
            >
                <div className="detail-cover">
                    <div className="detail-back" onClick={_handleBack}>
                        <Icon name="arrow-left" color="#AAAAAA" size="3rem" />
                    </div>
                    <div className='detail-play'>WATCHING RIGHT NOW!</div>
                    <div className="detail-info-container">
                        <div className="detail-status">{movie.status}</div>
                        <div className="detail-genres">
                            {movie.genres.map((genre, index) => (
                                <div
                                    className="detail-info-general-italic"
                                    key={index}
                                >
                                    #{genre.name.replace(' ', '_')}
                                </div>
                            ))}
                        </div>
                        <div className="detail-title">{movie.title}</div>
                        <div className="detail-rating-icon">
                            <StarRatingComponent
                                name="rating"
                                value={movie.vote_average / 2.0}
                                starColor={starColor}
                                emptyStarColor={emptyStarColor}
                                editing={false}
                            />
                        </div>
                        <div className="detail-info-general">
                            {movie.vote_average.toFixed(1)}&nbsp;&nbsp;(
                            {movie.vote_count})
                        </div>
                        <div className="detail-info-division">l</div>
                        <div className="detail-info-general">
                            {movie.runtime} minutes
                        </div>
                        <div className="detail-info-division">l</div>
                        <div className="detail-info-general">
                            {movie.release_date}
                        </div>
                        <div className="detail-overview">{movie.overview}</div>
                        <div className="detail-companies">
                        {movie.production_companies.map((company, index) => (
                            <div
                                className="detail-info-general-small"
                                key={index}
                            >
                                {company.name}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component;
