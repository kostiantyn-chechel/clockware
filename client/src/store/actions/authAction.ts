import {
    AuthActionTypes,
    AUTH_USER_MESSAGE,
    RESET_USER,
    SET_USER,
    SET_USER_STATUS
} from './actionTypes';
import {saveToken, saveUserToLocalStorage} from '../../helpers/authProcessing';
import {IAuthUser, IChangeRegUser, IRegUser, TUserStatus} from "../../interfaces";
import {postServerRequest, postAuthServerRequest, ServerPostResponseType} from "../../helpers/axios/axiosClockwareAPI";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo)
        .then(response => setUser(response, dispatch))
        .catch(err => console.log(err.message))
};

export const userRegistrationFetch = (userRegInfo: IRegUser) => {
    return async (dispatch: any) => postServerRequest('/auth/reg', userRegInfo)
        .then(response => setUser(response, dispatch))
        .catch(err => console.log(err.message))
};

export const userRegistrationChange = (userChangeRegInfo: IChangeRegUser) => {
    return async (dispatch: any) => postAuthServerRequest('/auth/change', userChangeRegInfo)
        .then(response => setUser(response, dispatch))
        .catch(err => console.log(err.message))
};

export const setUser = (response: ServerPostResponseType, dispatch: any) => {
    if (response.token) {
        dispatch(setAuthUser(response));
        saveToken(response.token, response.status);
        saveUserToLocalStorage(response);
    } else {
        if(response.message) {
            dispatch(authUserMessage(response.message));
        }
    }
};
export const setAuthUser = (user) => ({ type: SET_USER, payload: user });
export const authUserMessage = (message: string): AuthActionTypes => ({ type: AUTH_USER_MESSAGE, payload: message });
export const resetUser = () => ({ type: RESET_USER });
export const setUserStatus = (status: TUserStatus) => ({ type: SET_USER_STATUS, payload: status });