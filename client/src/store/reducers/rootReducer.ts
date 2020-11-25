import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';

export default combineReducers({
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer,
})