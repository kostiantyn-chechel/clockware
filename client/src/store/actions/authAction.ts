import {postServerRequest} from '../../helpers/axios/axiosClockware';
import { AUTH_USER_MESSAGE, SET_CURRENT_USER, SET_IS_TOKEN} from './actionTypes';
import { saveToken } from '../../helpers/authProcessing';
import { IAuthUser } from "../../interfaces";

export const userLoginFetch = (userInfo: IAuthUser) => {
    return async (dispatch: any) => postServerRequest('/auth', userInfo) //--++--
        .then(response => {
            if (response.token) {
                saveToken(response.token);
                dispatch({ type: SET_CURRENT_USER, payload: response.user });
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
