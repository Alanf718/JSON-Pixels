import { defaultRegions } from '..';

const saveName = (state = defaultRegions(), payload = {}) => {
    let obj = Object.assign({}, state);
    /*eslint-disable*/
    console.log(payload);
    obj.list[obj.config.selectedRegion].name = payload;
    console.log(obj.list[obj.config.selectedRegion].name);    

    return obj;
};

export default saveName;
