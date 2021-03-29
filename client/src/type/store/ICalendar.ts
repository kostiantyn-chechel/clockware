import { ICalendarEvents, ICalendarMaster, ISendOrder } from '../../interfaces';


export default interface ICalendarInitialState {
    order: ISendOrder
    masterOrders: ICalendarEvents[]
    masterList: ICalendarMaster[]
}
