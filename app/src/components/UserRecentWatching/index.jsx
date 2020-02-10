import React from 'react';

import UserRecentWatchingMovie from '../UserRecentWatchingMovie';

import './index.css';

const Component = () => {
    // const data = [];

    const data = [
        {
            movieId: 419704,
            time: '01-06-2020 17:35'
        },
        {
            movieId: 515001,
            time: '01-07-2020 13:32'
        },
        {
            movieId: 530915,
            time: '01-08-2020 09:17'
        },
        {
            movieId: 331482,
            time: '01-09-2020 03:30'
        },
        {
            movieId: 438259,
            time: '01-10-2020 05:42'
        }
    ];

    return (
        <div className='userRecentWatching'>
            {data.length !== 0 ? (
                data.map((data, index) => (
                    <UserRecentWatchingMovie data={data} key={index} />
                ))
            ) : (
                <div className='userRecentWatching-none'>
                    There is no recent watching data
                </div>
            )}
        </div>
    );
};

export default Component;
