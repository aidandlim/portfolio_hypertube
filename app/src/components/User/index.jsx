import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { auth_token } from '../../actions';

import cookie from 'react-cookies';

import UserMenu from '../UserMenu';
import UserRecentWatching from '../UserRecentWatching';
import UserComments from '../UserComments';

import user_default from '../../assets/icons/user_default.png';

import './index.css';

const Component = ({ history }) => {
    const [nav, setNav] = useState(0);

    const dispatch = useDispatch();

    const _handleSignOut = () => {
        cookie.save('token', '', {
            path: '/'
        });
        dispatch(auth_token(''));
        history.goBack();
    };

    const menus = [0, 1, 2];

    return (
        <div className='user'>
            <div className='user-container'>
                <div className='user-info'>
                    <div
                        className='user-info-picture'
                        style={{
                            backgroundImage: `url('${user_default}')`
                        }}
                    ></div>
                    <div className='user-info-basic'>
                        <div className='user-info-userName'>@aidan</div>
                        <div className='user-info-fullName'>Aidan Lim</div>
                    </div>
                </div>
                <div className='user-content-container'>
                    <div className='user-content-header'>
                        {menus.map((menu, index) => (
                            <UserMenu
                                index={menu}
                                nav={nav}
                                setNav={setNav}
                                key={index}
                            />
                        ))}
                    </div>
                    <div className='user-content-body'>
                        {nav === 0 ? <UserRecentWatching /> : null}
                        {nav === 1 ? <UserComments /> : null}
                    </div>
                </div>
            </div>
            <button className='user-signout' onClick={_handleSignOut}>
                SIGN OUT
            </button>
        </div>
    );
};

export default Component;
