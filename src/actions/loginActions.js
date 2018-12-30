import axios from 'axios';
const URL = 'http://localhost:8080'

export function clickLogin() {
    return {
        type: 'CLICK_LOGIN',
        payload: {
            logging: true,
            logged: false
        }
    }
}

export const closeLogin = () => {
    return {
        type: 'CLOSE_LOGIN',
        payload: { 
            logging: false,
        }
    }
}

export function verifyData(values) {
    let status = "not-ok";

    const request = axios.get(`${URL}/login/${values.username}/${values.password}`)
                    .then(response => response.data);
    return {
        type:'VERIFY_DATA',
        payload:request
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