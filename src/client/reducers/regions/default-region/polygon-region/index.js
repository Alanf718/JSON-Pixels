import node from '../nodes/node';
import { REGION_TYPE_POLYGON } from '../../../../containers/home/constants';
import createBaseRegion, { resetBaseRegion } from '..';

export const MIN_POLYGON_NODES = 3;

export const polygonRegionNonResettable = () => {
    return {
        type: REGION_TYPE_POLYGON
    };
};

export const polygonRegionResettable = () => {
    return {
        closed: false,
        nodes: [node()]
    };
};

export const resetPolygonRegion = (region) => {
    return Object.assign(resetBaseRegion(region), polygonRegionResettable());
};

const createPolygonRegion = () => {
    return Object.assign(createBaseRegion(), polygonRegionNonResettable(), polygonRegionResettable());
};

export default createPolygonRegion;
