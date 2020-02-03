import React, { useState, useEffect } from 'react';

import { getMovie } from '../../../data';

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
        status: '',
        poster_path: ''
    });

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
            <div className="detail-container">
                <div className="detail-header">
                    <div className="detail-header-back" onClick={_handleBack}>
                        <Icon name="arrow-left" color="#606060" size={'1rem'} />
                    </div>
                    <div className="detail-header-title">{movie.title}</div>
                    <div className="detail-header-status">
                        {movie.status.toUpperCase()}
                    </div>
                </div>
                <div
                    className="detail-body"
                    style={{
                        backgroundImage:
                            movie.poster_path !== '' &&
                            movie.poster_path !== null
                                ? `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`
                                : ''
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Component;
