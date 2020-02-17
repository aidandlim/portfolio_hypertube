import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import user_default from '../../assets/images/user_default.png';
import temp from '../../assets/icons/en_US.png';

import './index.css';

const Component = () => {
    const auth = useSelector(state => state.auth);

    return (
        <Link to={auth.token ? `/user/my` : '/auth/signin'} className='userIcon'>
            <div
                className='userIcon-image'
                style={{
                    backgroundImage: `url('${auth.isLogin ? temp : user_default}')`
                }}
            ></div>
        </Link>
    );
};

export default Component;
