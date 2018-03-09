import { defaultRegions } from '..';

const saveRegion = (state = defaultRegions, payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null) { return state; }
    obj.list[obj.config.selectedRegion] = payload;

    return obj;
};

export default saveRegion;
