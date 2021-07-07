import { defaultRegions } from '..';
import createBaseGroup from '../default-group';

const createGroup = (state = defaultRegions(), payload = null) => {
    let obj = Object.assign({}, state);

    if (payload === null || payload < 0 || payload >= obj.list.length) {
        obj.list.splice(obj.config.selectedRegion + 1, 0, createBaseGroup());
        return obj;
    }

    obj.list.splice(payload, 0, createBaseGroup());
    return obj;
};

export default createGroup;
