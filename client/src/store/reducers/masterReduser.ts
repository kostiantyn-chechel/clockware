import { MasterActionType } from "../actions/actionTypes";
import { IMasterOrder } from "../../interfaces";

export type MasterInitialStateType = {
    orders: IMasterOrder[]
}

const initialState: MasterInitialStateType = {
    orders: []
};

export default function masterReducer(state = initialState, action: MasterActionType): MasterInitialStateType {
    switch (action.type) {
        case "GET_MASTER_ORDERS":
            return {
                ...state,
                orders: action.payload,
            };

        default:
            return state;
    }
}