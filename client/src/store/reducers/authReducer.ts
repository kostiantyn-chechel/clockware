import {
    AuthActionTypes,
    AUTH_USER_MESSAGE,
    RESET_USER,
    SET_IS_TOKEN,
    SET_USER,
} from '../actions/actionTypes';
import {IUser} from "../../interfaces";

const USER_ZERO: IUser = {
    id: 0,
    name: '',
    login: '',
    status: "notAuth",
    token: '',
};

export type AuthInitialStateType = {
    message: string
    isToken: boolean
    user: IUser
};

const initialState: AuthInitialStateType = {
    message: '',
    isToken: false,
    user: USER_ZERO,
};

export default function authReducer(state = initialState, action: AuthActionTypes): AuthInitialStateType {
    switch (action.type) {
        case AUTH_USER_MESSAGE:
            return {
                ...state,
                message: action.payload
            };

        case SET_IS_TOKEN:
            return {
                ...state,
                isToken: action.payload
            };

        case SET_USER:
            return {
                ...state,
                user: action.payload
            };

        case RESET_USER:
            return {
                ...state,
                user: USER_ZERO
            };

        default:
            return state;
    }
}