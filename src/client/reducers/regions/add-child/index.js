import { defaultRegions } from '..';
import { REGION_TYPE_GROUP } from '../../../containers/home/constants';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE } from '../../../containers/home/actions';
import createRectangleRegion from '../default-region/rect-region';
import createPolygonRegion from '../default-region/polygon-region';
import { arrayMove } from '../../../containers/home/functions/utilities';

/*eslint-disable*/
const addChild = (state = defaultRegions(), payload = null) => {
    let obj = Object.assign({}, state);

    if (obj.list[obj.config.selectedRegion].type !== REGION_TYPE_GROUP) { return state; }

    if (payload.index === null || payload.index < 0 || payload.index >= obj.list.length) {
        switch(payload.mode) {
            case REGION_MODE_POLYGON: 
                obj.list.splice(obj.config.selectedRegion + 1, 0, 
                    Object.assign(createPolygonRegion(), {grouped: true, groupID: obj.list[obj.config.selectedRegion].id}));
                break;
            case REGION_MODE_RECTANGLE:
            default:
                obj.list.splice(obj.config.selectedRegion + 1, 0, 
                    Object.assign(createRectangleRegion(), {grouped: true, groupID: obj.list[obj.config.selectedRegion].id}));
                break;
        }
        obj.list[obj.config.selectedRegion].numberOfChildren++;
        obj.list[obj.config.selectedRegion].folded = false;
        return obj;
    }

    if (obj.list[payload.index].grouped) {
        let i = payload.index;
        while (i >= 0 && obj.list[i].type !== REGION_TYPE_GROUP) {
            i--;
        }
        obj.list[i].numberOfChildren--;
    } else {
        obj.list[payload.index].grouped = true;
    }
    obj.list[payload.index].groupId = obj.list[obj.config.selectedRegion].id;

    obj.list = arrayMove(obj.list, payload.index, obj.config.selectedRegion + 1);
    obj.list[obj.config.selectedRegion].numberOfChildren++;
    obj.list[obj.config.selectedRegion].folded = false;
    return obj;
};

export default addChild;
