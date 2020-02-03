import { combineReducers } from 'redux';

import auth from './Auth';
import ui from './UI';

const rootReducers = combineReducers({
    auth,
    ui
});

export default rootReducers;