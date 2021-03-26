import { getAuthServerRequest } from '../../helpers/axios/axiosClockwareAPI';
import { GET_MASTER_ORDERS_ARR } from '../actionType/calendarActionTupe';

export const getCalendarMasterOrders = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/calendar/master/${id}`)
        .then(orders => {
            dispatch ({ type: GET_MASTER_ORDERS_ARR, payload: orders });
        })
};