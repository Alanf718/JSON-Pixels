import { defaultRegions } from '..';

const removeRegion = (state = defaultRegions, payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload < 0 || payload > obj.length) { return obj.list.splice(obj.config.selectedRegion, 1); }

    return obj.list.splice(payload, 1);
};

export default removeRegion;
