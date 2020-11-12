import {
    deleteAuthServerRequest,
    getAuthServerRequest,
    getServerRequest,
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

export const fetchClients = () => {
    return async dispatch => getAuthServerRequest('/clients')
        .then(clients => dispatch({type: FETCH_CLIENTS, payload: clients}))
        .catch(() => dispatch(showError()));
};

export const fetchMasters = () => {
    return async dispatch => getAuthServerRequest('/masters')
        .then(masters => dispatch({ type: FETCH_MASTERS, payload: masters }))
        .catch(() => dispatch(showError()));
};

export const fetchFilterAndPaginOrders = ({word, limit, offset, sortBy, sort}) => {
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    return async dispatch => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_PAGIN_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

export const fetchFilterAndInfiniteOrders = ({word, limit, offset, sortBy, sort}) => {
    const url = `/orders/filter?word=${word}&limit=${limit}&offset=${offset}&sortBy=${sortBy}&sort=${sort}`;
    return async dispatch => getAuthServerRequest(url)
        .then(orders => dispatch({type: FETCH_FILTER_INFINITE_ORDERS, payload: orders}))
        .catch(() => dispatch(showError()));
};

export const fetchCities = () => {
    return async dispatch => getServerRequest('/cities')
        .then(cities => dispatch({ type: FETCH_CITIES, payload: cities }))
        .catch(() => dispatch(showError()));
};

export const addMaster = master => {
    return async dispatch => postAuthServerRequest('/masters', master)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const editMaster = master => {
    return async dispatch => putAuthServerRequest(`/masters/${master.id}`, master)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const deleteMaster = masterId => {
    return async dispatch => deleteAuthServerRequest(`/masters/${masterId}`)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const addCity = city => {
    return async dispatch => postAuthServerRequest('/cities', city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const editCity = city => {
    return async dispatch => putAuthServerRequest(`/cities/${city.id}`, city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const deleteCity = cityId => {
    return async dispatch => deleteAuthServerRequest(`/cities/${cityId}`)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const addClient = client => {
    return async dispatch => postAuthServerRequest('/clients', client)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const editClient = client => {
    return async dispatch => putAuthServerRequest(`/clients/${client.id}`, client)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const deleteClient = clientId => {
    return async dispatch => deleteAuthServerRequest(`/clients/${clientId}`)
        .then(() => dispatch(fetchClients()))
        .catch(() => dispatch(showError()));
};

export const deleteOrder = orderId => {
    return async dispatch => deleteAuthServerRequest(`/orders/${orderId}`)
        // .then(() => dispatch(fetchOrders()))
        .catch(() => dispatch(showError()));
};

export const clearInfiniteOrders = () => ( {type:CLEAR_INFINITE_ORDERS });

export const showError = () => ({ type:SHOW_ERROR });
