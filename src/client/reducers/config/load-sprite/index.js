import { defaultConfig } from '..';

/*eslint-disable*/
const loadSprite = (state = defaultConfig(), payload = {}) => {
    let obj = Object.assign({}, state);
    
    if (payload.src === null || payload.src === undefined || payload.src === '') { return state; }

    let img = new Image();
    img.src = payload.src;
    
    if (payload.callback !== null && payload.callback !== undefined) {
        const callback = payload.callback;
        img.onload = function () {
            callback({});
        }
    }

    Object.assign(obj.sprite, {img: img});
    return obj;
};

export default loadSprite;
