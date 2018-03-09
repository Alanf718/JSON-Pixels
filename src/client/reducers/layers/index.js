import defaultConfig from './config';
import { TOGGLE_NODES } from '../../containers/home/actions/action-types';

const defaultLayers = {
    config: Object.assign({}, defaultConfig),
    list: []
};

export const layers = (state = defaultLayers, {type, payload} = {}) => {
    switch (type) {
        case TOGGLE_NODES: {
            let obj = Object.assign({}, state);
            if (obj.config.selectedLayerIndex < 0 || obj.config.selectedLayerIndex > obj.list.length) { return state; }
            obj.list[obj.config.selectedLayerIndex].showNodes = payload;
            return obj;
        }
        default:
            return state;
    }
};
