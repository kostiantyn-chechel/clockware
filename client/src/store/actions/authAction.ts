import {
    AuthActionTypes,
    AUTH_USER_MESSAGE,
    RESET_USER,
    SET_IS_TOKEN, SET_USER
} from './actionTypes';
import { saveToken } from '../../helpers/authProcessing';
import {IAuthUser, IChangeRegUser, IRegUser} from "../../interfaces";
import { postServerRequest, postAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo)
        .then(response => {
            // console.log('response', response);
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
                dispatch(setIsToken(true)); //TODO ???
            } else {
                if(response.message) {
                    dispatch(authUserMessage(response.message));
                }
            }
        })
        .catch(err => {
            console.log(err.message);
        })
};

export const userRegistrationFetch = (userRegInfo: IRegUser) => {
    return async (dispatch: any) => postServerRequest('/auth/reg', userRegInfo)
        .then(response => {
            console.log('response RegUser', response);
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
                dispatch(setIsToken(true)); //TODO ???
            } else {
                if(response.message) {
                    console.log('registration: ',response.message);
                    // dispatch(authUserMessage(response.message));
                }
            }
        })
        .catch(err => {
            console.log(err.message);
        })
};

export const userRegistrationChange = (userChangeRegInfo: IChangeRegUser) => {
    console.log('userRegistrationChange', userChangeRegInfo);
    return async (dispatch: any) => postAuthServerRequest('/auth/change', userChangeRegInfo)
        .then(response => {
            console.log('response userChangeRegInfo', response);
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
                dispatch(setIsToken(true)); //TODO ???
            } else {
                if(response.message) {
                    console.log('registration: ',response.message);
                    // dispatch(authUserMessage(response.message));
                }
            }
        })
        .catch(err => {
            console.log(err.message);
        })
};






export const authUserMessage = (message: string): AuthActionTypes => ({ type: AUTH_USER_MESSAGE, payload: message });
export const setIsToken = (status: boolean): AuthActionTypes => ({ type: SET_IS_TOKEN, payload: status });
export const resetUser = () => ({ type: RESET_USER });
