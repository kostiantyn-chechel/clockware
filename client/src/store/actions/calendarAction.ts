import { getAuthServerRequest, getServerRequest } from '../../helpers/axios/axiosClockwareAPI';
import { GET_MASTER_LIST, GET_MASTER_ORDERS_ARR, SET_CALENDAR_ORDER } from '../actionType/calendarActionTupe';

export const getCalendarMasterOrders = (id: number) => {
  return async (dispatch: any) =>
    getAuthServerRequest(`/calendar/master/${id}`).then((orders) => {
      dispatch({ type: GET_MASTER_ORDERS_ARR, payload: orders });
    });
};

export const getCalendarMasterList = (cityId: number) => {
  return async (dispatch: any) =>
    getServerRequest(`/calendar/masters/${cityId}`).then((masters) => {
      dispatch({ type: GET_MASTER_LIST, payload: masters });
    });
};

export const setOrderDataForCalendar = (cityId: number, name: string, email: string, size: string, photoURL: string) => {
    return (dispatch: any) => {
        dispatch({ type: SET_CALENDAR_ORDER, payload: {
                cityId,
                name,
                email,
                size,
                photoURL,
            } })
    }
};

