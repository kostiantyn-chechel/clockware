import { ICalendarEvents, ICalendarMaster, INewCalendarOrder } from '../../interfaces';

export const GET_MASTER_ORDERS_ARR = 'GET_MASTER_ORDERS_ARR';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const SET_CALENDAR_ORDER = 'SET_CALENDAR_ORDER';
export const SET_NEW_CALENDAR_ORDER = 'SET_NEW_CALENDAR_ORDER';

export type CalendarActionTypes =
    { type: typeof GET_MASTER_ORDERS_ARR, payload: ICalendarEvents[] }|
    { type: typeof GET_MASTER_LIST, payload: ICalendarMaster[] } |
    { type: typeof SET_CALENDAR_ORDER, payload: any } |
    { type: typeof SET_NEW_CALENDAR_ORDER, payload: INewCalendarOrder }