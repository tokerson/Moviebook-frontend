export default function(state={}, action){
    
    switch(action.type){

        case 'GET_MOVIES_ALL':
            return { ...state, movieList: action.payload }
        default:
            return state;
    }
}