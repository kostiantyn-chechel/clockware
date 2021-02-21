import { IUser } from "../interfaces";

const TOKEN_VALIDITY_TIME = 60 * 1000 * 30; // 30 min - token validity time

export const saveUserToLocalStorage = (user: IUser) => { localStorage.setItem('user', JSON.stringify(user)) };

export const validToken = (): boolean => {
    const user: IUser | null = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
        if (user.token && (Date.now() < user.tokenTime)) return true
    }
    logoutLocal();
    return false
};

export const getTokenTime = (): number => {
    const expiredTime = new Date().getTime();
    return expiredTime + TOKEN_VALIDITY_TIME
};

export const isTokenValid  = (token: string, tokenTime: number): boolean => {
    if (!!token && Date.now() < tokenTime) return true;
    logoutLocal();
    return false
};

export const logoutLocal = () => {
    localStorage.removeItem('user');
};

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user && isTokenValid(user.token, user.tokenTime)) {
        return { 'x-access-token': user.token };
        // return { Authorization: 'Bearer ' + user.token }
    } else {
        return {}
    }
};

