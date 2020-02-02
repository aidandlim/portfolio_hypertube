import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

import Feed from './Feed';
import Detail from './Detail';
import Error from './Error';

import './index.css';

export interface Props {}

const Component: React.FC<Props> = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/feed/all/popularity" />
            <Route path="/feed/:genre/:filter" component={Feed} />
            <Route path="/detail/:id" component={Detail} />
            <Route component={Error} />
        </Switch>
    );
};

export default Component;
