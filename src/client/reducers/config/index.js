import { ACTION_REGION_MODE, ACTION_TOGGLE_SAVE_REGION, REGION_MODE_RECTANGLE } from '../../containers/home/actions';

const defaultConfig = () => {
    return {
        regionMode: REGION_MODE_RECTANGLE,
        saveRegion: false
    };
};

export const config = (state = defaultConfig(), {type, payload} = {}) => {
    switch (type) {
        case ACTION_REGION_MODE: {
            if (payload === null) { return state; }
            return {...state, regionMode: payload};
        }
        case ACTION_TOGGLE_SAVE_REGION: {
            return {...state, saveRegion: payload};
        }
        default:
            return state;
    }
};
