import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import UserRecentWatchingMovie from '../UserRecentWatchingMovie';

import { getHistoriesByUserName } from '../../data';
import { session } from '../../util';

import './index.css';

const Component = ({ userName }) => {
    const [movies, setMovies] = useState([]);

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        if (userName !== '') {
            getHistoriesByUserName(auth.token, userName, res => {
                if (!isCancelled && session(dispatch, res)) {
                    setMovies(res.list);
                }
            });
        }

        return () => {
            isCancelled = true;
        };
    }, [dispatch, auth.token, userName]);

    return (
        <div className='userRecentWatching'>
            {movies.length !== 0 ? movies.map((data, index) => <UserRecentWatchingMovie data={data} key={index} />) : <div className='userRecentWatching-none'>There is no recent watching data</div>}
        </div>
    );
};

export default Component;
