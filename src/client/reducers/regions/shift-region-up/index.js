import { defaultRegions } from '..';
import { arraySwap } from '../../../containers/home/functions/utilities';

const shiftRegionUp = (state = defaultRegions()) => {
    let obj = Object.assign({}, state);

    if (obj.config.selectedRegion - 1 < 0) { return state; }
    obj.list = arraySwap(obj.list, obj.config.selectedRegion, obj.config.selectedRegion - 1);

    return obj;
};

export default shiftRegionUp;
