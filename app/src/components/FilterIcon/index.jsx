import React from 'react';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = ({ _handleSetting }) => {
    return (
        <div className="filter">
            <div className="filter-icon" onClick={_handleSetting}>
                <FeatherIcon icon="filter" color="gray" size={20} />
            </div>
        </div>
    );
};

export default Component;
