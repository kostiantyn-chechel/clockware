import { ICalendarEvents } from '../interfaces';

export const orderTimeCheck = (startTime: string, size: string, masterOrders: ICalendarEvents[]): boolean => {
    const time = new Date(Date.now());
    const hours = +size;

    time.setHours(time.getHours()+1,0,0);
    const nowTime = time.valueOf();
    const start = new Date(startTime).valueOf();
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + hours);
    const end = endTime.valueOf();

    if (nowTime > start) return false;

    let check= true;
    masterOrders.forEach((order) => {
        const startOrder = new Date(order.start).valueOf();
        const endOrder = new Date((order.end)).valueOf();

        if (start < startOrder && end > startOrder) check = false;
        if (start < endOrder  && end > endOrder) check = false;
        if (start >= startOrder  && end <= endOrder) check = false;

    });

    return check
};