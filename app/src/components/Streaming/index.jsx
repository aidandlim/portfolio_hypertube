import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Chat from '../Chat';

import './index.css';

const Component = ({ match }) => {
    const id = match.params.id;
    const magnet = match.params.magnet;

    const [movieName, setMovieName] = useState('');

    useEffect(() => {
        axios.get(`/torrent/stream/${magnet}`).then(res => {
            setMovieName(res.data.name);
        });

        return () => {
            console.log('Escape from streaming!');
        };
    }, [magnet]);

    return (
        <div className='streaming'>
            {movieName !== '' ? (
                <video controls autoPlay>
                    <source
                        src={`/torrent/stream/${magnet}/${movieName}`}
                        type='video/mp4'
                    />
                </video>
            ) : null}
            <Chat id={id} />
        </div>
    );
};

export default Component;
