import { MasterActionType } from "../actionType/masterActionType";
import IMasterInitialState from "../../type/store/IMaster";

const initialState: IMasterInitialState = {
    orders: []
};

export default function masterReducer(state = initialState, action: MasterActionType): IMasterInitialState {
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