import { defaultRegions } from '..';

const toggleNodes = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null) { return state; }
    obj.config.showNodes = payload;

    return obj;
};

export default toggleNodes;
