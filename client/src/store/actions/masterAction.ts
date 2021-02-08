import {
    deleteAuthServerRequest,
    getAuthServerRequest,
    postAuthServerRequest,
    putAuthServerRequest
} from "../../helpers/axios/axiosClockwareAPI";
import { GET_MASTER_ORDERS } from '../actionType/masterActionType';
import { TOrderStatus } from "../../interfaces";
import {
    ADD_MASTER_MASSAGE,
    FETCH_MASTERS
} from "../actionType/adminActionType";
import { showError } from "./orderAction";
import { IRegistrationMaster } from "../../component/DataPanel/MasterDataPanel";

export const getMasterOrders = (id: number) => {
    return async (dispatch: any) => getAuthServerRequest(`/masters/orders/${id}`)
        .then(orders => {
            dispatch ({ type: GET_MASTER_ORDERS, payload: orders });
        })
};

export const putMasterOrderStatus = (orderId: number, status: TOrderStatus, masterId: number) => {
    const body = { orderId: orderId, status: status };
    return async (dispatch: any) => putAuthServerRequest(`/masters/order/${masterId}`, body)
        .then(() => dispatch(getMasterOrders(masterId)))
};

export const fetchMasters = () => {
    return async (dispatch: any) => getAuthServerRequest('/masters')
        .then(masters => dispatch({ type: FETCH_MASTERS, payload: masters }))
        .catch(() => dispatch(showError()));
};
export const fetchFilterMasters = (name: string) => {
    const url = `/masters/filter?name=${name}`;
    return async (dispatch: any) => getAuthServerRequest(url)
        .then(masters => dispatch({ type: FETCH_MASTERS, payload: masters }))
        .catch(() => dispatch(showError()));
};

export const addMaster = (master: IRegistrationMaster) => {
    return async (dispatch: any) => postAuthServerRequest('/masters', master)
        .then((response) => {
            if (response.massage) {
                dispatch(addMasterMessage(response.massage))
            } else {
                dispatch(fetchMasters())
            }
        })
        .catch(() => dispatch(showError()));
};

export const addMasterMessage = (message: string) => ({ type: ADD_MASTER_MASSAGE, payload: message });

export const editMaster = (master: IRegistrationMaster) => {
    return async (dispatch: any) => putAuthServerRequest(`/masters/${master.id}`, master)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};

export const deleteMaster = (masterId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/masters/${masterId}`)
        .then(() => dispatch(fetchMasters()))
        .catch(() => dispatch(showError()));
};