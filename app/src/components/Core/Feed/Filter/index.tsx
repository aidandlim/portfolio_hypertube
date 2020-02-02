import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

export interface Props {
    genre: string;
    filter: string;
}

const Component: React.FC<Props> = ({ genre, filter }) => {
    return (
        <div className="filter">
            <div className="filter-button filter-genre-button">
                Genre: {genre}
            </div>
            <Link
                to={`/feed/${genre}/${
                    filter === 'popularity' ? 'rating' : 'popularity'
                }`}
            >
                <div className="filter-button filter-sorter-button">
                    Sort: {filter}
                </div>
            </Link>
        </div>
    );
};

export default Component;
