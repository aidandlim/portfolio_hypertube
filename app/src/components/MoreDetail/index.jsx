import React, { useState } from 'react';

import CastList from '../CastList';
import CrewList from '../CrewList';
import SimilarList from '../SimilarList';
import TorrentList from '../TorrentList';

import './index.css';

const Component = ({ id, setIsOpenDetail }) => {
    const [nav, setNav] = useState(0);

    return (
        <div className="moreDetail">
            <div className="moreDetail-header">
                <div
                    className={
                        nav === 0
                            ? 'moreDetail-header-nav-active'
                            : 'moreDetail-header-nav'
                    }
                    onClick={() => setNav(0)}
                >
                    CASTING
                </div>
                <div
                    className={
                        nav === 1
                            ? 'moreDetail-header-nav-active'
                            : 'moreDetail-header-nav'
                    }
                    onClick={() => setNav(1)}
                >
                    PRODUCER
                </div>
                <div
                    className={
                        nav === 2
                            ? 'moreDetail-header-nav-active'
                            : 'moreDetail-header-nav'
                    }
                    onClick={() => setNav(2)}
                >
                    SIMILAR MOVIE
                </div>
                <div
                    className={
                        nav === 3
                            ? 'moreDetail-header-nav-active'
                            : 'moreDetail-header-nav'
                    }
                    onClick={() => setNav(3)}
                >
                    TORRENT
                </div>
            </div>
            <div className="moreDetail-body">
                {nav === 0 ? <CastList id={id} /> : null}
                {nav === 1 ? <CrewList id={id} /> : null}
                {nav === 2 ? <SimilarList id={id} setIsOpenDetail={setIsOpenDetail} /> : null}
                {nav === 3 ? <TorrentList id={id} /> : null}
            </div>
        </div>
    );
};

export default Component;
