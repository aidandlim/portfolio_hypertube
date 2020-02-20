import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

const Component = ({ torrent }) => {
    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);

    const _handleUserStatus = () => {
        if (auth.token === '') {
            confirmAlert({
                message: ui.lang === 'en_US' ? 'This feature requires SignIn first.' : '로그인이 필요한 서비스입니다.',
                buttons: [
                    {
                        label: 'Okay'
                    }
                ]
            });
        }
    };

    return (
        <Link to={auth.token !== '' ? `/streaming/${torrent.title}/${torrent.download.replace('magnet:?xt=urn:btih:', '').split('&')[0]}` : '/auth/signin'} onClick={_handleUserStatus}>
            <div className='torrent'>
                <div className='torrent-title'>
                    <font className='torrent-title-resolution'>{torrent.title.match('1080') ? '[1080p]' : null}</font>
                    <font className='torrent-title-resolution'>{torrent.title.match('720') ? '[720p]' : null}</font>
                    <font className='torrent-title-resolution'>{!torrent.title.match('1080') && !torrent.title.match('720') ? '[No Data]' : null}</font>
                    &nbsp;&nbsp;
                    {torrent.title}
                </div>
                <div className='torrent-info'>
                    {(torrent.size / 1024 / 1024 / 1024).toFixed(2)}
                    GB
                </div>
                <div className='torrent-division'>l</div>
                <div className='torrent-info'>{torrent.seeders}</div>
                <div className='torrent-division'>l</div>
                <div className='torrent-info'>{torrent.leechers}</div>
            </div>
        </Link>
    );
};

export default Component;
