import { combineReducers } from 'redux';

import auth from './Auth';
import ui from './UI';
import movie from './Movie';
import search from './Search';

const rootReducers = combineReducers({
    auth,
    ui,
    movie,
    search
});

export default rootReducers;
