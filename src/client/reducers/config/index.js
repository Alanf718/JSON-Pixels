import { ACTION_REGION_MODE, ACTION_TOGGLE_SAVE_REGION } from '../../containers/home/actions/action-types';
import { REGION_MODE_RECTANGLE } from '../../containers/home/enums/region-modes';

const defaultConfig = () => {
    return {
        regionMode: REGION_MODE_RECTANGLE,
        saveRegion: false
    };
};

export const config = (state = defaultConfig(), {type, payload} = {}) => {
    switch (type) {
        case ACTION_REGION_MODE: {
            return {...state, regionMode: payload};
        }
        case ACTION_TOGGLE_SAVE_REGION: {
            return {...state, saveRegion: payload};
        }
        default:
            return state;
    }
};
