import { combineReducers } from 'redux';

import auth from './Auth';
import ui from './UI';
import search from './Search';

const rootReducers = combineReducers({
    auth,
    ui,
    search
});

export default rootReducers;