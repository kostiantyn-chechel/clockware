import {getAuthServerRequest, putAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {GET_MASTER_ORDERS} from "./actionTypes";
import {TOrderStatus} from "../../interfaces";

export const getMasterOrders = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/masters/orders/${id}`)
        .then(orders => {
            dispatch ({ type: GET_MASTER_ORDERS, payload: orders });
        })
};

export const putMasterOrderStatus = (orderId: number, status: TOrderStatus, masterId: number) => {
    const body = { orderId: orderId, status: status };
    return async (dispatch: any) => putAuthServerRequest(`/masters/order/${masterId}`, body)
        .then(() => dispatch(getMasterOrders(masterId)))
};