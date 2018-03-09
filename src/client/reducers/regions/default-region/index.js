import { getRandomColour } from '../../../containers/home/utilities';
import defaultClosestNode from './nodes/closest-node';

const baseRegion = {
    layer: -1,
    color: getRandomColour(),
    selectedNodeIndex: 1,
    closestNode: Object.assign({}, defaultClosestNode),
    saved: false
};

export default baseRegion;
