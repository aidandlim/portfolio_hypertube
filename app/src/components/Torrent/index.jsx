import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

const Component = ({ torrent }) => {
    return (
        <Link to='/streaming'>
            <div className='torrent'>
                <div className='torrent-title'>{torrent.title}</div>
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
