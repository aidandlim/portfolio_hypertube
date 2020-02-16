import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth_token, movie_genres, movie_histories, ui_lang } from '../../actions';

import { BrowserRouter } from 'react-router-dom';
import Wrapper from 'react-div-100vh';
import cookie from 'react-cookies';

import Header from '../Header';
import Core from '../Core';

import { apiGenres, checkToken, getHistories } from '../../data';
import { session } from '../../util';

const Component = () => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = cookie.load('token');

        if (token !== null && token !== undefined && token !== '') {
            checkToken(token, res => {
                if (res === 200) {
                    dispatch(auth_token(token));
                    getHistories(token, res => {
                        if (session(dispatch, res)) {
                            dispatch(movie_histories(res.list));
                        } else {
                            alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
                        }
                    });
                }
            });
        }
        dispatch(ui_lang(cookie.load('lang') !== undefined ? cookie.load('lang') : 'en_US'));
        apiGenres(ui.lang, res => {
            dispatch(movie_genres(res));
        });
    }, [dispatch, ui.lang]);

    return (
        <Wrapper className='no-drag'>
            <style>
                {`
					:root {
                        --size-header: 2.5rem;
                        
                        --color-100: #000000;
                        --color-95: #050505;
                        --color-90: #101010;
                        --color-85: #151515;
                        --color-80: #202020;
                        --color-75: #252525;
                        --color-70: #303030;
                        --color-65: #353535;
                        --color-60: #404040;
                        --color-55: #454545;
                        --color-50: #505050;
                        --color-45: #555555;
                        --color-40: #606060;
                        --color-35: #656565;
                        --color-30: #707070;
                        --color-25: #757575;
                        --color-20: #808080;
                        --color-15: #858585;
                        --color-10: #909090;
                        --color-5: #959595;
                        --color-A: #AAAAAA;
                        --color-B: #BBBBBB;
                        --color-C: #CCCCCC;
                        --color-D: #DDDDDD;
                        --color-E: #EEEEEE;
                        --color-F: #FFFFFF;

                        --color-primary: #FFEA00;
                        --color-primary-light: #FFFF8D;
					}
				`}
            </style>
            <BrowserRouter>
                <Header />
                <Core />
            </BrowserRouter>
        </Wrapper>
    );
};

export default Component;
