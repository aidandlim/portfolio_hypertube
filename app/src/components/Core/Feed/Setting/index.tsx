import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

export interface Props {
    genre: string;
    filter: string;
    _handleSetting: () => void;
}

const Component: React.FC<Props> = ({ genre, filter, _handleSetting }) => {
    return (
        <div className="setting">
            <div className="setting-container">
                <div className="setting-title">GENRE</div>
                <div className="setting-element-container">
                    <Link to={`/feed/all/${filter}`}>
                        <button
                            className={
                                genre === 'all'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            ALL
                        </button>
                    </Link>
                    <Link to={`/feed/action/${filter}`}>
                        <button
                            className={
                                genre === 'action'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            ACTION
                        </button>
                    </Link>
                    <Link to={`/feed/adventure/${filter}`}>
                        <button
                            className={
                                genre === 'adventure'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            ADVENTURE
                        </button>
                    </Link>
                    <Link to={`/feed/animation/${filter}`}>
                        <button
                            className={
                                genre === 'animation'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            ANIMATION
                        </button>
                    </Link>
                    <Link to={`/feed/comedy/${filter}`}>
                        <button
                            className={
                                genre === 'comedy'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            COMEDY
                        </button>
                    </Link>
                    <Link to={`/feed/crime/${filter}`}>
                        <button
                            className={
                                genre === 'crime'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            CRIME
                        </button>
                    </Link>
                    <Link to={`/feed/documentary/${filter}`}>
                        <button
                            className={
                                genre === 'documentary'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            DOCUMENTARY
                        </button>
                    </Link>
                    <Link to={`/feed/drama/${filter}`}>
                        <button
                            className={
                                genre === 'drama'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            DRAMA
                        </button>
                    </Link>
                    <Link to={`/feed/family/${filter}`}>
                        <button
                            className={
                                genre === 'family'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            FAMILY
                        </button>
                    </Link>
                    <Link to={`/feed/fantasy/${filter}`}>
                        <button
                            className={
                                genre === 'fantasy'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            FANTASY
                        </button>
                    </Link>
                    <Link to={`/feed/history/${filter}`}>
                        <button
                            className={
                                genre === 'history'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            HISTORY
                        </button>
                    </Link>
                    <Link to={`/feed/horror/${filter}`}>
                        <button
                            className={
                                genre === 'horror'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            HORROR
                        </button>
                    </Link>
                    <Link to={`/feed/music/${filter}`}>
                        <button
                            className={
                                genre === 'music'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            MUSIC
                        </button>
                    </Link>
                    <Link to={`/feed/mystery/${filter}`}>
                        <button
                            className={
                                genre === 'mystery'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            MYSTERY
                        </button>
                    </Link>
                    <Link to={`/feed/romance/${filter}`}>
                        <button
                            className={
                                genre === 'romance'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            ROMANCE
                        </button>
                    </Link>
                    <Link to={`/feed/sciencefiction/${filter}`}>
                        <button
                            className={
                                genre === 'sciencefiction'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            SCIENCE FICTION
                        </button>
                    </Link>
                    <Link to={`/feed/tvmovie/${filter}`}>
                        <button
                            className={
                                genre === 'tvmovie'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            TV MOVIE
                        </button>
                    </Link>
                    <Link to={`/feed/thriller/${filter}`}>
                        <button
                            className={
                                genre === 'thriller'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            THRILLER
                        </button>
                    </Link>
                    <Link to={`/feed/war/${filter}`}>
                        <button
                            className={
                                genre === 'war'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            WAR
                        </button>
                    </Link>
                    <Link to={`/feed/western/${filter}`}>
                        <button
                            className={
                                genre === 'western'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            WESTERN
                        </button>
                    </Link>
                </div>
                <div className="setting-title">SORT BY</div>
                <div className="setting-element-container">
                    <Link to={`/feed/${genre}/popularity`}>
                        <button
                            className={
                                filter === 'popularity'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            POPULARITY
                        </button>
                    </Link>
                    <Link to={`/feed/${genre}/rating`}>
                        <button
                            className={
                                filter === 'rating'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            RATING
                        </button>
                    </Link>
                    <Link to={`/feed/${genre}/revenue`}>
                        <button
                            className={
                                filter === 'revenue'
                                    ? 'setting-element-active'
                                    : 'setting-element'
                            }
                        >
                            REVENUE
                        </button>
                    </Link>
                </div>
                <button className='setting-confirm' onClick={_handleSetting}>CONFIRM</button>
            </div>
        </div>
    );
};

export default Component;
