import { defaultRegions } from '..';
import { arraySwap } from '../../../containers/home/functions/utilities';

const shiftRegionDown = (state = defaultRegions()) => {
    let obj = Object.assign({}, state);

    if (obj.config.selectedRegion + 1 >= obj.list.length) { return state; }
    obj.list = arraySwap(obj.list, obj.config.selectedRegion, obj.config.selectedRegion + 1);

    return obj;
};

export default shiftRegionDown;
