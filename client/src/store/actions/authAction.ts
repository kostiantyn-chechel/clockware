import {
    AUTH_USER_MESSAGE,
    SET_IS_TOKEN
} from './actionTypes';
import { saveToken } from '../../helpers/authProcessing';
import { IAuthUser } from "../../interfaces";
import { postServerRequest } from "../../helpers/axios/axiosClockwareAPI";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo)
        .then(response => {
            if (response.token) {
                saveToken(response.token);
                dispatch(setIsToken(true));
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

export const authUserMessage = (message: string) => ({ type: AUTH_USER_MESSAGE, payload: message });
export const setIsToken = (status: boolean) => ({ type: SET_IS_TOKEN, payload: status });
