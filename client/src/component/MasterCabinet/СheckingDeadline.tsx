import React from 'react';

interface ICheckingDeadline {
    date: string
    time: string
    hours: number
}

const CheckingDeadline: React.FC<ICheckingDeadline> = (props) => {
    const { date, time, hours } = props;

    const rightNow = new Date();
    const orderDate = new Date(date);
    orderDate.setHours(+time.slice(0, time.length - 3) + hours, 0, 0);

    const dateDifference = orderDate.valueOf() - rightNow.valueOf();
    if (dateDifference <= 0) {
        return (
            <>
                {`overdue: ${ - Math.round(dateDifference/(1000*60*60*24))} дней`}
            </>
        )}
    if (dateDifference > 86400000) {
        return (
            <>
                {`дней: ${Math.round(dateDifference/(1000*60*60*24))}`}
            </>
        )
    } else {

        return (
            <>
                {`часов: ${Math.round(dateDifference/(1000*60*60))}`}
            </>
        )
    }
};

export default CheckingDeadline;