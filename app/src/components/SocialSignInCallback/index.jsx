import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { auth_token } from '../../actions';

import cookie from 'react-cookies';

import queryString from 'query-string';

import {
    requestGoogleCode,
    requestGoogleProfile,
    requestFacebookCode,
    requestFacebookProfile,
    request42Code,
    request42Profile,
    oAuth
} from '../../data';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

const Component = ({ history, location, match }) => {
    const source = match.params.source;

    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location !== undefined && location.search !== undefined) {
            const { code } = queryString.parse(location.search);

            let codeFunc;

            if (source === 'google') codeFunc = requestGoogleCode;
            else if (source === 'facebook') codeFunc = requestFacebookCode;
            else if (source === '42') codeFunc = request42Code;

            codeFunc(code, res => {
                const token = res.token;

                if (token !== null) {
                    let profileFunc;

                    if (source === 'google') profileFunc = requestGoogleProfile;
                    else if (source === 'facebook') profileFunc = requestFacebookProfile;
                    else if (source === '42') profileFunc = request42Profile;

                    profileFunc(token, res => {
                        oAuth(res, res => {
                            if (res.status === 200) {
                                dispatch(auth_token(res.obj));
                                confirmAlert({
                                    message:
                                        ui.lang === 'en_US'
                                            ? 'Do you want to keep your signin status?'
                                            : '로그인을 유지하시겠습니까?',
                                    buttons: [
                                        {
                                            label: 'Yes',
                                            onClick: () =>
                                                cookie.save('token', res.obj, {
                                                    path: '/'
                                                })
                                        },
                                        {
                                            label: 'No',
                                            onClick: () =>
                                                cookie.save('token', res.obj, {
                                                    path: '/',
                                                    maxAge: 60 * 30
                                                })
                                        }
                                    ]
                                });
                            } else {
                                if (res.message === 'Email') {
                                    confirmAlert({
                                        message:
                                            ui.lang === 'en_US'
                                                ? 'This email is taken!'
                                                : '이미 존재하는 이메일입니다.',
                                        buttons: [{ label: 'Okay', onClick: () => history.goBack() }]
                                    });
                                }
                            }
                        });
                    });
                } else {
                    confirmAlert({
                        message:
                            ui.lang === 'en_US'
                                ? 'This access is invalid! Please try again.'
                                : '올바르지 않은 접속입니다. 다시 시도해주십시오.',
                        buttons: [
                            {
                                label: 'Okay',
                                onClick: () => history.goBack()
                            }
                        ]
                    });
                }
            });
        }
    }, [location, history, ui.lang, source, dispatch]);

    return (
        <div className='socialSignInWith42'>
            <div className='socialSignInWith42-loading'>
                {ui.lang === 'en_US' ? 'SignIn is processing!' : '로그인이 진행 중입니다.'}
            </div>
        </div>
    );
};

export default Component;
