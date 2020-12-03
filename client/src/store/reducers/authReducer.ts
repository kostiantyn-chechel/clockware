import {AUTH_USER_MESSAGE, AuthActionTypes, SET_CURRENT_USER, SET_IS_TOKEN} from '../actions/actionTypes';

export type AuthInitialStateType = {
    currentUser: {},
    message: string | null,
    isToken: boolean,
};

const initialState: AuthInitialStateType = {
    currentUser: {},
    message: null,
    isToken: false,
};

export default function authReducer(state = initialState, action: AuthActionTypes): AuthInitialStateType {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };

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

        default:
            return state;
    }
}