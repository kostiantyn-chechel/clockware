import {
    EMPTY_BOOKING,
    FETCH_MASTER_SUCCESS,
    SET_BOOKING_SHOW,
} from '../actions/actionTypes';

const initialState = {
    clientId: null,
    bookingShow: 'filling', // filling, select, gratitude
    proposal: [],
};

export default  function bookingReducer(state = initialState, action) {
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
        case EMPTY_BOOKING:
            return {
                ...state,
                bookingShow: 'filling',
            };

        default:
            return state;
    }
}