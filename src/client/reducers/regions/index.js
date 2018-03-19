import { ACTION_ADD_REGION, ACTION_REMOVE_REGION, ACTION_SAVE_REGION, ACTION_UPDATE_SELECTED_REGION,
    ACTION_TOGGLE_NODES, ACTION_RESET_REGION, ACTION_UPDATE_SELECTED_REGION_ID,
    ACTION_SAVE_NAME,
    ACTION_SHIFT_REGION_UP,
    ACTION_SHIFT_REGION_DOWN,
    ACTION_CREATE_GROUP} from '../../containers/home/actions';
import addRegion from './add-region';
import removeRegion from './remove-region';
import config from './config';
import saveRegion from './save-region';
import updateSelectedRegion from './update-selected-region';
import toggleNodes from './toggle-nodes';
import resetRegion from './reset-region';
import updateSelectedRegionID from './update-selected-region-id';
import saveName from './save-name';
import shiftRegionUp from './shift-region-up';
import shiftRegionDown from './shift-region-down';
import createGroup from './create-group';

export const defaultRegions = () => {
    return {
        config: config(),
        list: []
    };
};

/*eslint-disable*/
export const regions = (state = defaultRegions(), {type, payload} = {}) => {
    switch (type) {
        case ACTION_ADD_REGION: {
            return addRegion(state, payload);
        }
        case ACTION_REMOVE_REGION: {
            return removeRegion(state, payload);
        }
        case ACTION_RESET_REGION: {
            return resetRegion(state, payload);
        }
        case ACTION_SAVE_REGION: {
            return saveRegion(state, payload);
        }
        case ACTION_TOGGLE_NODES: {
            return toggleNodes(state, payload);
        }
        case ACTION_SHIFT_REGION_UP: {
            return shiftRegionUp(state);
        }
        case ACTION_SHIFT_REGION_DOWN: {
            return shiftRegionDown(state);
        }
        case ACTION_UPDATE_SELECTED_REGION: {
            return updateSelectedRegion(state, payload);
        }
        case ACTION_UPDATE_SELECTED_REGION_ID: {
            return updateSelectedRegionID(state, payload);
        }
        case ACTION_SAVE_NAME: {
            return saveName(state, payload);
        }
        case ACTION_CREATE_GROUP: {
            return createGroup(state, payload);
        }
        default:
            return state;
    }
};
