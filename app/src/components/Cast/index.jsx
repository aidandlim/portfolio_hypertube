import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_query, search_results } from '../../actions';

import { Link } from 'react-router-dom';

import { getMoviesWithCast } from '../../data';

import './index.css';

const Component = ({ cast }) => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleSearch = () => {
        getMoviesWithCast(cast.id, 1, ui.lang, res => {
            dispatch(
                search_query({
                    type: 'cast',
                    query: cast.id,
                    queryName: cast.name
                })
            );
            dispatch(
                search_results({
                    results: res.results,
                    page: res.page,
                    total: res.total_pages
                })
            );
        });
    };

    return (
        <Link to='/search'>
            <div className='cast' onClick={_handleSearch}>
                <div
                    className='cast-picture'
                    style={
                        cast.profile_path !== '' &&
                        cast.profile_path !== null &&
                        cast.profile_path !== undefined
                            ? {
                                  backgroundImage: `url('https://image.tmdb.org/t/p/original/${cast.profile_path}')`
                              }
                            : null
                    }
                ></div>
                <div className='cast-info'>
                    <div className='cast-info-name'>{cast.name}</div>
                    <div className='cast-info-role'>{cast.character}</div>
                </div>
            </div>
        </Link>
    );
};

export default Component;
