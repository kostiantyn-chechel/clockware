import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import appReducer from "./appReducer";
import masterReducer from "./masterReduser";

const rootReducer = combineReducers({
    app: appReducer,
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer,
    client: clientReducer,
    master: masterReducer,
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>