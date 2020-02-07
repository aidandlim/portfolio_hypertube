import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

const Component = ({ url, title, genre, filter }) => {
    return (
        <Link to={`/feed/${url}/${filter}`}>
            <button
                className={
                    genre === url
                        ? 'genreButton-active'
                        : 'genreButton'
                }
            >
                {title}
            </button>
        </Link>
    );
};

export default Component;
