import node from '../nodes/node';
import { REGION_TYPE_RECTANGLE } from '../../../../containers/home/enums/region-types';

const rectangleRegion = () => {
    return {
        type: REGION_TYPE_RECTANGLE,
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

export default rectangleRegion;
