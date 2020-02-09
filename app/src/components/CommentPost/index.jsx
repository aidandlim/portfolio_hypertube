import React from 'react';

import { useSelector } from 'react-redux';

import './index.css';

const Component = () => {
    const ui = useSelector(state => state.ui);

    return (
        <div className='commentPost'>
            <textarea
                className='commentPost-textarea'
                placeholder={ui.lang === 'en_US' ? 'What do you think about this movie?' : '이 영화에 대해 어떻게 생각하시나요?'}
            ></textarea>
            <div className='commentPost-button-container'>
                <button className='commentPost-button'>POST</button>
            </div>
        </div>
    );
};

export default Component;
