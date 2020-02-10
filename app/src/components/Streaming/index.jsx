import React from 'react';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

import Chat from '../Chat';

import './index.css';

const Component = ({ match }) => {
    const id = match.params.id;

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
                ></Video>
            </div>
            <Chat id={id} />
        </div>
    );
};

export default Component;
