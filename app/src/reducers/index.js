import { combineReducers } from 'redux';

import auth from './Auth';
import ui from './UI';
import movie from './Movie';

const rootReducers = combineReducers({
    auth,
    ui,
    movie
});

export default rootReducers;
