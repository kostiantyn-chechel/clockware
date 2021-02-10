import { ClientActionTypes } from "../actionType/clientActionType";
import IClientInitialState from "../../type/store/IClient";

const initialState: IClientInitialState = {
    orders: [],
};

export default function clientReducer(state = initialState, action: ClientActionTypes): IClientInitialState {
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