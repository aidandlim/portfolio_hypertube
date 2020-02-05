import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_query, search_results } from '../../actions';

import { Link } from 'react-router-dom';

import { getSearch } from '../../data';

import CI from '../../assets/favicon.png';
import { Icon } from 'ts-react-feather-icons';
import './index.css';

export interface Props {}

export interface State {
    auth: {
        isLogin: boolean;
    };
}

const Component: React.FC<Props> = () => {
    const auth = useSelector((state: State) => state.auth);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const _handleSearch = () => {
        dispatch(
            search_results({
                results: [],
                page: 1,
                total: 0
            })
        );
        getSearch(
            query,
            1,
            (res: { results: []; page: number; total: number }) => {
                dispatch(search_query(query));
                dispatch(
                    search_results({
                        results: res.results,
                        page: res.page,
                        total: res.total
                    })
                );
            }
        );
    };

    return (
        <div className="header">
            <div className="header-ci-section">
                <Link to="/">
                    <img className="header-ci-icon" src={CI} alt="hypertube" />
                    <div className="header-ci">HyperTube</div>
                </Link>
            </div>
            <div className="header-search-section">
                <div className="header-search-container">
                    <input
                        className="header-search-input"
                        placeholder="Search"
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Link to="/search">
                        <button
                            type="submit"
                            className="header-search-button"
                            onClick={_handleSearch}
                        >
                            <Icon name="search" color="#303030" size={20} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="header-util-section">
                <Link to={auth.isLogin ? '/user' : '/auth/signin'}>
                    <div className="header-util-auth">
                        {!auth.isLogin ? (
                            <Icon name="log-in" color="#606060" size="1rem" />
                        ) : (
                            <Icon name="user" color="#606060" size="1rem" />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Component;
