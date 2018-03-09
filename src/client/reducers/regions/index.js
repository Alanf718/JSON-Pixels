import { ACTION_ADD_REGION, ACTION_REMOVE_REGION,
    ACTION_SAVE_REGION } from '../../containers/home/actions/action-types';
import addRegion from './add-region';
import removeRegion from './remove-region';
import config from './config';
import saveRegion from './save-region';

export const defaultRegions = {
    config: config,
    list: []
};

export const regions = (state = defaultRegions, {type, payload} = {}) => {
    switch (type) {
        case ACTION_ADD_REGION: {
            return addRegion(state, payload);
        }
        case ACTION_REMOVE_REGION: {
            return removeRegion(state, payload);
        }
        case ACTION_SAVE_REGION: {
            return saveRegion(state, payload);
        }
        default:
            return state;
    }
};
