import React from 'react';
import {IClientOrder} from "../../interfaces";
import ClientOrderItem from "./CLientOrderItem";

type ClientOrderType = {
    orders: IClientOrder[]
}

const ClientOrders: React.FC<ClientOrderType> = (props) => {
    const { orders } = props;

    
    const OrdersList = () => {
        if (orders.length) {
            return orders.map(order => {
                return (
                    <ClientOrderItem key={order.id} order={order}/>
                )
            })
        }
        return null
    };


    return (
        <div>
            {`Client Order List`}
            {/*// @ts-ignore*/}
            <OrdersList/>
        </div>
    );
};

export default ClientOrders;