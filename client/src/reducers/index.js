import { combineReducers } from 'redux';

import authentication_Reducers from './authentication_Reducers';
import error_Reducers from './error_Reducers';
import post_Reducers from './post_Reducers';

export default combineReducers({
  auth: authentication_Reducers,
  post: post_Reducers,
  errors: error_Reducers
});