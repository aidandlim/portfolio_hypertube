import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import UserComment from '../UserComment';

import { getCommentsByUserId } from '../../data';
import { session, alert } from '../../util';

import './index.css';

const Component = ({ user }) => {
    const [comments, setComments] = useState([]);

    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.id !== -1) {
            getCommentsByUserId(auth.token, user.id, res => {
                if (session(dispatch, res)) {
                    setComments(res.data.list);
                } else {
                    alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
                }
            });
        }
    }, [dispatch, auth.token, user, ui.lang]);

    return (
        <div className='userComment'>
            {comments.length !== 0 ? comments.map((data, index) => <UserComment data={data} key={index} />) : <div className='userComment-none'>There is no recent watching data</div>}
        </div>
    );
};

export default Component;
