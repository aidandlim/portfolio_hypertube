import React, { useState, useEffect } from 'react';

import Torrent from '../Torrent';

import { getTorrents } from '../../data';

import './index.css';

const Component = ({ id }) => {
    const [torrentList, setTorrentList] = useState([]);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        getTorrents(id, res => {
            console.log(res);
            if (!isCancelled) {
                if (
                    res !== null &&
                    res.length !== undefined &&
                    res.length > 0
                ) {
                    setTorrentList(res);
                }
                setIsDoneSearch(true);
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [id, setIsDoneSearch]);

    return (
        <div className="torrentList">
            {torrentList.length !== 0
                ? torrentList.map((torrent, index) => (
                    <Torrent torrent={torrent} key={index} />
                ))
                : null}
            {torrentList.length === 0 && isDoneSearch
                ? 'We cannot find out any torrent file :('
                : null}
            {torrentList.length === 0 && !isDoneSearch
                ? 'We are looking for torrent file!'
                : null}
        </div>
    );
};

export default Component;
