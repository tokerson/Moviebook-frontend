import { combineReducers } from 'redux';
import movies from './movie_reducer';
import login from './login_reducer';

const rootReducer = combineReducers({
    movies
    // movies,
    // login
})


export default rootReducer;