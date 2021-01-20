import {IUser, TUserStatus} from "../interfaces";

// export const saveToken = (token: string | null, status: TUserStatus): void => {
//     if (token) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userStatus', status);
//         const expiredTime = new Date().getTime();
//         localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 600000)); // 10 min - token validity time
//         // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 20000)); // 20 sec - token validity time
//         // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 6000000)); // 100 min - token validity time
//     }
// };

export const saveUserToLocalStorage = (user: IUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    const expiredTime = new Date().getTime();
    // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 600000)); // 10 min - token validity time
    // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 20000)); // 20 sec - token validity time
    // localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 6000000)); // 100 min - token validity time
    localStorage.setItem('tokenTime', JSON.stringify(expiredTime + 1800000)); // 30 min - token validity time
};

export const validToken = (): boolean => {
    const user: IUser | null = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
        if (user.token && isLiveToken()) return true
    }
    logout();
    return false
};

const isLiveToken = (): boolean => {
    const tokenTime: number = JSON.parse(localStorage.getItem('tokenTime') as string);
    if (tokenTime) {
        if (Date.now() < tokenTime) return true
    }
    logout();
    return false
};

export const getUserStatus = (): TUserStatus => {
    const user: IUser | null = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
        if (user.status && isLiveToken()) return user.status
    }
    logout();
    return 'notAuth'
};

export const logout = () => {
    localStorage.removeItem('tokenTime');
    localStorage.removeItem('user');
};

export const getCurrentToken = () => {
    const user: IUser | null = JSON.parse(localStorage.getItem('user') as string);
    return user ? user.token : ''
};

export const authHeader = () => {
    if (validToken()) {
        return { 'x-access-token': getCurrentToken() };
        // return { Authorization: 'Bearer ' + getCurrentToken() }
    } else {
        return {}
    }
};

