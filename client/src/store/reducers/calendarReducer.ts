import ICalendarInitialState from '../../type/store/ICalendar';
import { CalendarActionTypes } from '../actionType/calendarActionTupe';

const initialState: ICalendarInitialState = {
    masterOrders: []
};

const calendarReducer = (state = initialState, action: CalendarActionTypes): ICalendarInitialState => {
    switch (action.type) {
        case 'GET_MASTER_ORDERS_ARR':
            return {
                ...state,
                masterOrders: action.payload
            };

        default:
            return state;
    }
};

export default calendarReducer;
