import { combineReducers } from 'redux';
import movies from './movie_reducer';
import login from './login_reducer';
import { reducer as formReducer } from 'redux-form';
import { sessionReducer } from 'redux-react-session';


const rootReducer = combineReducers({
    movies,
    login,
    form: formReducer, //redux-from makes us do this
    session: sessionReducer
})


export default rootReducer;