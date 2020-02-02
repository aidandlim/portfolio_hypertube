import React from 'react';

import { Icon } from 'ts-react-feather-icons';

import './index.css';

export interface Props {
    _handleSetting: () => void;
}

const Component: React.FC<Props> = ({ _handleSetting }) => {
    return (
        <div className="filter">
            <div className="filter-icon" onClick={_handleSetting}>
                <Icon name="filter" color="gray" size={20} />
            </div>
        </div>
    );
};

export default Component;
