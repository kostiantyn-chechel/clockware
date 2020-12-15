import {
    AuthActionTypes,
    AUTH_USER_MESSAGE,
    RESET_USER,
    SET_IS_TOKEN, SET_USER
} from './actionTypes';
import { saveToken } from '../../helpers/authProcessing';
import { IAuthUser } from "../../interfaces";
import { postServerRequest } from "../../helpers/axios/axiosClockwareAPI";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo)
        .then(response => {
            console.log('response', response);
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

export const authUserMessage = (message: string): AuthActionTypes => ({ type: AUTH_USER_MESSAGE, payload: message });
export const setIsToken = (status: boolean): AuthActionTypes => ({ type: SET_IS_TOKEN, payload: status });
export const resetUser = () => ({ type: RESET_USER });
