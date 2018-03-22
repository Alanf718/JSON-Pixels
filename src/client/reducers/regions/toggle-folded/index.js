import { defaultRegions } from '..';

/*eslint-disable*/
const toggleFolded = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null || payload.index < 0 || payload.index >= obj.list.length) { 
        obj.list[obj.config.selectedRegion].folded =
            payload.state !== null ? payload.state : !obj.list[obj.config.selectedRegion].folded;
        return obj;
    }
    
    obj.list[payload.index].folded = payload.state !== null ? payload.state : !obj.list[payload.index].folded;
    return obj;
};

export default toggleFolded;
