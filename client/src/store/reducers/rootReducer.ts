import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer,
    client: clientReducer,
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>