import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { auth_token } from '../../actions';

import cookie from 'react-cookies';

import UserMenu from '../UserMenu';
import UserRecentWatching from '../UserRecentWatching';
import UserComments from '../UserComments';
import UserSetting from '../UserSetting';

import { getUserByToken, getUserByUserName, deleteUser } from '../../data';

import { session } from '../../util/session';

import FeatherIcon from 'feather-icons-react';
import user_default from '../../assets/images/user_default.png';
import { alert } from '../../util';
import './index.css';

const Component = ({ match }) => {
    const userName = match.params.userName;

    const [user, setUser] = useState({
        id: -1,
        userName: '',
        firstName: '',
        lastName: '',
        picture: '',
        socialType: ''
    });
    const [nav, setNav] = useState(0);

    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userName === 'my') {
            getUserByToken(auth.token, res => {
                if (session(dispatch, res)) {
                    setUser(res.obj);
                } else {
                    alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
                }
            });
        } else {
            getUserByUserName(auth.token, userName, res => {
                if (session(dispatch, res)) {
                    setUser(res.obj);
                } else {
                    alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
                }
            });
        }
    }, [dispatch, auth.token, userName, ui.lang]);

    const _handleClose = () => {
        deleteUser(auth.token, res => {
            if (session(dispatch, res)) {
                _handleSignOut();
            } else {
                alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
            }
        });
    };

    const _handleSignOut = () => {
        cookie.save('token', '', {
            path: '/'
        });
        dispatch(auth_token(''));
    };

    const menus = [0, 1, 2];

    return (
        <div className='user'>
            <div className='user-container'>
                <div className='user-info'>
                    <div
                        className='user-info-picture'
                        style={{
                            backgroundImage: user.picture !== null && user.picture !== undefined && user.picture !== '' ? `url('${user.picture}')` : `url('${user_default}')`
                        }}
                    >
                        <FeatherIcon className={nav === 2 ? 'user-info-picture-update-active' : 'user-info-picture-update'} icon='upload' />
                    </div>
                    <div className='user-info-basic'>
                        <div className='user-info-userName'>@{user.userName}</div>
                        <div className='user-info-fullName'>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>
                <div className='user-content-container'>
                    <div className='user-content-header'>
                        {menus.map((menu, index) => (
                            <UserMenu index={menu} nav={nav} setNav={setNav} key={index} />
                        ))}
                    </div>
                    <div className='user-content-body'>
                        {nav === 0 ? <UserRecentWatching userName={user.userName} /> : null}
                        {nav === 1 ? <UserComments user={user} /> : null}
                        {nav === 2 ? <UserSetting user={user} setUser={setUser} /> : null}
                    </div>
                </div>
            </div>
            <button className='user-delete' onClick={_handleClose}>
                CLOSE ACCOUNT
            </button>
            <button className='user-signout' onClick={_handleSignOut}>
                SIGN OUT
            </button>
        </div>
    );
};

export default Component;
