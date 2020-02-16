import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import user_default from '../../assets/images/user_default.png';

import './index.css';

const Component = ({ comment }) => {
    const auth = useSelector(state => state.auth);

    return (
        <Link to={auth.token !== '' ? `/user/${comment.userName}` : '/auth/signin'}>
            <div className='comment'>
                <div
                    className='comment-picture'
                    style={{
                        backgroundImage: `url('${user_default}')`
                    }}
                ></div>
                <div className='comment-content'>
                    <div className='comment-content-name'>{comment.fullName}</div>
                    <div className='comment-content-time'>({comment.time})</div>
                    <div className='comment-content-message'>{comment.comment}</div>
                </div>
            </div>
        </Link>
    );
};

export default Component;
