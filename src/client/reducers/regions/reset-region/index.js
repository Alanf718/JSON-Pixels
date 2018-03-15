import { defaultRegions } from '..';
import { resetPolygonRegion } from '../default-region/polygon-region';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE } from '../../../containers/home/actions';
import { resetRectangleRegion } from '../default-region/rect-region';

const resetRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);
    switch(payload.mode) {
        case REGION_MODE_POLYGON:
            if (payload.index < 0) {
                obj.list[obj.config.selectedRegion] = resetPolygonRegion(obj.list[obj.config.selectedRegion]);
            } else {
                obj.list[payload.index] = resetPolygonRegion(obj.list[payload.index]);
            }
            break;
        case REGION_MODE_RECTANGLE:
        default:
            if (payload.index < 0) {
                obj.list[obj.config.selectedRegion] = resetRectangleRegion(obj.list[obj.config.selectedRegion]);
            } else {
                obj.list[payload.index] = resetRectangleRegion(obj.list[payload.index]);
            }
            break;
    }

    return obj;
};

export default resetRegion;
