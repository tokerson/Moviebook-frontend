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

export function clickRegister() {
    return {
        type: 'CLICK_REGISTER',
        payload: {
            logging: true,
            logged: false,
            failed: false,
            registering: true,
        }
    }
}

export const closeRegister = () => {
    return {
        type: 'CLOSE_REGISTER',
        payload: { 
            logging: false,
            failed: false,
            registering: false,
        }
    }
}

export const handleRegistration = (values) => {
   


    const request = axios.post(`${URL}/register/${values.username}/${values.password}`)
                    .then(response => response.data)
                    .catch(err => console.log(err));
   
    return {
        type: 'HANDLE_REGISTRATION',
        payload: request
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

export function failedRegistration(){
    return {
        type: 'FAILED_REGISTRATION',
        payload: {
            logging: true,
            logged:false,
            failed:true,
            registering: false,
            failedRegistration: true,
        }
    }
}