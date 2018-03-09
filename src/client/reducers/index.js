import {combineReducers} from 'redux';
import {config} from './config';
import {regions} from './regions';
import {layers} from './layers';

const rootReducer = combineReducers({
    config: config,
    layers: layers,
    regions: regions
});

export default rootReducer;
