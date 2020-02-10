import React from 'react';

import UserComment from '../UserComment';

import './index.css';

const Component = () => {
    // const data = [];

    const data = [
        {
            movieId: 419704,
            comment: 'If you\'re visiting this page, you\'re likely here because you\'re searching for a random sentence. Sometimes a random word just isn\'t enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.',
            time: '01-06-2020 17:35'
        },
        {
            movieId: 515001,
            comment: 'If you\'re visiting this page, you\'re likely here because you\'re searching for a random sentence. Sometimes a random word just isn\'t enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.',
            time: '01-07-2020 13:32'
        }
    ];

    return (
        <div className='userComment'>
            {data.length !== 0 ? (
                data.map((data, index) => (
                    <UserComment data={data} key={index} />
                ))
            ) : (
                <div className='userComment-none'>
                    There is no recent watching data
                </div>
            )}
        </div>
    );
};

export default Component;
