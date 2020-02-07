import React from 'react';

import { Link } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = ({ setQuery, _handleSearch }) => {

    const _handleEnter = e => {
        if (e.keyCode === 13) {
            document.querySelector('.searchBar-button').click();
        }
    };

    return (
        <div className="searchBar">
            <input
                className="searchBar-input"
                placeholder="Search"
                onChange={e => setQuery(e.target.value)}
                onKeyUp={_handleEnter}
            />
            <Link to="/search">
                <button
                    type="submit"
                    className="searchBar-button"
                    onClick={_handleSearch}
                >
                    <FeatherIcon icon="search" color="#303030" size={20} />
                </button>
            </Link>
        </div>
    );
};

export default Component;
