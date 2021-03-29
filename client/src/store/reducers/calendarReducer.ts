import ICalendarInitialState from '../../type/store/ICalendar';
import { CalendarActionTypes } from '../actionType/calendarActionTupe';

const EMPTY_ORDER ={
    size: '1',
    date: '',
    time: '',
    cityId: 0,
    masterId: 0,
    clientName: '',
    clientEmail: '',
    photoURL: '',
    cost: 10,
    costStatus: 0,
};

const initialState: ICalendarInitialState = {
    order: EMPTY_ORDER,
    masterOrders: [],
    masterList: [],
};

const calendarReducer = (state = initialState, action: CalendarActionTypes): ICalendarInitialState => {
    switch (action.type) {
        case 'GET_MASTER_ORDERS_ARR':
            return {
                ...state,
                masterOrders: action.payload
            };

        case 'GET_MASTER_LIST':
            return {
                ...state,
                masterList: action.payload
            };

        case 'SET_CALENDAR_ORDER':
            return {
                ...state,
                order: {
                    ...state.order,
                    size: action.payload.size,
                    cityId: action.payload.cityId,
                    clientName: action.payload.name,
                    clientEmail:action.payload.email,
                    photoURL: action.payload.photoURL,
                }
            };

        default:
            return state;
    }
};

export default calendarReducer;
