import {
    AdminActionTypes,
    ADD_MASTER_MASSAGE,
    CLEAR_INFINITE_ORDERS,
    FETCH_CITIES,
    FETCH_CLIENTS,
    FETCH_FILTER_INFINITE_ORDERS,
    FETCH_FILTER_PAGIN_ORDERS,
    FETCH_MASTERS,
    SHOW_ERROR,
} from '../actionType/adminActionType';
import {ICity, IClient, IMaster, IOrderPac} from "../../interfaces";

export type AdminInitialStateType = {
    masters: IMaster[],
    cities: ICity[],
    clients: IClient[],
    ordersInfinite: IOrderPac,
    orders: IOrderPac,
    hasError: boolean,
    massage: string,
};

const initialState: AdminInitialStateType = {
    masters: [],
    cities: [],
    clients: [],
    ordersInfinite: {
        count: 0,
        rows: [],
    },
    orders: {
        count: 0,
        rows: [],
    },
    hasError: false,
    massage: '',
};

export default function adminReducer(state = initialState, action: AdminActionTypes): AdminInitialStateType {
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
                ordersInfinite: { count: 0, rows: [] },
            };
        case SHOW_ERROR:
            return {
                ...state,
                hasError: true,
            };
        case ADD_MASTER_MASSAGE:
            return {
                ...state,
                massage: action.payload,
            };
        default:
            return state;
    }
}