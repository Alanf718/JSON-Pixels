import { generateID, pick } from '../../../containers/home/functions/utilities';
import { REGION_TYPE_GROUP } from '../../../containers/home/constants';

export const baseGroupNonResettable = () => {
    const id = generateID();
    return {
        id: id,
        name: 'group_' + id,
        type: REGION_TYPE_GROUP,
        visible: true,
        groupID: -1
    };
};

export const baseGroupResettable = () => {
    return {
        numberOfChildren: 0,
        folded: false
    };
};

export const resetBaseGroup = (group) => {
    return Object.assign(group, baseGroupResettable());
};

export const overwriteResettableGroupProperties = (oldGroup, newGroup) => {
    return Object.assign({}, newGroup, pick(oldGroup, Object.getOwnPropertyNames(baseGroupNonResettable())));
};

const createBaseGroup = () => {
    return Object.assign({}, baseGroupNonResettable(), baseGroupResettable());
};

export default createBaseGroup;
