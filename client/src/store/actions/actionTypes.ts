import {ICity, IClient, IClientOrder, IMaster, IOrderPac, IUser, TBookingShow, TUserStatus} from "../../interfaces";

//APP
export const SET_OPEN_MENU = 'SET_OPEN_MENU';

export type AppActionTypes =
    { type: typeof SET_OPEN_MENU, payload: boolean }

//BOOKING
export const FETCH_MASTER_SUCCESS = 'FETCH_MASTER_SUCCESS';
export const SET_BOOKING_SHOW = 'SET_BOOKING_SHOW';

export type BookingActionTypes =
    { type: typeof FETCH_MASTER_SUCCESS, payload: IMaster[] } |
    { type: typeof SET_BOOKING_SHOW, payload: TBookingShow }

//ADMIN
export const FETCH_CITIES = 'FETCH_CITIES';
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_MASTERS = 'FETCH_MASTERS';
export const FETCH_FILTER_PAGIN_ORDERS = 'FETCH_FILTER_PAGIN_ORDERS';
export const FETCH_FILTER_INFINITE_ORDERS = 'FETCH_FILTER_INFINITE_ORDERS';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_INFINITE_ORDERS = 'CLEAR_INFINITE_ORDERS';

export type AdminActionTypes =
    { type: typeof FETCH_CITIES, payload: ICity[] } |
    { type: typeof FETCH_CLIENTS, payload: IClient[] } |
    { type: typeof FETCH_MASTERS, payload: IMaster[] } |
    { type: typeof FETCH_FILTER_PAGIN_ORDERS, payload: IOrderPac } |
    { type: typeof FETCH_FILTER_INFINITE_ORDERS, payload: IOrderPac } |
    { type: typeof SHOW_ERROR } |
    { type: typeof CLEAR_INFINITE_ORDERS }

//AUTH
export const AUTH_USER_MESSAGE = 'AUTH_USER_MESSAGE';
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export type AuthActionTypes =
    { type: typeof AUTH_USER_MESSAGE, payload: string } |
    { type: typeof SET_USER_STATUS, payload: TUserStatus } |
    { type: typeof SET_USER, payload: IUser } |
    { type: typeof RESET_USER }

//CLIENT
export const SET_CLIENT_ORDERS_LIST = 'SET_CLIENT_ORDERS_LIST';

export type ClientActionTypes =
    { type: typeof SET_CLIENT_ORDERS_LIST, payload: IClientOrder[]}
