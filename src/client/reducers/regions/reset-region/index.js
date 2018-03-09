import { defaultRegions } from '..';
import baseRegion from '../default-region';
import polygonRegion from '../default-region/polygon-region';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE } from '../../../containers/home/enums/region-modes';
import rectangleRegion from '../default-region/rect-region';

const resetRegion = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);
    switch(payload.mode) {
        case REGION_MODE_POLYGON:
            if (payload.index < 0) {
                obj.list[obj.config.selectedRegion] =
                    Object.assign({}, baseRegion(), polygonRegion());
            } else {
                obj.list[payload.index] = Object.assign({}, baseRegion(), polygonRegion());
            }
            break;
        case REGION_MODE_RECTANGLE:
        default:
            if (payload.index < 0) {
                obj.list[obj.config.selectedRegion] =
                    Object.assign({}, baseRegion(), rectangleRegion());
            } else {
                obj.list[payload.index] = Object.assign({}, baseRegion(), rectangleRegion());
            }
            break;
    }

    return obj;
};

export default resetRegion;
