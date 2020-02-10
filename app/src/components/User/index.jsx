import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_token } from '../../actions';

import cookie from 'react-cookies';

import './index.css';

const Component = ({ history }) => {
    const dispatch = useDispatch();

    const _handleSignOut = () => {
        cookie.save('token', '', {
            path: '/'
        });
        dispatch(auth_token(''));
        history.goBack();
    }

    return (
        <div className='user'>
            <button onClick={_handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Component;
