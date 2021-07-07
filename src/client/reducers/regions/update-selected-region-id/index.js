import { defaultRegions } from '..';

const updateSelectedRegionID = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);

    if (payload === null) {
        obj.config.selectedRegionID = obj.list[obj.config.selectedRegion].id;
    } else {
        obj.config.selectedRegionID = payload;
    }

    return obj;
};

export default updateSelectedRegionID;
