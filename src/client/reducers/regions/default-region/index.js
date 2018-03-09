import { getRandomColour } from '../../../containers/home/functions/utilities';
import closestNode from './nodes/closest-node';

const baseRegion = () => {
    return {
        layer: -1,
        color: getRandomColour(),
        selectedNodeIndex: 0,
        closestNode: closestNode(),
        saved: false
    };
};

export default baseRegion;
