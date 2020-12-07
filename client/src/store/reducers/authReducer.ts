import {
    AUTH_USER_MESSAGE,
    SET_IS_TOKEN,
    AuthActionTypes,
} from '../actions/actionTypes';

export type AuthInitialStateType = {
    message: string | null,
    isToken: boolean,
};

const initialState: AuthInitialStateType = {
    message: null,
    isToken: false,
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

        default:
            return state;
    }
}