import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

import Feed from '../Feed';
import Search from '../Search';
import Detail from '../Detail';
import Streaming from '../Streaming';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Recovery from '../Recovery';
import User from '../User';
import Error from '../Error';

const Component = () => {
    return (
        <Switch>
            <Redirect from='/' to='/feed/all/popularity' exact />
            <Route path='/feed/:genre/:filter' exact component={Feed} />
            <Route path='/search/:type/:query' exact component={Search} />
            <Route path='/search/:type/:query/:queryName' exact component={Search} />
            <Route path='/detail/:id' exact component={Detail} />
            <Route path='/streaming/:torrent/:magnet' exact component={Streaming} />
            <Route path='/auth/signin' exact component={SignIn} />
            <Route path='/auth/signup' exact component={SignUp} />
            <Route path='/auth/recovery' exact component={Recovery} />
            <Route path='/user/:userName' exact component={User} />
            <Route component={Error} />
        </Switch>
    );
};

export default Component;
