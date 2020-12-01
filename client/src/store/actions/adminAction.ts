import {
    deleteAuthServerRequest,
    getAuthServerRequest,
    // getServerRequest,
    postAuthServerRequest,
    putAuthServerRequest,
} from '../../helpers/axios/axiosClockware';
import {
    CLEAR_INFINITE_ORDERS,
    FETCH_CITIES,
    FETCH_CLIENTS,
    FETCH_FILTER_INFINITE_ORDERS,
    FETCH_FILTER_PAGIN_ORDERS,
    FETCH_MASTERS,
    SHOW_ERROR,
} from './actionTypes';
import {ICity, IClient, IFetchFilterOrders, IMaster} from "../../interfaces";
import { getServerRequest } from "../../helpers/axios/axiosClockwareAPI";

export const fetchClients = () => {
    return async (dispatch: any) => getAuthServerRequest('/clients')
        .then(clients => dispatch({type: FETCH_CLIENTS, payload: clients}))
        .catch(() => dispatch(showError()));
};

export const fetchMasters = () => {
    return async (dispatch: any) => getAuthServerRequest('/masters')
        .then(masters => dispatch({ type: FETCH_MASTERS, payload: masters }))
        .catch(() => dispatch(showError()));
};

// export const fetchFilterAndPaginOrders = ({word, limit, offset, sortBy, sort}) => {
export const fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => Promise<any> =
                                                        (param: IFetchFilterOrders): Promise<any> => {
    const {word, limit, offset, sortBy, sort} = param;
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    // @ts-ignore //--++--
    return async (dispatch: any) => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_PAGIN_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

export const fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => Promise<any> =
                                                        (param: IFetchFilterOrders): Promise<any> => {
    const {word, limit, offset, sortBy, sort} = param;
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    // @ts-ignore //--++--
    return async (dispatch: any): Promise<any> => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_INFINITE_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

//***
export const fetchCities = () => {
    return async (dispatch: any) => getServerRequest('/cities')
        .then(cities => dispatch({ type: FETCH_CITIES, payload: cities }))
        .catch(() => dispatch(showError()));
};

export const addMaster = (master: IMaster) => {
    return async (dispatch: any) => postAuthServerRequest('/masters', master)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const editMaster = (master: IMaster) => {
    return async (dispatch: any) => putAuthServerRequest(`/masters/${master.id}`, master)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const deleteMaster = (masterId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/masters/${masterId}`)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const addCity = (city: ICity) => {
    return async (dispatch: any) => postAuthServerRequest('/cities', city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const editCity = (city: ICity) => {
    return async (dispatch: any) => putAuthServerRequest(`/cities/${city.id}`, city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const deleteCity = (cityId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/cities/${cityId}`)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const addClient = (client: IClient) => {
    return async (dispatch: any) => postAuthServerRequest('/clients', client)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const editClient = (client: IClient) => {
    return async (dispatch: any) => putAuthServerRequest(`/clients/${client.id}`, client)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const deleteClient = (clientId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/clients/${clientId}`)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const deleteOrder = (orderId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/orders/${orderId}`)
        // .then(() => dispatch(fetchOrders()))
        .catch(() => dispatch(showError()));
};

export const clearInfiniteOrders = () => ({ type:CLEAR_INFINITE_ORDERS });

export const showError = () => ({ type:SHOW_ERROR });
