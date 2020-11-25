import {
    FETCH_MASTER_SUCCESS,
    SET_BOOKING_SHOW,
} from './actionTypes';
import { getServerRequest, postServerRequest } from '../../helpers/axios/axiosClockware'
import { IMaster, ISendOrder, TBookingShow } from "../../interfaces";

export const findMaster = (cityId: number, date: string, time: string, size: number) => {
    const URL= `/masters/find?cityId=${cityId}&date=${date}&time=${time}&size=${size}`;
    return async (dispatch: any) => getServerRequest(URL) //--++--
        .then(proposal => dispatch(fetchMasterSuccess(proposal)))
        .then(() => dispatch(setBookingShow('select')))
};

export const fetchMasterSuccess = (payload: IMaster) => ({ type: FETCH_MASTER_SUCCESS, payload: payload });
export const setBookingShow = (payload: TBookingShow) => ({ type: SET_BOOKING_SHOW, payload: payload });

export const sendOrder = (order: ISendOrder) => {
    return async (dispatch: any) => postServerRequest('/orders', order) //--++--
        .then(() => {
            dispatch(setBookingShow('gratitude'));
        })
};

//start booking
export const emptyBooking = () => ({ type: SET_BOOKING_SHOW, payload: 'filling' });