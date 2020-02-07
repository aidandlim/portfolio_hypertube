import React from 'react';

import './index.css';

const Component = ({ genre, filter, _handleFilter }) => {
    return (
        <div className="filter" onClick={_handleFilter}>
            / HyperTube / {genre.toUpperCase()} / {filter.toUpperCase()}
        </div>
    );
};

export default Component;
