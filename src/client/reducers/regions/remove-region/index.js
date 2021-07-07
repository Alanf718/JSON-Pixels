import { defaultRegions } from '..';
import { REGION_TYPE_GROUP } from '../../../containers/home/constants';
import { getRegionTotalChildren } from '../../../containers/home/functions/utilities';

/*eslint-disable*/
const removeRegion = (state = defaultRegions(), payload = null) => {
    let obj = Object.assign({}, state);
    
    if (obj.list.length <= 1) { return state; }

    if (payload === null || payload < 0 || payload > obj.length) {
        if (obj.list[obj.config.selectedRegion].type === REGION_TYPE_GROUP) {
            var num = getRegionTotalChildren(obj.list, obj.config.selectedRegion);
            while (num > 0) {
                obj.list.splice(obj.config.selectedRegion, 1);
                num--;
            }
        }
        obj.list.splice(obj.config.selectedRegion, 1);
        return obj;
    }

    if (obj.list[payload].type === REGION_TYPE_GROUP) {
        var num = getRegionTotalChildren(obj.list, payload);
        while (num > 0) {
            obj.list.splice(payload, 1);
            num--;
        }
    }
    obj.list.splice(payload, 1);
    return obj;
};

export default removeRegion;
