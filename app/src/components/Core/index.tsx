import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

import Feed from './Feed';
import Search from './Search';
import Detail from './Detail';
import Streaming from './Streaming';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Recovery from './Auth/Recovery';
import Error from './Error';

import './index.css';

export interface Props {}

const Component: React.FC<Props> = () => {
    return (
        <Switch>
            <Redirect from="/" to="/feed/all/popularity" exact />
            <Route path="/feed/:genre/:filter" exact component={Feed} />
            <Route path="/search" exact component={Search} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/streaming/:id" exact component={Streaming} />
            <Route path="/auth/signin" exact component={SignIn} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/recovery" exact component={Recovery} />
            <Route component={Error} />
        </Switch>
    );
};

export default Component;
