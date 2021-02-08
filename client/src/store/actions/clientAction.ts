import {getAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {SET_CLIENT_ORDERS_LIST} from "../actionType/clientActionType";

export const fetchClientsOrderList = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/orders/client/${id}`)
        .then(orders => dispatch({ type: SET_CLIENT_ORDERS_LIST, payload: orders }))
};