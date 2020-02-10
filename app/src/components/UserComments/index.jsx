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
            comment: 'For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.',
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
