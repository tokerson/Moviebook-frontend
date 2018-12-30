export default function(state={}, action){
    
    switch(action.type){

        case 'CLICK_LOGIN':
            return { 
                ...state,
                login_data: action.payload
            }
        case 'CLOSE_LOGIN':
            return {
                ...state,
                login_data: action.payload
            }
        case 'VERIFY_DATA':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}