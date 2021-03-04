import { getAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";
import { GET_STRIPE_CLIENT_SECRET } from "../actionType/payStripeActionType";

export const getStripeClientSecret = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`pay/stripe/${id}`)
        .then(secret => dispatch({ type: GET_STRIPE_CLIENT_SECRET, payload: secret }))
};