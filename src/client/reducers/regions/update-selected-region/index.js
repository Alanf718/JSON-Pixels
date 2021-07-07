import { defaultRegions } from '..';

/*eslint-disable*/
const updateSelectedRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);
    
    if (payload === null) { return state; }
    if (payload >= obj.list.length) {
        obj.config.selectedRegion = obj.list.length - 1;
        return obj;
    }
    if (payload < 0) {
        obj.config.selectedRegion = 0;
        return obj;
    }

    obj.config.selectedRegion = payload;
    return obj;
};

export default updateSelectedRegion;
