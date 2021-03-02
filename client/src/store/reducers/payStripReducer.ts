import {PayStripActionType} from "../actionType/payStripActionType";

interface IPayStripReducer {
    stripResponse: {}
}

const initialState: IPayStripReducer = {
    stripResponse: {}
};

export default function payStripReducer(state = initialState, action: PayStripActionType): IPayStripReducer {
    switch (action.type) {
        case 'PAY_STRIP_TEST':
            return {
                ...state,
                stripResponse: action.payload,
            };

        default:
            return state
    }
}