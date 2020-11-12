import {AUTH_USER_MESSAGE, SET_CURRENT_USER, SET_IS_TOKEN} from '../actions/actionTypes';

const initialState = {
    currentUser: {},
    message: null,
    isToken: false,
};

export default function authReducer(state = initialState, action) {
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