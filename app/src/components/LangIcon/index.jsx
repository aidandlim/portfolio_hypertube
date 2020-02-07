import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_lang } from '../../actions';

import en_US from '../../assets/icons/en_US.png';
import ko_KR from '../../assets/icons/ko_KR.png';

import './index.css';

const Component = () => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleLang = () => {
        dispatch(ui_lang(ui.lang === 'en_US' ? 'ko_KR' : 'en_US'));
    };

    return (
        <div className="langIcon" onClick={_handleLang}>
            <div
                className="langIcon-image"
                style={{
                    backgroundImage: `url('${
                        ui.lang === 'en_US' ? en_US : ko_KR
                    }')`
                }}
            ></div>
        </div>
    );
};

export default Component;
