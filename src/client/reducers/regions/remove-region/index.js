import { defaultRegions } from '..';

/*eslint-disable*/
const removeRegion = (state = defaultRegions(), payload = null) => {
    let obj = Object.assign({}, state);
    
    if (obj.list.length <= 1) { return state; }

    if (payload === null || payload < 0 || payload > obj.length) {
        obj.list.splice(obj.config.selectedRegion, 1);
        return obj;
    }

    obj.list.splice(payload, 1);
    return obj;
};

export default removeRegion;
