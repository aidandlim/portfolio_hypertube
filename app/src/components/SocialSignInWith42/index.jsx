import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import queryString from 'query-string';

import { request42Token, request42Data } from '../../data';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

const Component = ({ history, location }) => {
    const ui = useSelector(state => state.ui);

    useEffect(() => {
        if (location !== undefined && location.search !== undefined) {
            const { code } = queryString.parse(location.search);
            request42Token(code, res => {
                if (res !== 0) {
                    const access_token = res.data.access_token;
                    request42Data(access_token, res => {
                        console.log(res);
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
    }, [location, ui.lang, history]);

    return (
        <div className="socialSignInWith42">
            <div className="socialSignInWith42-loading">
                Please wait a moment!
            </div>
        </div>
    );
};

export default Component;
