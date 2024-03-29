import IAuthInitialState from './IAuth';
import IClientInitialState from './IClient';
import IMasterInitialState from "./IMaster";
import IPayStripInitialState from './IStripePay';
import IOrderInitialStateType from './IOrder';
import ICalendarInitialState from './ICalendar';

export default interface IStore {
    auth: IAuthInitialState,
    client: IClientInitialState,
    master: IMasterInitialState,
    payStripe: IPayStripInitialState,
    order: IOrderInitialStateType,
    calendar: ICalendarInitialState,
}