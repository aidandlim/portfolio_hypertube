import React, { useEffect } from 'react';

import { request42Access } from '../../data';

import './index.css';

const Component = () => {
    useEffect(() => {
        request42Access((res) => {
            console.log(res);
            document.querySelector('.socialSignInWith42').innerHTML = res.data;
        })
    }, []);

    return (
        <div className='socialSignInWith42'></div>
    );
}

export default Component;