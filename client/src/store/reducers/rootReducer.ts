import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import appReducer from "./appReducer";
import masterReducer from "./masterReduser";
import payStripeReducer from './payStripeReducer';
import orderReducer from './orderReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
    app: appReducer,
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer,
    client: clientReducer,
    master: masterReducer,
    payStripe: payStripeReducer,
    order: orderReducer,
    calendar: calendarReducer,
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>