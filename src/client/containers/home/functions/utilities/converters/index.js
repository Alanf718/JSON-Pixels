import { REGION_TYPE_POLYGON, REGION_TYPE_RECTANGLE, REGION_TYPE_GROUP } from '../../../constants';
import { REGION_MODE_POLYGON, REGION_MODE_RECTANGLE, REGION_MODE_GROUP } from '../../../actions';

/**
 * Converts a region type to it's corresponding region
 * mode.
 * @param {string} type Region type tp convert.
 * @returns {string} Converted mode.
 */
export const convertRegionTypeToMode = function(type) {
    switch (type) {
        case REGION_TYPE_GROUP:
            return REGION_MODE_GROUP;
        case REGION_TYPE_POLYGON:
            return REGION_MODE_POLYGON;
        case REGION_TYPE_RECTANGLE:
        default:
            return REGION_MODE_RECTANGLE;
    }
};
