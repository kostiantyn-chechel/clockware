import {
    CLEAR_INFINITE_ORDERS,
    FETCH_FILTER_INFINITE_ORDERS,
    FETCH_FILTER_PAGIN_ORDERS,
    SHOW_ERROR,
} from '../actionType/adminActionType';
import { IFetchFilterOrders } from "../../interfaces";
import {
    deleteAuthServerRequest,
    getAuthServerRequest,
} from "../../helpers/axios/axiosClockwareAPI";
import { GET_ORDER_BY_ID } from '../actionType/orderActionType';

export const fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => Promise<any> =
                                                        (param: IFetchFilterOrders): Promise<any> => {
    const {word, limit, offset, sortBy, sort} = param;
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    // @ts-ignore
    return async (dispatch: any) => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_PAGIN_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

export const fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => Promise<any> =
                                                        (param: IFetchFilterOrders): Promise<any> => {
    const {word, limit, offset, sortBy, sort} = param;
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    // @ts-ignore
    return async (dispatch: any): Promise<any> => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_INFINITE_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

export const deleteOrder = (orderId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/orders/${orderId}`)
        .catch(() => dispatch(showError()));
};

export const getOrderById = (orderId: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/orders/${orderId}`)
        .then(order => dispatch({ type: GET_ORDER_BY_ID, payload: order}))
};

export const clearInfiniteOrders = () => ({ type:CLEAR_INFINITE_ORDERS });

export const showError = () => ({ type:SHOW_ERROR });
