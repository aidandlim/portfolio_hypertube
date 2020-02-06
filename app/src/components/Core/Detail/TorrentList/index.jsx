import React, { useState, useEffect } from 'react';

import { getTorrents } from '../../../../data';

import './index.css';

const Component = ({
    id,
    isOpenTorrentList,
    isDoneSearch,
    setIsDoneSearch
}) => {
    const [torrentList, setTorrentList] = useState([]);

    useEffect(() => {
        let isCancelled = false;

        getTorrents(id, res => {
            if (!isCancelled) {
                if (res.length !== undefined && res.length > 0) {
                    setTorrentList(res);
                }
                setIsDoneSearch(true);
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [id, setIsDoneSearch]);

    return isOpenTorrentList ? (
        <div className="torrentList">
            {torrentList.length !== 0
                ? torrentList.map((torrent, index) => (
                      <div
                          className="torrentList-file"
                          key={index}
                          onClick={() => window.open(torrent.download)}
                      >
                          <div className="torrentList-title">
                              {torrent.title}
                          </div>
                          <div className="torrentList-info">
                              {(torrent.size / 1024 / 1024 / 1024).toFixed(2)}
                              GB
                          </div>
                          <div className="torrentList-division">l</div>
                          <div className="torrentList-info">
                              {torrent.seeders}
                          </div>
                          <div className="torrentList-division">l</div>
                          <div className="torrentList-info">
                              {torrent.leechers}
                          </div>
                      </div>
                  ))
                : isDoneSearch
                ? 'We cannot find out any torrent file :('
                : 'We are looking for torrent file!'}
        </div>
    ) : null;
};

export default Component;
