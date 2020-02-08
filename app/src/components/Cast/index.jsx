import React from 'react';

import './index.css';

const Component = ({ cast }) => {
    return (
        <div className='cast'>
            <div
                className='cast-picture'
                style={
                    cast.profile_path !== '' &&
                    cast.profile_path !== null &&
                    cast.profile_path !== undefined
                        ? {
                              backgroundImage: `url('https://image.tmdb.org/t/p/original/${cast.profile_path}')`
                          }
                        : null
                }
            ></div>
            <div className='cast-info'>
                <div className='cast-info-name'>{cast.name}</div>
                <div className='cast-info-role'>{cast.character}</div>
            </div>
        </div>
    );
};

export default Component;
