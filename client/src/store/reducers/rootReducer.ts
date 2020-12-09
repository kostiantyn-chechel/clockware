import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer,
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>