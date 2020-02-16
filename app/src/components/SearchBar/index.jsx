import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = () => {
    const [query, setQuery] = useState('');

    const ui = useSelector(state => state.ui);

    const _handleEnter = e => {
        if (e.keyCode === 13) {
            document.querySelector('.searchBar-button').click();
        }
    };

    return (
        <div className='searchBar'>
            <input className='searchBar-input' placeholder={ui.lang === 'en_US' ? 'Search' : '검색'} value={query} onChange={e => setQuery(e.target.value)} onKeyUp={_handleEnter} />
            <Link to={`/search/movie/${query}`}>
                <button type='submit' className='searchBar-button'>
                    <FeatherIcon icon='search' color='#303030' size='0.8rem' />
                </button>
            </Link>
        </div>
    );
};

export default Component;
