import { getAuthServerRequest, putAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";
import { GET_STRIPE_CLIENT_SECRET } from "../actionType/payStripeActionType";

export const getStripeClientSecret = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`pay/stripe/${id}`)
        .then(secret => dispatch({ type: GET_STRIPE_CLIENT_SECRET, payload: secret }))
};

export const changeOrderPayStatus = (orderId: number, payStatus: number) => {
    const body = { orderId: orderId, payStatus: payStatus };
    return async (dispatch: any) => putAuthServerRequest(`orders/pay`, body)
};
