import { combineReducers } from 'redux';
import user from './reducer/user';
import posts from './reducer/posts';
import errors from './reducer/errors';

export default combineReducers({
    user,
    posts,
    errors
});

