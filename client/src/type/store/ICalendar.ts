import { ICalendarEvents, ICalendarMaster, INewCalendarOrder, ISendOrder } from '../../interfaces';

export default interface ICalendarInitialState {
    order: ISendOrder
    masterOrders: ICalendarEvents[]
    masterList: ICalendarMaster[]
    newOrder: INewCalendarOrder
}
