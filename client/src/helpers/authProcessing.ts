export const saveToken = (token: string | null): void => {
    if (token) {
        localStorage.setItem('token', token);
        const expiredTime = new Date().getTime();
        localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 600000)); // 10 min - token validity time
        // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 6000000)); // 100 min - token validity time
    }
};

export const validToken = (): boolean => {
    if (!localStorage.getItem('token')){
        return false
    } else {

    }

    const aaa: string | null = localStorage.getItem('tokenTime');
    if (aaa) {
        const expiredTime: number = JSON.parse(aaa);
        const nowTime =  new Date().getTime();
        if (nowTime < expiredTime) {
            return true
        } else {
            logout();
        }
    }

    return false
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTime');
};

export const getCurrentToken = () => {
    return localStorage.getItem('token');
};

export const authHeader = () => {
    if (validToken()) {
        return { 'x-access-token': getCurrentToken() };
        // return { Authorization: 'Bearer ' + getCurrentToken() }
    } else {
        return {}
    }
};
