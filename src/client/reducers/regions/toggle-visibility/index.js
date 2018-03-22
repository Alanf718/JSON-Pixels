import { defaultRegions } from '..';

/*eslint-disable*/
const toggleVisibility = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null || payload.index < 0 || payload.index >= obj.list.length) {
        obj.list[obj.config.selectedRegion].visible =
            payload.state !== null ? payload.state : !obj.list[obj.config.selectedRegion].visible;
        return obj;
    }
    
    obj.list[payload.index].visible = payload.state !== null ? payload.state : !obj.list[payload.index].visible;
    return obj;
};

export default toggleVisibility;
