import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_lang } from '../../actions';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = () => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleLang = () => {
        dispatch(ui_lang(ui.lang === 'en_US' ? 'ko_KR' : 'en_US'));
    };

    return (
        <div className="langIcon" onClick={_handleLang}>
            <FeatherIcon icon="underline" color="#606060" size="1rem" />
        </div>
    );
};

export default Component;
