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
        payload: { logging: false }
    }
}