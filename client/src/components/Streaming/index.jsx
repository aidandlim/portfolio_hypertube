import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { movie_histories } from '../../actions';

import { DefaultPlayer as Video } from 'react-html5video';

import axios from 'axios';

import Chat from '../Chat';

import { getTorrentSubtitles, getHistories, postHistory } from '../../data';

import FeatherIcon from 'feather-icons-react';
import './index.css';

const Component = ({ match, history }) => {
    const tmdbId = match.params.tmdbId;
    const imdbId = match.params.imdbId;
    const magnet = match.params.magnet;

    const [fileName, setFileName] = useState('');
    const [dirName, setDirName] = useState('');
    const [subtitles, setSubtitles] = useState(undefined);
    const [isVisibleBack, setIsVisibleBack] = useState(true);
    const [watchingHistory, setWatchingHistory] = useState({
        start: 0,
        end: 0
    });

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const ui = useSelector(state => state.ui);
    const movie = useSelector(state => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        getTorrentSubtitles(imdbId, ui.lang, res => {
            if (!isCancelled) {
                setSubtitles(res);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [auth.token, imdbId, ui.lang]);

    useEffect(() => {
        const result = movie.histories.find(history => history.movieId === parseInt(tmdbId));

        if (result !== undefined) {
            setWatchingHistory({
                start: result.current,
                end: result.duration
            });
        }
    }, [movie, tmdbId]);

    useEffect(() => {
        let isCancelled = false;

        axios.get(`/stream/add/${magnet}`).then(res => {
            if (!isCancelled) {
                setFileName(res.data.filename);
                setDirName(res.data.dirname);
            }
        });

        setTimeout(() => {
            if (document.querySelector('.streaming') !== null) {
                setIsVisibleBack(false);
            }
        }, 5000);

        return (current = document.getElementById('streaming') === null ? null : document.getElementById('streaming').currentTime, duration = document.getElementById('streaming') === null ? null : document.getElementById('streaming').duration) => {
            if (!fileName.match('.mkv') && current !== null && current !== undefined && current !== 0 && duration !== null && duration !== undefined && duration !== 0) {
                postHistory(auth.token, tmdbId, current, duration, res => {
                    if (res.status === 200 && user.userName !== '') {
                        getHistories(auth.token, user.userName, res => {
                            if (res.status === 200) {
                                dispatch(movie_histories(res.list));
                            }
                        });
                    }
                });
            }
        };
    }, [dispatch, auth.token, magnet, tmdbId, user.userName, fileName]);

    const _handleBack = () => {
        history.goBack();
    };

    const _handleMouseMove = () => {
        if (document.querySelector('.streaming') !== null) {
            setIsVisibleBack(true);
            setTimeout(() => {
                if (document.querySelector('.streaming') !== null) {
                    setIsVisibleBack(false);
                }
            }, 5000);
        }
    };

    document.title = `Streaming - HyperTube`;

    return (
        <div className='streaming' onMouseMove={_handleMouseMove}>
            <div className={isVisibleBack ? 'streaming-back-active' : 'streaming-back'} onClick={_handleBack}>
                <FeatherIcon icon='arrow-left' color='#AAAAAA' size='3rem' />
            </div>
            {fileName !== '' ? (
                <div className='streaming-container'>
                    <Video id='streaming' controls={fileName.match('.mkv') ? ['PlayPause', 'Volume', 'Fullscreen', 'Captions'] : ['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen', 'Captions']} autoPlay={true}>
                        <source src={fileName.match('.mkv') ? `/stream/mkv/${magnet}/${dirName}/${fileName.replace('mkv', 'mp4')}` : `/stream/normal/${magnet}/${fileName}${watchingHistory.start !== 0 ? '#t=' + watchingHistory.start + ',' + watchingHistory.end : ''}`} type='video/mp4' />
                        {subtitles !== undefined ? <track label={ui.lang === 'en_US' ? 'English' : 'Korean'} kind='subtitles' srcLang={ui.lang === 'en_US' ? 'en' : 'kr'} src={subtitles} default /> : null}
                    </Video>
                </div>
            ) : (
                <div className='streaming-loading'>Loading...</div>
            )}
            <Chat tmdbId={tmdbId} />
        </div>
    );
};

export default Component;
