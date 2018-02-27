import {combineReducers} from 'redux';
import {config} from './config';
import {regions} from './regions';

const rootReducer = combineReducers({
    config: config,
    regions: regions
});

export default rootReducer;
