import React from 'react';

import GenreButton from '../GenreButton';
import SorterButton from '../SorterButton';

import './index.css';

const Component = ({ genre, filter, _handleSetting }) => {
    const genres = [
        {
            url: 'all',
            title: 'ALL'
        },
        {
            url: 'action',
            title: 'ACTION'
        },
        {
            url: 'adventure',
            title: 'ADVENTURE'
        },
        {
            url: 'animation',
            title: 'ANIMATION'
        },
        {
            url: 'comedy',
            title: 'COMEDY'
        },
        {
            url: 'crime',
            title: 'CRIME'
        },
        {
            url: 'documentary',
            title: 'DOCUMENTARY'
        },
        {
            url: 'drama',
            title: 'DRAMA'
        },
        {
            url: 'family',
            title: 'FAMILY'
        },
        {
            url: 'fantasy',
            title: 'FANTASY'
        },
        {
            url: 'history',
            title: 'HISTORY'
        },
        {
            url: 'horror',
            title: 'HORROR'
        },
        {
            url: 'music',
            title: 'MUSIC'
        },
        {
            url: 'mystery',
            title: 'MYSTERY'
        },
        {
            url: 'romance',
            title: 'ROMANCE'
        },
        {
            url: 'sciencefiction',
            title: 'SCIENCE FICTION'
        },
        {
            url: 'tvmovie',
            title: 'TV MOVIE'
        },
        {
            url: 'thriller',
            title: 'THRILLER'
        },
        {
            url: 'war',
            title: 'WAR'
        },
        {
            url: 'western',
            title: 'WESTERN'
        }
    ];

    const sorters = [
        {
            url: 'popularity',
            title: 'POPULARITY'
        },
        {
            url: 'rating',
            title: 'RATING'
        },
        {
            url: 'revenue',
            title: 'REVENUE'
        }
    ];

    return (
        <div className="setting">
            <div className="setting-container">
                <div className="setting-title">GENRE</div>
                <div className="setting-element-container">
                    {genres.map((element, index) => (
                        <GenreButton
                            url={element.url}
                            title={element.title}
                            genre={genre}
                            filter={filter}
                            key={index}
                        />
                    ))}
                </div>
                <div className="setting-title">SORT BY</div>
                <div className="setting-element-container">
                    {sorters.map((element, index) => (
                        <SorterButton
                            url={element.url}
                            title={element.title}
                            genre={genre}
                            filter={filter}
                            key={index}
                        />
                    ))}
                </div>
                <button className="setting-confirm" onClick={_handleSetting}>
                    CONFIRM
                </button>
            </div>
        </div>
    );
};

export default Component;
