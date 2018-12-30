import axios from 'axios';

export function clickLogin() {
    return {
        type: 'CLICK_LOGIN',
        payload: {
            logging: true,
            username: '',
            password: '',
        }
    }
}

export function closeLogin() {
    return {
        type: 'CLOSE_LOGIN',
        payload: { 
            logging: false,
            username: '',
            password: ''
        }
    }
}

export function updateUsername(event) {
    return {
        type: 'UPDATE_USERNAME',
        payload : event.target.value,
    }
}


export function updatePassword(event) {
    return {
        type: 'UPDATE_PASSWORD',
        payload: event.target.value ,
    }
}

// export function verifyData(login, pass) {

//     const apiUrl = 'http://localhost:8080/login/';
//     const request = axios.get(apiUrl+login+'/'+pass).then((response) => {
//         if( response.data !== '') {
//             if( response.data === 'Administrator') {
//                 return {
//                     type: 'LOG_USER'
//                 }
//             }
//         }
//     }

//     return {
//         type: 'VERIFTY_DATA',
//     }
// }