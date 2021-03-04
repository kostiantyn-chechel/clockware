import { PayStripeActionType } from "../actionType/payStripeActionType";
import IPayStripInitialState from '../../type/store/IStripePay';

const initialState: IPayStripInitialState = {
    clientSecret: '',
};

export default function payStripeReducer(state = initialState, action: PayStripeActionType): IPayStripInitialState {
    switch (action.type) {

        case 'GET_STRIPE_CLIENT_SECRET':
            return {
                ...state,
                clientSecret: action.payload,
            };

        default:
            return state
    }
}