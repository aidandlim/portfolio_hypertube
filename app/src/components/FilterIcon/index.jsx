import React from 'react';

import './index.css';

const Component = ({ genre, filter, _handleFilter }) => {
    return (
        <div className="filterIcon" onClick={_handleFilter}>
            / HyperTube / {genre.toUpperCase()} / {filter.toUpperCase()}
        </div>
    );
};

export default Component;
