import React from 'react';

import { useSelector } from 'react-redux';

import './index.css';

const Component = () => {
    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);

    return (
        <div className='commentPost'>
            <textarea
                className='commentPost-textarea'
                placeholder={
                    ui.lang === 'en_US'
                        ? auth.token === ''
                            ? 'This feature requires SignIn first.'
                            : 'What do you think about this movie?'
                        : auth.token === ''
                        ? '로그인이 필요한 서비스입니다.'
                        : '이 영화에 대해 어떻게 생각하시나요?'
                }
                disabled={auth.token === '' ? 'disabled' : null}
            ></textarea>
            <div className='commentPost-button-container'>
                <button
                    className='commentPost-button'
                    disabled={auth.token === '' ? 'disabled' : null}
                >
                    POST
                </button>
            </div>
        </div>
    );
};

export default Component;
