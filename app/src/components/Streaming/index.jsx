import React, { useState } from 'react';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

import axios from 'axios';

import './index.css';

const Component = () => {
    const [stream, setStream] = useState('');
    const [start, setStart] = useState(0);
    const [file, setFile] = useState('');

    const _handleAdd = () => {
        axios.get('/add').then(res => {
            console.log(res);
            const data = res.data.find(d => d.name.match('.mp4'));
            setFile(data.name);
        });
    };

    const _handleStream = () => {
        axios.get(`/stream/${file}/${start}/${start + 1000}`).then(res => {
            console.log(res);
            setStream(stream => res.data + stream);
            setStart(start => start + 1000);
        });
    };

    const _handleStats = () => {
        axios.get('/stats').then(res => {
            console.log(res);
        });
    };

    return (
        <div className='streaming'>
            <div className='streaming-video'>
                <Video
                    controls={[
                        'PlayPause',
                        'Seek',
                        'Time',
                        'Volume',
                        'Fullscreen'
                    ]}
                >
                    <source src={stream} type='video/mp4' />
                </Video>
            </div>
            <button onClick={_handleAdd}>add</button>
            <button onClick={_handleStream}>stream</button>
            <button onClick={_handleStats}>stats</button>
        </div>
    );
};

export default Component;
