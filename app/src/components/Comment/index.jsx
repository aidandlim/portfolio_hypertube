import React from 'react';

import user_default from '../../assets/images/user_default.png';

import './index.css';

const Component = ({ comment }) => {
    return (
        <div className='comment'>
            <div
                className='comment-picture'
                style={{
                    backgroundImage: `url('${user_default}')`
                }}
            ></div>
            <div className='comment-content'>
                <div className='comment-content-name'>{comment.name}</div>
                <div className='comment-content-time'>({comment.time})</div>
                <div className='comment-content-message'>{comment.comment}</div>
            </div>
        </div>
    );
};

export default Component;
