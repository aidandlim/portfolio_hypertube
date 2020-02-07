import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

const Component = ({ url, title, genre, filter }) => {
    return (
        <Link to={`/feed/${genre}/${url}`}>
            <button
                className={
                    filter === url
                        ? 'sorterButton-active'
                        : 'sorterButton'
                }
            >
                {title}
            </button>
        </Link>
    );
};

export default Component;
