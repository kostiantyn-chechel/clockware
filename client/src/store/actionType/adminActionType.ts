import {ICity, IClient, IMaster, IOrderPac} from "../../interfaces";

export const FETCH_CITIES = 'FETCH_CITIES';
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_MASTERS = 'FETCH_MASTERS';
export const FETCH_FILTER_PAGIN_ORDERS = 'FETCH_FILTER_PAGIN_ORDERS';
export const FETCH_FILTER_INFINITE_ORDERS = 'FETCH_FILTER_INFINITE_ORDERS';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_INFINITE_ORDERS = 'CLEAR_INFINITE_ORDERS';
export const ADD_MASTER_MASSAGE = 'ADD_MASTER_MASSAGE';

export type AdminActionTypes =
    { type: typeof FETCH_CITIES, payload: ICity[] } |
    { type: typeof FETCH_CLIENTS, payload: IClient[] } |
    { type: typeof FETCH_MASTERS, payload: IMaster[] } |
    { type: typeof FETCH_FILTER_PAGIN_ORDERS, payload: IOrderPac } |
    { type: typeof FETCH_FILTER_INFINITE_ORDERS, payload: IOrderPac } |
    { type: typeof SHOW_ERROR } |
    { type: typeof CLEAR_INFINITE_ORDERS }|
    { type: typeof ADD_MASTER_MASSAGE, payload: string}