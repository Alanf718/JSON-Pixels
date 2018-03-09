import { defaultRegions } from '..';

const updateSelectedRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null) { return state; }
    obj.config.selectedRegion = payload;

    return obj;
};

export default updateSelectedRegion;
