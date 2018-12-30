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
        case 'UPDATE_USERNAME':
        console.log(state.login_data)
            return {
                login_data: {
                    ...state.login_data,
                    username: action.payload
                }
            }
        case 'UPDATE_PASSWORD':
            return {
                login_data: {
                    ...state.login_data,
                    password: action.payload
                }
            }
        default:
            return state;
    }
}