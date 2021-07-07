import {combineReducers} from 'redux';
import {config} from './config';
import {regions} from './regions';
import {layers} from './layers';
import { tree } from './tree';

const rootReducer = combineReducers({
    config: config,
    layers: layers,
    regions: regions,
    tree: tree
});

export default rootReducer;
