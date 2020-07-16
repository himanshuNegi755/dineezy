import authReducer from './authReducer';
import itemOrderedReducer from './itemOrderedReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    item: itemOrderedReducer
});


export default rootReducer;