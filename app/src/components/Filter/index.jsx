import React from 'react';

import GenreButton from '../GenreButton';
import SorterButton from '../SorterButton';

import './index.css';

const Component = ({ genre, filter, _handleSetting }) => {
    const genres = [
        {
            url: 'all',
            titleEN: 'ALL',
            titleKR: '모두보기'
        },
        {
            url: 'action',
            titleEN: 'ACTION',
            titleKR: '액션'
        },
        {
            url: 'adventure',
            titleEN: 'ADVENTURE',
            titleKR: '어드벤쳐'
        },
        {
            url: 'animation',
            titleEN: 'ANIMATION',
            titleKR: '애니메이션'
        },
        {
            url: 'comedy',
            titleEN: 'COMEDY',
            titleKR: '코미디'
        },
        {
            url: 'crime',
            titleEN: 'CRIME',
            titleKR: '범죄'
        },
        {
            url: 'documentary',
            titleEN: 'DOCUMENTARY',
            titleKR: '다큐멘터리'
        },
        {
            url: 'drama',
            titleEN: 'DRAMA',
            titleKR: '드라마'
        },
        {
            url: 'family',
            titleEN: 'FAMILY',
            titleKR: '가족'
        },
        {
            url: 'fantasy',
            titleEN: 'FANTASY',
            titleKR: '판타지'
        },
        {
            url: 'history',
            titleEN: 'HISTORY',
            titleKR: '역사'
        },
        {
            url: 'horror',
            titleEN: 'HORROR',
            titleKR: '공포'
        },
        {
            url: 'music',
            titleEN: 'MUSIC',
            titleKR: '음악'
        },
        {
            url: 'mystery',
            titleEN: 'MYSTERY',
            titleKR: '미스터리'
        },
        {
            url: 'romance',
            titleEN: 'ROMANCE',
            titleKR: '로맨스'
        },
        {
            url: 'sciencefiction',
            titleEN: 'SCIENCE FICTION',
            titleKR: '공상과학'
        },
        {
            url: 'tvmovie',
            titleEN: 'TV MOVIE',
            titleKR: 'TV 영화'
        },
        {
            url: 'thriller',
            titleEN: 'THRILLER',
            titleKR: '스릴러'
        },
        {
            url: 'war',
            titleEN: 'WAR',
            titleKR: '전쟁'
        },
        {
            url: 'western',
            titleEN: 'WESTERN',
            titleKR: '서부'
        }
    ];

    const sorters = [
        {
            url: 'popularity',
            titleEN: 'POPULARITY',
            titleKR: '인기도'
        },
        {
            url: 'rating',
            titleEN: 'RATING',
            titleKR: '평가'
        },
        {
            url: 'revenue',
            titleEN: 'REVENUE',
            titleKR: '수익'
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
                            titleEN={element.titleEN}
                            titleKR={element.titleKR}
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
                            titleEN={element.titleEN}
                            titleKR={element.titleKR}
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
