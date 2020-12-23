import React from 'react';
import { IClientOrder } from "../../interfaces";

type ClientOrderItemType = { order: IClientOrder }

const ClientOrderItem: React.FC<ClientOrderItemType> = (props) => {
    const { order: { id, date, time, hours, photoURL, order_master: {name: masterName}, order_city: {name: cityName},
    review}} = props;

    return (
        <div key={id + date}>
            {id} <br/>
            {date} <br/>
            {time} <br/>
            {hours} <br/>
            {photoURL} <br/>
            {cityName}<br/>
            {masterName} <br/>
            {/*{review.review} <br/>*/}
            {/*{review.rating} <br/>*/}
            {'***********************************'}
        </div>
    );
};

export default ClientOrderItem;