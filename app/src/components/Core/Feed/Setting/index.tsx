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
            <p>Genre</p>
            <Link to={`/feed/all/${filter}`}>
                <button>all</button>
            </Link>
            <Link to={`/feed/action/${filter}`}>
                <button>action</button>
            </Link>
            <Link to={`/feed/adventure/${filter}`}>
                <button>adventure</button>
            </Link>
            <Link to={`/feed/animation/${filter}`}>
                <button>animation</button>
            </Link>
            <Link to={`/feed/comedy/${filter}`}>
                <button>comedy</button>
            </Link>
            <Link to={`/feed/crime/${filter}`}>
                <button>crime</button>
            </Link>
            <Link to={`/feed/documentary/${filter}`}>
                <button>documentary</button>
            </Link>
            <Link to={`/feed/drama/${filter}`}>
                <button>drama</button>
            </Link>
            <Link to={`/feed/family/${filter}`}>
                <button>family</button>
            </Link>
            <Link to={`/feed/fantasy/${filter}`}>
                <button>fantasy</button>
            </Link>
            <Link to={`/feed/history/${filter}`}>
                <button>history</button>
            </Link>
            <Link to={`/feed/horror/${filter}`}>
                <button>horror</button>
            </Link>
            <Link to={`/feed/music/${filter}`}>
                <button>music</button>
            </Link>
            <Link to={`/feed/mystery/${filter}`}>
                <button>mystery</button>
            </Link>
            <Link to={`/feed/romance/${filter}`}>
                <button>romance</button>
            </Link>
            <Link to={`/feed/sciencefiction/${filter}`}>
                <button>sciencefiction</button>
            </Link>
            <Link to={`/feed/tvmovie/${filter}`}>
                <button>tvmovie</button>
            </Link>
            <Link to={`/feed/thriller/${filter}`}>
                <button>thriller</button>
            </Link>
            <Link to={`/feed/war/${filter}`}>
                <button>war</button>
            </Link>
            <Link to={`/feed/western/${filter}`}>
                <button>western</button>
            </Link>
            <p>Sort</p>
            <Link to={`/feed/${genre}/popularity`}>
                <button>popularity</button>
            </Link>
            <Link to={`/feed/${genre}/rating`}>
                <button>rating</button>
            </Link>
            <p>Go back</p>
            <button onClick={_handleSetting}>confirm</button>
        </div>
    );
};

export default Component;
