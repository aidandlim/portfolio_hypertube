import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Chat from '../Chat';

import { getTorrentSubtitles } from '../../data';

import FeatherIcon from 'feather-icons-react';
import './index.css';

const Component = ({ match, history }) => {
    const id = match.params.id;
    const magnet = match.params.magnet;

    const [fileName, setFileName] = useState('');
    const [subtitles, setSubtitles] = useState(undefined);
    const [isVisibleBack, setIsVisibleBack] = useState(true);

    useEffect(() => {
        getTorrentSubtitles(id, res => {
            setSubtitles(res);
        });

        axios.get(`/stream/add/${magnet}`).then(res => {
            setFileName(res.data.name);
        });

        setTimeout(() => {
            setIsVisibleBack(false);
        }, 5000);

        return () => {
            console.log('Bye');
        };
    }, [magnet]);

    const _handleBack = () => {
        history.goBack();
    };

    const _handleMouseMove = () => {
        setIsVisibleBack(true);
        setTimeout(() => {
            setIsVisibleBack(false);
        }, 5000);
    };

    document.title = `Streaming - HyperTube`;

    return (
        <div className='streaming' onMouseMove={_handleMouseMove}>
            <div className={isVisibleBack ? 'streaming-back-active' : 'streaming-back'} onClick={_handleBack}>
                <FeatherIcon icon='arrow-left' color='#AAAAAA' size='3rem' />
            </div>
            {fileName !== '' ? (
                <video className='streaming-video' controls autoPlay={true}>
                    <source src={`/stream/play/${magnet}/${fileName}`} type='video/mp4' />
                    {subtitles !== undefined ? <track label='English' kind='subtitles' srcLang='en' src={subtitles} default /> : null}
                </video>
            ) : (
                <div className='streaming-loading'>Loading...</div>
            )}
            <Chat id={id} />
        </div>
    );
};

export default Component;
