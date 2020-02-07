import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = () => {
    const auth = useSelector(state => state.auth);

    return (
        <Link to={auth.isLogin ? '/user' : '/auth/signin'}>
            <div className="userIcon">
                {auth.isLogin ? (
                    <FeatherIcon icon="user" color="#606060" size="1rem" />
                ) : (
                    <FeatherIcon icon="log-in" color="#606060" size="1rem" />
                )}
            </div>
        </Link>
    );
};

export default Component;
