import defaultNode from '../nodes/node';
import { REGION_TYPE_RECTANGLE } from '../../../../containers/home/enums/region-types';

const rectangleRegion = {
    type: REGION_TYPE_RECTANGLE,
    width: 0,
    height: 0,
    nodes: [
        Object.assign({}, defaultNode),
        Object.assign({}, defaultNode),
        Object.assign({}, defaultNode),
        Object.assign({}, defaultNode)
    ]
};

export default rectangleRegion;
