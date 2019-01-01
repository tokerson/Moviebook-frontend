export default function(state={}, action){
    
    switch(action.type){

        case 'GET_MOVIE_DETAIL':
            return { ...state, movieDetail: action.payload}
        case 'GET_MOVIES_ALL':
            return { ...state, movieList: action.payload }
        case 'CLEAR_MOVIE_DETAIL':
            return { ...state, movieDetail: null}
        default:
            return state;
    }
}