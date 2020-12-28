import React from 'react';
import {IClientOrder} from "../../interfaces";
import ClientOrderItem from "./CLientOrderItem";

type ClientOrderType = {
    orders: IClientOrder[]
}

const ClientOrders: React.FC<ClientOrderType> = (props) => {
    const { orders } = props;

    const ordersList = () => {
        if (orders.length) {
            return orders.map(order => {
                return (
                    <ClientOrderItem key={order.id + order.date} order={order}/>
                )
            })
        }
        return null
    };

    return (
        <React.Fragment>
            {ordersList()}
        </React.Fragment>
    );
};

export default ClientOrders;