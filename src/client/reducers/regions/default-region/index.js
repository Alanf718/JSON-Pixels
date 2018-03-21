import { getRandomColour, generateID, pick } from '../../../containers/home/functions/utilities';
import closestNode from './nodes/closest-node';

export const baseRegionNonResettable = () => {
    const id = generateID();
    return {
        layer: -1,
        id: id,
        name: 'region_' + id,
        visible: true,
        color: getRandomColour(),
        grouped: false
    };
};

export const baseRegionResettable = () => {
    return {
        selectedNodeIndex: 0,
        closestNode: closestNode(),
        saved: false
    };
};

export const resetBaseRegion = (region) => {
    return Object.assign(region, baseRegionResettable());
};

export const overwriteResettableRegionProperties = (oldRegion, newRegion) => {
    return Object.assign({}, newRegion, pick(oldRegion, Object.getOwnPropertyNames(baseRegionNonResettable())));
};

const createBaseRegion = () => {
    return Object.assign({}, baseRegionNonResettable(), baseRegionResettable());
};

export default createBaseRegion;
