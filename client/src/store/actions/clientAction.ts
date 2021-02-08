import {
    deleteAuthServerRequest,
    getAuthServerRequest,
    postAuthServerRequest,
    putAuthServerRequest
} from "../../helpers/axios/axiosClockwareAPI";
import {SET_CLIENT_ORDERS_LIST} from "../actionType/clientActionType";
import {FETCH_CLIENTS} from "../actionType/adminActionType";
import {showError} from "./orderAction";
import {IClient} from "../../interfaces";

export const fetchClientsOrderList = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/orders/client/${id}`)
        .then(orders => dispatch({ type: SET_CLIENT_ORDERS_LIST, payload: orders }))
};

export const fetchClients = () => {
    return async (dispatch: any) => getAuthServerRequest('/clients')
        .then(clients => dispatch({type: FETCH_CLIENTS, payload: clients}))
        .catch(() => dispatch(showError()));
};

export const fetchFilterClients = (name: string) => {
    const url = `/clients/filter?name=${name}`;
    return async (dispatch: any) => getAuthServerRequest(url)
        .then(clients => dispatch({type: FETCH_CLIENTS, payload: clients}))
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