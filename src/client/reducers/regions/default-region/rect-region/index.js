import node from '../nodes/node';
import { REGION_TYPE_RECTANGLE } from '../../../../containers/home/constants';
import createBaseRegion, { resetBaseRegion } from '..';

export const rectangleRegionNonResettable = () => {
    return {
        type: REGION_TYPE_RECTANGLE
    };
};

export const rectangleRegionResettable = () => {
    return {
        width: 0,
        height: 0,
        nodes: [
            node(),
            node(),
            node(),
            node()
        ]
    };
};

export const resetRectangleRegion = (region) => {
    return Object.assign(resetBaseRegion(region), rectangleRegionResettable());
};

const createRectangleRegion = () => {
    return Object.assign(createBaseRegion(), rectangleRegionNonResettable(), rectangleRegionResettable());
};

export default createRectangleRegion;
