import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Chat from '../Chat';

import FeatherIcon from 'feather-icons-react';
import './index.css';

const Component = ({ match, history }) => {
    const torrent = match.params.torrent;
    const magnet = match.params.magnet;

    const [fileName, setFileName] = useState('');
    const [isVisibleBack, setIsVisibleBack] = useState(true);

    useEffect(() => {
        axios.get(`/stream/add/${magnet}`).then(res => {
            setFileName(res.data.name);
        });

        setTimeout(() => {
            setIsVisibleBack(false);
        }, 5000);

        return () => {
            axios.get(`/stream/delete/${magnet}`);
        };
    }, [magnet]);

    // const _handleTest = () => {
    //     console.log(document.querySelector('.streaming-video').currentTime);
    //     console.log(document.querySelector('.streaming-video').duration);
    // };

    const _handleBack = () => {
        history.goBack();
    };

    const _handleMouseMove = () => {
        setIsVisibleBack(true);
        setTimeout(() => {
            setIsVisibleBack(false);
        }, 5000);
    };

    return (
        <div className='streaming' onMouseMove={_handleMouseMove}>
            <div className={isVisibleBack ? 'streaming-back-active' : 'streaming-back'} onClick={_handleBack}>
                <FeatherIcon icon='arrow-left' color='#AAAAAA' size='3rem' />
            </div>
            {fileName !== '' ? (
                <video className='streaming-video' controls autoPlay={true}>
                    <source src={`/stream/play/${magnet}/${fileName}`} type='video/mp4' />
                </video>
            ) : (
                <div className='streaming-loading'>Loading...</div>
            )}
            <Chat torrent={torrent} />
        </div>
    );
};

export default Component;
