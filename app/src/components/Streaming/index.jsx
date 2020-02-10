import React, { useEffect } from 'react';

import Chat from '../Chat';

import './index.css';

const Component = ({ match }) => {
    const id = match.params.id;
    // const magnet = match.params.magnet;

    useEffect(() => {
        return () => {
            console.log('Escape from streaming!');
        };
    }, []);

    return (
        <div className='streaming'>
            <div className='streaming-video'>
                
            </div>
            <Chat id={id} />
        </div>
    );
};

export default Component;
