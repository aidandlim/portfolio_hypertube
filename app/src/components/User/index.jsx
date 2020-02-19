import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { auth_token, user_data } from '../../actions';

import cookie from 'react-cookies';

import UserMenu from '../UserMenu';
import UserRecentWatching from '../UserRecentWatching';
import UserComments from '../UserComments';
import UserSetting from '../UserSetting';

import { getUserByUserName } from '../../data';

import { session } from '../../util/session';

import FeatherIcon from 'feather-icons-react';
import user_default from '../../assets/images/user_default.png';
import './index.css';

const Component = ({ match }) => {
    const userName = match.params.userName;

    const [userData, setUserData] = useState({
        id: -1,
        userName: '',
        firstName: '',
        lastName: '',
        picture: '',
        socialType: ''
    });
    const [nav, setNav] = useState(0);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        if (auth.token !== '') {
            getUserByUserName(auth.token, userName, res => {
                if (!isCancelled) {
                    if (session(dispatch, res)) {
                        setTimeout(() => {
                            setUserData(res.obj);
                            setIsDoneSearch(true);
                        }, 1000);
                    }
                }
            });
        }

        return () => {
            isCancelled = true;
        };
    }, [dispatch, auth.token, userName, ui.lang]);

    const _handleSignOut = () => {
        cookie.save('token', '', {
            path: '/'
        });
        dispatch(auth_token(''));
        dispatch(
            user_data({
                id: -1,
                userName: '',
                email: '',
                firstName: '',
                lastName: '',
                picture: '',
                socialType: ''
            })
        );
        window.open('/', '_self');
    };

    const menus = userData.userName === user.userName ? [0, 1, 2] : [0, 1];

    return (
        <div className='user'>
            {userData.id === -1 ? (
                isDoneSearch ? (
                    ui.lang === 'en_US' ? (
                        "We can't find any information of this account"
                    ) : (
                        '회원정보를 찾을 수 없습니다.'
                    )
                ) : ui.lang === 'en_US' ? (
                    'We are looking for this account information'
                ) : (
                    '회원정보를 검색 중입니다.'
                )
            ) : (
                <div className='user-container'>
                    <div className='user-info'>
                        <div
                            className='user-info-picture'
                            style={{
                                backgroundImage: userData.picture !== null && userData.picture !== undefined && userData.picture !== '' ? `url('${userData.picture}')` : `url('${user_default}')`
                            }}
                        >
                            <FeatherIcon className={nav === 2 ? 'user-info-picture-update-active' : 'user-info-picture-update'} icon='upload' />
                        </div>
                        <div className='user-info-basic'>
                            <div className='user-info-userName'>@{userData.userName}</div>
                            <div className='user-info-fullName'>
                                {userData.firstName} {userData.lastName}
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
                            {nav === 0 ? <UserRecentWatching userName={userData.userName} /> : null}
                            {nav === 1 ? <UserComments userData={userData} /> : null}
                            {nav === 2 ? <UserSetting userData={userData} setUserData={setUserData} /> : null}
                        </div>
                    </div>
                </div>
            )}
            {userData.userName === user.userName ? (
                <div className='user-util-container'>
                    <FeatherIcon className='user-util-icon-logout' icon='log-out' onClick={_handleSignOut} />
                </div>
            ) : null}
        </div>
    );
};

export default Component;
