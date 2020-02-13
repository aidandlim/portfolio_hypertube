import React, { useEffect } from 'react';

import queryString from 'query-string';

import { request42Token } from '../../data';

import './index.css';

const Component = ({ location }) => {
    useEffect(() => {
        const { code } = queryString.parse(location.search);

        request42Token(code, res => {
            console.log(res);
        });
    }, [location.search]);

    return <div></div>;
};

export default Component;
