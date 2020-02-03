import React from 'react';

import './index.css';

export interface Props {}

const Component: React.FC<Props> = () => {
    return <div className="error">Something went wrong :(</div>;
};

export default Component;
