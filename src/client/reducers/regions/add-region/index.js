import { defaultRegions } from '..';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE } from '../../../containers/home/actions';
import createPolygonRegion from '../default-region/polygon-region';
import createRectangleRegion from '../default-region/rect-region';

const addRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);
    switch(payload.mode) {
        case REGION_MODE_POLYGON:
            obj.list.push(Object.assign({}, createPolygonRegion(), payload.region));
            break;
        case REGION_MODE_RECTANGLE:
        default:
            obj.list.push(Object.assign({}, createRectangleRegion(), payload.region));
            break;
    }
    return obj;
};

export default addRegion;
