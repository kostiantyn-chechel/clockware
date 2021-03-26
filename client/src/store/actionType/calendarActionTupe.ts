import { ICalendarEvents } from '../../interfaces';

export const GET_MASTER_ORDERS_ARR = 'GET_MASTER_ORDERS_ARR';

export type CalendarActionTypes =
    { type: typeof GET_MASTER_ORDERS_ARR, payload: ICalendarEvents[] }