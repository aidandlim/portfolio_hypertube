import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import Chat from '../Chat';

import { getTorrentSubtitles, postHistory } from '../../data';

import FeatherIcon from 'feather-icons-react';
import './index.css';

const Component = ({ match, history }) => {
    const tmdbId = match.params.tmdbId;
    const imdbId = match.params.imdbId;
    const magnet = match.params.magnet;

    const [fileName, setFileName] = useState('');
    const [subtitles, setSubtitles] = useState(undefined);
    const [isVisibleBack, setIsVisibleBack] = useState(true);

    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);

    useEffect(() => {
        getTorrentSubtitles(imdbId, ui.lang, res => {
            setSubtitles(res);
        });
    }, [imdbId, ui.lang]);

    useEffect(() => {
        axios.get(`/stream/add/${magnet}`).then(res => {
            setFileName(res.data.name);
        });

        setTimeout(() => {
            setIsVisibleBack(false);
        }, 5000);

        return (current = document.getElementById('streaming').currentTime, duration = document.getElementById('streaming').duration) => {
            postHistory(auth.token, tmdbId, current, duration);
        };
    }, [auth.token, magnet, tmdbId]);

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
                <video id='streaming' className='streaming-video' controls autoPlay={true}>
                    <source src={`/stream/play/${magnet}/${fileName}`} type='video/mp4' />
                    {subtitles !== undefined ? <track label='English' kind='subtitles' srcLang={ui.lang === 'en_US' ? 'en' : 'ko'} src={subtitles} /> : null}
                </video>
            ) : (
                <div className='streaming-loading'>Loading...</div>
            )}
            <Chat tmdbId={tmdbId} />
        </div>
    );
};

export default Component;
