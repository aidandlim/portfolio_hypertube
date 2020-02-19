import React from 'react';

import CI from '../CI';
import SearchBar from '../SearchBar';
import UserIcon from '../UserIcon';
import LangIcon from '../LangIcon';

import './index.css';

const Component = () => {
    return (
        <div className='header'>
            <div className='header-ci-section'>
                <CI />
            </div>
            <div className='header-search-section'>
                <SearchBar />
            </div>
            <div className='header-util-section'>
                <UserIcon />
                <LangIcon />
            </div>
        </div>
    );
};

export default Component;
