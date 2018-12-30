import axios from 'axios';

const URL = 'http://localhost:8080'


export function clickLogin() {
    return {
        type: 'CLICK_LOGIN',
        payload: {
            logging: true,
            logged: false,
            failed: false,
        }
    }
}

export function clickLogout() {
    return {
        type: 'CLICK_LOGOUT',
        payload: {
            logging: false,
            logged: false,
            failed: false,
        }
    }
}

export const closeLogin = () => {
    return {
        type: 'CLOSE_LOGIN',
        payload: { 
            logging: false,
            failed: false
        }
    }
}

export function verifyData(values) {

    const request = axios.get(`${URL}/login/${values.username}/${values.password}`)
                    .then(response => response.data)
                    .catch(err => console.log(err));
    
    return {
        type:'VERIFY_DATA',
        payload:request
    }

}

export function logUser(username){

    return {
        type:'LOG_USER',
        payload: {
            logging: false,
            logged: true,
            failed:false,
            username:username
        }
    }
}

export function failedLogin(){
    return {
        type: 'FAILED_LOGIN',
        payload: {
            logging: true,
            logged:false,
            failed:true,
        }
    }
}