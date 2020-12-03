import {
    CLEAR_INFINITE_ORDERS,
    FETCH_CITIES,
    FETCH_CLIENTS,
    FETCH_FILTER_INFINITE_ORDERS,
    FETCH_FILTER_PAGIN_ORDERS,
    FETCH_MASTERS,
    SHOW_ERROR,
} from '../actions/actionTypes';
import { ICity, IClient, IMaster, IOrder } from "../../interfaces";

export type AdminInitialStateType = {
    masters: IMaster[],
    cities: ICity[],
    clients: IClient[],
    ordersInfinite: IOrder[],
    orders: IOrder[],
    hasError: boolean,
};

const initialState: AdminInitialStateType = {
    masters: [],
    cities: [],
    clients: [],
    ordersInfinite: [],
    orders: [],
    hasError: false,
};

export default function adminReducer(state = initialState, action: any): AdminInitialStateType {
    switch (action.type) {
        case FETCH_MASTERS:
            return {
                ...state,
                masters: action.payload,
            };
        case FETCH_CITIES:
            return {
                ...state,
                cities: action.payload,
            };
        case FETCH_CLIENTS:
            return {
                ...state,
                clients: action.payload,
            };
        case FETCH_FILTER_PAGIN_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case FETCH_FILTER_INFINITE_ORDERS:
            return {
                ...state,
                ordersInfinite: action.payload,
            };
        case CLEAR_INFINITE_ORDERS:
            return {
                ...state,
                ordersInfinite: [],
            };
        case SHOW_ERROR:
            return {
                ...state,
                hasError: true,
            };
        default:
            return state;
    }
}