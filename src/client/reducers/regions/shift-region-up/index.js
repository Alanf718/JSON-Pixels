import { defaultRegions } from '..';

const shiftRegionUp = (state = defaultRegions()) => {
    let obj = Object.assign({}, state);

    if (obj.config.selectedRegion - 1 < 0) { return state; }
    obj.list.swap(obj.config.selectedRegion, obj.config.selectedRegion - 1);

    return obj;
};

export default shiftRegionUp;
