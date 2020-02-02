import React from 'react';

import './index.css';

export interface Props {
    match: {
        params: {
            id: number;
        };
    };
}

const Component: React.FC<Props> = ({ match }) => {
    return <div className="detail">{match.params.id}</div>;
};

export default Component;
