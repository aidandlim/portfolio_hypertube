import React from 'react';

import './index.css';

const Component = ({ index, nav, setNav }) => {
    return (
        <div className={nav === index ? 'userMenu-active' : 'userMenu'} onClick={() => setNav(index)}>
            {index === 0 ? 'Recent Watching' : null}
            {index === 1 ? 'Comments' : null}
            {index === 2 ? 'Settings' : null}
        </div>
    );
};

export default Component;
