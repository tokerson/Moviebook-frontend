import { combineReducers } from 'redux';
import movies from './movie_reducer';
import login from './login_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    movies,
    login,
    form: formReducer //redux-from makes us do this
})


export default rootReducer;