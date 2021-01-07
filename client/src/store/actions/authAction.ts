import {
    AuthActionTypes,
    AUTH_USER_MESSAGE,
    RESET_USER,
    SET_USER
} from './actionTypes';
import { saveToken } from '../../helpers/authProcessing';
import {IAuthUser, IChangeRegUser, IRegUser} from "../../interfaces";
import { postServerRequest, postAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo)
        .then(response => {
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
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
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
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
    return async (dispatch: any) => postAuthServerRequest('/auth/change', userChangeRegInfo)
        .then(response => {
            if (response.token) {
                dispatch({ type: SET_USER, payload: response });
                saveToken(response.token, response.status);
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
export const resetUser = () => ({ type: RESET_USER });
