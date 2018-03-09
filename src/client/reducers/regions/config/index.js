import { ACTION_UPDATE_SELECTED_REGION } from '../../../containers/home/actions/action-types';

const defaultConfig = {
    selectedRegion: -1
};

export const config = (state = defaultConfig, {type, payload} = {}) => {
    switch (type) {
        case ACTION_UPDATE_SELECTED_REGION: {
            return {...state, selectedRegion: payload};
        }
        default:
            return state;
    }
};
