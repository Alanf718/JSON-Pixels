import defaultNode from '../nodes/node';
import { REGION_TYPE_POLYGON } from '../../../../containers/home/enums/region-types';

export const MIN_POLYGON_NODES = 3;

const polygonRegion = {
    type: REGION_TYPE_POLYGON,
    index: -1,
    closed: false,
    nodes: [Object.assign({}, defaultNode)]
};

export default polygonRegion;
