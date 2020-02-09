import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_query, search_results } from '../../actions';

import { getSearch } from '../../data';

import CI from '../CI';
import SearchBar from '../SearchBar';
import UserIcon from '../UserIcon';
import LangIcon from '../LangIcon';

import './index.css';

const Component = () => {
    const [query, setQuery] = useState('');

    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleSearch = () => {
        if (query !== '') {
            getSearch(query, 1, ui.lang, res => {
                dispatch(
                    search_query({
                        type: 'normal',
                        query: query,
                        queryName: '',
                    })
                );
                dispatch(
                    search_results({
                        results: res.results,
                        page: res.page,
                        total: res.total
                    })
                );
            });
        }
    };

    return (
        <div className='header'>
            <div className='header-ci-section'>
                <CI />
            </div>
            <div className='header-search-section'>
                <SearchBar setQuery={setQuery} _handleSearch={_handleSearch} />
            </div>
            <div className='header-util-section'>
                <UserIcon />
                <LangIcon />
            </div>
        </div>
    );
};

export default Component;
