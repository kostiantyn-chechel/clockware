import { IOrderById } from '../../interfaces';

export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';

export type OrderActionTypes =
    { type: typeof GET_ORDER_BY_ID, payload: IOrderById };
