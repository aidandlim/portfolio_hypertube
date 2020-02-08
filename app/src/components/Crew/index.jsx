import React from 'react';

import './index.css';

const Component = ({ crew }) => {
    return (
        <div className="crew">
            <div
                className="crew-picture"
                style={
                    crew.profile_path !== '' &&
                    crew.profile_path !== null &&
                    crew.profile_path !== undefined
                        ? {
                              backgroundImage: `url('https://image.tmdb.org/t/p/original/${crew.profile_path}')`
                          }
                        : null
                }
            ></div>
            <div className="crew-info">
                <div className="crew-info-name">{crew.name}</div>
                <div className="crew-info-role">{crew.job}</div>
            </div>
        </div>
    );
};

export default Component;
