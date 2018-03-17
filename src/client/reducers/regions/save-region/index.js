import { defaultRegions } from '..';
import { overwriteResettableRegionProperties } from '../default-region';

const saveRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null) { return state; }
    obj.list[obj.config.selectedRegion] =
        overwriteResettableRegionProperties(obj.list[obj.config.selectedRegion], payload);
    obj.list[obj.config.selectedRegion].saved = true;

    return obj;
};

export default saveRegion;
