import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import user_default from '../../assets/images/user_default.png';

import './index.css';

const Component = ({ comment, _handleDeleteComment }) => {
    const auth = useSelector(state => state.auth);

    const _handleDelete = () => {
        _handleDeleteComment(comment.id);
    };

    return (
        <Link to={auth.token !== '' ? `/user/${comment.user.userName}` : '/auth/signin'}>
            <div className='comment'>
                <div
                    className='comment-picture'
                    style={{
                        backgroundImage: `url('${user_default}')`
                    }}
                ></div>
                <div className='comment-content'>
                    <div className='comment-content-name'>{comment.user.firstName} {comment.user.lastName}</div>
                    <div className='comment-content-time'>({comment.time})</div>
                    <div className='comment-content-message'>{comment.content}</div>
                </div>
                {comment.isMine ? <div className='comment-delete' onClick={_handleDelete}></div> : null}
            </div>
        </Link>
    );
};

export default Component;
