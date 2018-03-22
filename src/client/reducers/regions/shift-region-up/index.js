import { defaultRegions } from '..';
import { groupShift, retrieveNearestSiblingIndex, arrayMove } from '../../../containers/home/functions/utilities';
import { REGION_TYPE_GROUP } from '../../../containers/home/constants';

/*eslint-disable*/
const shiftRegionUp = (state = defaultRegions()) => {
    let obj = Object.assign({}, state);

    if (obj.config.selectedRegion - 1 < 0) { return state; }
    if (obj.list[obj.config.selectedRegion].type === REGION_TYPE_GROUP) {
        obj.list = groupShift(obj.list, obj.config.selectedRegion, -1);
        obj.config.selectedRegion = obj.config.selectedRegion - 1;
        return obj;
    }

    const nearestSiblingIndex = retrieveNearestSiblingIndex(obj.list, obj.config.selectedRegion, -1)
    obj.list = arrayMove(obj.list, obj.config.selectedRegion, nearestSiblingIndex);
    obj.config.selectedRegion = nearestSiblingIndex;    
    return obj;
};

export default shiftRegionUp;
