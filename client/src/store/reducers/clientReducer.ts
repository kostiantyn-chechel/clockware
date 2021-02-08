import { IClientOrder } from "../../interfaces";
import { ClientActionTypes } from "../actionType/clientActionType";


type UserInitialStateType = {
    orders: IClientOrder[]
}

const initialState: UserInitialStateType = {
    orders: [],
};

export default function clientReducer(state = initialState, action: ClientActionTypes) {
    switch (action.type) {
        case "SET_CLIENT_ORDERS_LIST":
            return {
                ...state,
                orders: action.payload,
            };
        default:
            return state;
    }
}