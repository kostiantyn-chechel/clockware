import {
    EMPTY_BOOKING,
    FETCH_MASTER_SUCCESS, SET_BOOKING_SHOW,
} from './actionTypes';
import {getServerRequest, postServerRequest} from '../../helpers/axios/axiosClockware'

export const findMaster = (cityId, date, time, size) => {
    const URL= `/masters/find?cityId=${cityId}&date=${date}&time=${time}&size=${size}`;
    return async dispatch => getServerRequest(URL)
        .then(proposal => dispatch(fetchMasterSuccess(proposal)))
        .then(() => dispatch(setBookingShow('select')))
};

export const fetchMasterSuccess = payload => ({ type: FETCH_MASTER_SUCCESS, payload: payload });
export const setBookingShow = payload => ({ type: SET_BOOKING_SHOW, payload: payload });

export const sendOrder = order => {
    return async dispatch => postServerRequest('/orders', order)
        .then(() => {
            dispatch(setBookingShow('gratitude'));
        })
};

//start booking
export const emptyBooking = () => ({ type: EMPTY_BOOKING});







