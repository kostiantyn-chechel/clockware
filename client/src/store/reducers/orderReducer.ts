import IOrderInitialStateType from '../../type/store/IOrder';
import { OrderActionTypes } from '../actionType/orderActionType';
import { IOrderById } from '../../interfaces';

const EMPTY_ORDER: IOrderById = {
    id: 0,
    date: '',
    hours: 0,
    photoURL: '',
    time: '',
    cost: 0,
    costStatus: 0,
    order_user: {name: ''},
    order_city: {name: ''},
    order_master: {name: ''},
};

const initialState: IOrderInitialStateType = {
    order: EMPTY_ORDER,
};

export default function orderReducer(state = initialState, action: OrderActionTypes): IOrderInitialStateType {
    switch (action.type) {
        case 'GET_ORDER_BY_ID':
            return {
                ...state,
                order: action.payload,
            };

        default:
            return state;
    }
}