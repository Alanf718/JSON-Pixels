import { REGION_MODE, TOGGLE_SAVE_REGION } from '../../containers/home/actions/action-types';
import { REGION_MODE_RECTANGLE } from '../../containers/home/enums/region-modes';

const defaultConfig = {
    regionMode: REGION_MODE_RECTANGLE,
    saveRegion: false
};

export const config = (state = defaultConfig, {type, payload} = {}) => {
    switch (type) {
        case REGION_MODE: {
            return {...state, regionMode: payload};
        }
        case TOGGLE_SAVE_REGION: {
            return {...state, saveRegion: payload};
        }
        default:
            return state;
    }
};
