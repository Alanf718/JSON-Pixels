import { ACTION_ADD_REGION, ACTION_REMOVE_REGION, ACTION_SAVE_REGION, ACTION_UPDATE_SELECTED_REGION,
    ACTION_TOGGLE_NODES, ACTION_RESET_REGION} from '../../containers/home/actions';
import addRegion from './add-region';
import removeRegion from './remove-region';
import config from './config';
import saveRegion from './save-region';
import updateSelectedRegion from './update-selected-region';
import toggleNodes from './toggle-nodes';
import resetRegion from './reset-region';

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
        case ACTION_UPDATE_SELECTED_REGION: {
            return updateSelectedRegion(state, payload);
        }
        default:
            return state;
    }
};
