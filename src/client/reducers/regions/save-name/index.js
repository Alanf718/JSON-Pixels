import { defaultRegions } from '..';

const saveName = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    obj.list[obj.config.selectedRegion].name = payload;
    return obj;
};

export default saveName;
