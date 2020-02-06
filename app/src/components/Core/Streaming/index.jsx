import React from 'react';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

// import TestVideo from '../../../assets/video/test_mkv.mkv';
import TestVideo from '../../../assets/video/test_mp4.mp4';

import './index.css';

const Component = () => {
    return (
        <div className="streaming">
            <div className="streaming-video">
                <Video
                    controls={[
                        'PlayPause',
                        'Seek',
                        'Time',
                        'Volume',
                        'Fullscreen'
                    ]}
                >
                    <source src={TestVideo} type="video/mp4" />
                </Video>
            </div>
        </div>
    );
};

export default Component;
