import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

const Component = ({ torrent }) => {
    return (
        <Link to="/streaming">
            <div className="torrentFile">
                <div className="torrentFile-title">{torrent.title}</div>
                <div className="torrentFile-info">
                    {(torrent.size / 1024 / 1024 / 1024).toFixed(2)}
                    GB
                </div>
                <div className="torrentFile-division">l</div>
                <div className="torrentFile-info">{torrent.seeders}</div>
                <div className="torrentFile-division">l</div>
                <div className="torrentFile-info">{torrent.leechers}</div>
            </div>
        </Link>
    );
};

export default Component;
