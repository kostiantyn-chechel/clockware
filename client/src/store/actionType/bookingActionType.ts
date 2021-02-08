import {IMaster, TBookingShow} from "../../interfaces";

export const FETCH_MASTER_SUCCESS = 'FETCH_MASTER_SUCCESS';
export const SET_BOOKING_SHOW = 'SET_BOOKING_SHOW';

export type BookingActionTypes =
    { type: typeof FETCH_MASTER_SUCCESS, payload: IMaster[] } |
    { type: typeof SET_BOOKING_SHOW, payload: TBookingShow }