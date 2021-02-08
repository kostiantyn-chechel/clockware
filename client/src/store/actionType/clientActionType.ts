import {IClientOrder} from "../../interfaces";

export const SET_CLIENT_ORDERS_LIST = 'SET_CLIENT_ORDERS_LIST';

export type ClientActionTypes =
    { type: typeof SET_CLIENT_ORDERS_LIST, payload: IClientOrder[]}