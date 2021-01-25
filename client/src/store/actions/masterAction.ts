import {getAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {GET_MASTER_ORDERS} from "./actionTypes";

export const getMasterOrders = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/masters/orders/${id}`)
        .then(orders => {
            dispatch ({ type: GET_MASTER_ORDERS, payload: orders });
        })
};