import { AUTH_USER_MESSAGE, AuthActionTypes, RESET_USER, SET_USER, SET_USER_STATUS, } from '../actionType/authActionType';
import { IUser } from "../../interfaces";
import IAuthInitialState from "../../type/store/IAuth";

const USER_ZERO: IUser = {
    id: 0,
    name: '',
    login: '',
    status: "notAuth",
    token: '',
};

const initialState: IAuthInitialState = {
    message: '',
    user: USER_ZERO,
};

export default function authReducer(state = initialState, action: AuthActionTypes): IAuthInitialState {
    switch (action.type) {
        case AUTH_USER_MESSAGE:
            return {
                ...state,
                message: action.payload
            };

        case SET_USER:
            return {
                ...state,
                user: action.payload
            };

        case SET_USER_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
                    status: action.payload
                }
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