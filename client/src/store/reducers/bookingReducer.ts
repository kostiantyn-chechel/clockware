import {
    FETCH_MASTER_SUCCESS,
    SET_BOOKING_SHOW,
} from '../actions/actionTypes';
import { IMaster, TBookingShow } from "../../interfaces";

export type BookingReduceType = {
    bookingShow: TBookingShow,
    proposal: IMaster[],
};

const initialState: BookingReduceType = {
    bookingShow: 'filling',
    proposal: [],
};

export default function bookingReducer(state= initialState, action: any): BookingReduceType {
    switch (action.type) {
        case FETCH_MASTER_SUCCESS:
            return {
                ...state,
                proposal: action.payload,
            };

        case SET_BOOKING_SHOW:
            return {
                ...state,
                bookingShow: action.payload,
            };

        default:
            return state;
    }
};