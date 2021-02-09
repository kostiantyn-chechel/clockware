import { IUser, TUserStatus } from "../interfaces";

const TOKEN_VALIDITY_TIME = 60 * 1000 * 30; // 30 min - token validity time

export const saveUserToLocalStorage = (user: IUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    const expiredTime = new Date().getTime(); // todo delete
    localStorage.setItem('tokenTime', JSON.stringify(expiredTime + TOKEN_VALIDITY_TIME));// todo delete
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

export const getTokenTime = (): number => {
    const expiredTime = new Date().getTime();
    return expiredTime + TOKEN_VALIDITY_TIME
};

export const isTokenValid  = (token: string, tokenTime: number): boolean => {
    if (!!token && Date.now() < tokenTime) return true;
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

