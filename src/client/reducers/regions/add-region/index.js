import { defaultRegions } from '..';
import defaultRegionBase from '../default-region';
import defaultPolygonRegion from '../default-region/polygon-region';
import defaultRectRegion from '../default-region/rect-region';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE } from '../../../containers/home/enums/region-modes';

const addRegion = (state = defaultRegions, payload = {}) => {
    let obj = Object.assign({}, state);
    switch(payload.mode) {
        case REGION_MODE_POLYGON:
            obj.list.push(Object.assign({}, defaultRegionBase, defaultPolygonRegion, payload.region));
            obj.config.selectedRegion += 1;
            break;
        case REGION_MODE_RECTANGLE:
        default:
            obj.list.push(Object.assign({}, defaultRegionBase, defaultRectRegion, payload.region));
            obj.config.selectedRegion += 1;
            break;
    }
    return obj;
};

export default addRegion;
