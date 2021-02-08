import { AppActionTypes } from '../actionType/appActionType';

export type AppReducerInitialStateType = {
    openMenu: boolean
}

const initialState: AppReducerInitialStateType = {
    openMenu: false
};

export default function appReducer(state = initialState, action: AppActionTypes): AppReducerInitialStateType {
    switch (action.type) {
        case "SET_OPEN_MENU":
            return {
                ...state,
                openMenu: action.payload,
            };
        default:
            return state;
    }
}