import { defaultRegions } from '..';

const shiftRegionDown = (state = defaultRegions()) => {
    let obj = Object.assign({}, state);

    if (obj.config.selectedRegion + 1 >= obj.list.length) { return state; }
    obj.list.swap(obj.config.selectedRegion, obj.config.selectedRegion + 1);

    return obj;
};

export default shiftRegionDown;
