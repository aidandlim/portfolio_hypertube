import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_query, search_results } from '../../actions';

import { Link } from 'react-router-dom';

import { getMoviesWithCrew } from '../../data';

import './index.css';

const Component = ({ crew }) => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleSearch = () => {
        getMoviesWithCrew(crew.id, 1, ui.lang, res => {
            dispatch(
                search_query({
                    type: 'crew',
                    query: crew.id,
                    queryName: crew.name
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
            <div className='crew' onClick={_handleSearch}>
                <div
                    className='crew-picture'
                    style={
                        crew.profile_path !== '' &&
                        crew.profile_path !== null &&
                        crew.profile_path !== undefined
                            ? {
                                  backgroundImage: `url('https://image.tmdb.org/t/p/original/${crew.profile_path}')`
                              }
                            : null
                    }
                ></div>
                <div className='crew-info'>
                    <div className='crew-info-name'>{crew.name}</div>
                    <div className='crew-info-role'>{crew.job}</div>
                </div>
            </div>
        </Link>
    );
};

export default Component;
